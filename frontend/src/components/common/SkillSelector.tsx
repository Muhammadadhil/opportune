import React, { useState, useEffect, useCallback, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button1";
import { X, Loader2, Plus } from "lucide-react";
import { fetchSkills } from "@/api/common";

// Types
interface Skill {
    _id: string;
    skill_name: string;
}

interface SkillSelectorProps {
    skills: string[];
    setSkills: (skills: string[]) => void;
    setValue: (name: string, value: string[]) => void;
    maxSkills?: number;
    className?: string;
}

export const SkillSelector: React.FC<SkillSelectorProps> = ({ skills, setSkills, setValue, maxSkills = 10, className = "" }) => {
    const [inputValue, setInputValue] = useState("");
    const [suggestedSkills, setSuggestedSkills] = useState<Skill[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Debounced fetch suggestions
    const debouncedFetch = useCallback(
        (value: string) => {
            const handler = setTimeout(async () => {
                if (value.trim().length < 2) {
                    setSuggestedSkills([]);
                    return;
                }

                setIsLoading(true);
                setError(null);

                try {
                    const response = await fetchSkills(value);
                    // Filter out already selected skills
                    const filteredSkills = response.filter((skill: Skill) => !skills.includes(skill.skill_name));
                    setSuggestedSkills(filteredSkills);
                } catch (err) {
                    setError("Failed to fetch skills. Please try again.");
                    console.error("Error fetching skills:", err);
                } finally {
                    setIsLoading(false);
                }
            }, 300);

            return () => clearTimeout(handler);
        },
        [skills]
    );

    useEffect(() => {
        const cleanup = debouncedFetch(inputValue);
        return cleanup;
    }, [inputValue, debouncedFetch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        setSelectedIndex(-1);
        setShowSuggestions(true);
    };

    const addSkill = (skillName: string) => {
        if (skills.length >= maxSkills) {
            setError(`Maximum ${maxSkills} skills allowed`);
            return;
        }

        if (!skillName.trim()) {
            return;
        }

        if (skills.includes(skillName)) {
            setError("This skill is already added");
            return;
        }

        setSkills([...skills, skillName]);
        setInputValue("");
        setSuggestedSkills([]);
        setError(null);
        setShowSuggestions(false);
        setValue("skills", [...skills, skillName]);
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter((skill) => skill !== skillToRemove));
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (suggestedSkills.length === 0) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex((prev) => (prev < suggestedSkills.length - 1 ? prev + 1 : prev));
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
                break;
            case "Enter":
                e.preventDefault();
                if (selectedIndex >= 0) {
                    addSkill(suggestedSkills[selectedIndex].skill_name);
                }
                break;
            case "Escape":
                setShowSuggestions(false);
                break;
        }
    };

    return (
        <div className={`space-y-4 ${className}`}>
            <div className="relative">
                <div className="flex space-x-2">
                    <Input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder="Type to search skills..."
                        className="w-full"
                        disabled={skills.length >= maxSkills}
                    />
                    <Button variant="outline" onClick={() => addSkill(inputValue)} disabled={!inputValue.trim() || skills.length >= maxSkills}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                    </Button>
                </div>

                {/* Error message */}
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

                {/* Skills count */}
                <p className="text-xs text-muted-foreground mt-1">
                    {skills.length} / {maxSkills} skills added
                </p>

                {/* Suggestions dropdown */}
                {showSuggestions && (suggestedSkills.length > 0 || isLoading) && (
                    <div className="absolute z-10 w-full mt-1 border rounded-md shadow-lg max-h-60 overflow-auto bg-white dark:bg-zinc-900">
                        {isLoading ? (
                            <div className="p-2 text-center">
                                <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
                                Loading...
                            </div>
                        ) : (
                            // <ScrollArea className="max-h-60 overflow-y-auto">

                            // </ScrollArea>

                            suggestedSkills.map((skill, index) => (
                                <div key={skill._id} onClick={() => addSkill(skill.skill_name)} className={`p-2 cursor-pointer hover:bg-accent ${index === selectedIndex ? "bg-accent" : ""}`}>
                                    {skill.skill_name}
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Selected skills */}
            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <span key={skill} className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-2 rounded-full bg-zinc-200 text-sm dark:bg-zinc-800">
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="hover:text-primary/80 focus:outline-none ">
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {skill}</span>
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default SkillSelector;
