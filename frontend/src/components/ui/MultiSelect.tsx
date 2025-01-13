import  { useState, useRef, useEffect } from "react";
import { Check, X, ChevronDown } from "lucide-react";

interface MultiSelectProps {
    options: string[];
    maxSelections?: number;
    onSelectionChange: (selectedOptions: string[]) => void;
    error:string
}

export default function MultiSelect({ options, maxSelections = 5, onSelectionChange ,error }: MultiSelectProps) {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLUListElement>(null);

    const handleSelect = (option: string) => {
        if (selectedOptions.length < maxSelections && !selectedOptions.includes(option)) {
            const newSelectedOptions = [...selectedOptions, option];
            setSelectedOptions(newSelectedOptions);
            onSelectionChange(newSelectedOptions);
        }
        setInputValue("");
        inputRef.current?.focus();
    };

    const handleRemove = (option: string) => {
        const newSelectedOptions = selectedOptions.filter((item) => item !== option);
        setSelectedOptions(newSelectedOptions);
        onSelectionChange(newSelectedOptions);
    };

    const filteredOptions = options?.filter((option) => option.toLowerCase().includes(inputValue.toLowerCase()) && !selectedOptions.includes(option));

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="w-full max-w-md">
            <div className="relative">
                <div className={`flex flex-wrap items-center gap-2 p-2 border rounded-md cursor-text ${error ? "border-red-500" : "border-gray-300"}`} onClick={() => inputRef.current?.focus()}>
                    {selectedOptions.map((option) => (
                        <span key={option} className="flex items-center gap-1 px-2 py-1 text-sm bg-primary text-primary-foreground rounded-full">
                            {option}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove(option);
                                }}
                                className="text-primary-foreground hover:text-primary-foreground/80"
                                aria-label={`Remove ${option}`}
                            >
                                <X size={14} />
                            </button>
                        </span>
                    ))}
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onFocus={() => setIsOpen(true)}
                        className="flex-grow outline-none bg-transparent placeholder:text-xs"
                        placeholder="job fields"
                        aria-label="Search terms input"
                    />
                    <button onClick={() => setIsOpen(!isOpen)} className="ml-auto text-gray-400 hover:text-gray-600" aria-label="Toggle options">
                        <ChevronDown size={20} />
                    </button>
                </div>
                {isOpen && filteredOptions.length > 0 && (
                    <ul ref={dropdownRef} className="absolute z-20 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                        {filteredOptions.map((option) => (
                            <li key={option} onClick={() => handleSelect(option)} className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground">
                                {option}
                                {selectedOptions.includes(option) && <Check size={16} />}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
                {selectedOptions.length}/{maxSelections} tags maximum
            </p>
        </div>
    );
}
