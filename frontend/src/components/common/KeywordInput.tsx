import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { useCallback } from "react";
import { ReactSetState } from "@/types/ReactSetState";
import { UseFormSetValue, FieldValues, Path, PathValue } from "react-hook-form";

type KeywordInputProps<T extends FieldValues> = {
    newKeyword: string;
    setNewKeyword: ReactSetState<string>;
    keywords: string[];
    setKeywords: ReactSetState<string[]>;
    formFieldName: Path<T>;
    setValue: UseFormSetValue<T>;
};

const KeywordInput = <T extends FieldValues>({ newKeyword, setNewKeyword, keywords, setKeywords, formFieldName, setValue }: KeywordInputProps<T>) => {

    const addKeyword = useCallback(
        (event) => {
            event.preventDefault();
            if (newKeyword && keywords.length < 10) {
                const updatedKeywords = [...keywords, newKeyword];
                setKeywords(updatedKeywords);
                setNewKeyword("");
                setValue(formFieldName, updatedKeywords as PathValue<T, Path<T>>);
            }
        },
        [newKeyword, keywords]
    );

    return (
        <div className="flex space-x-2 mb-2">
            <Input
                type="text"
                placeholder="Add a keyword"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key == "Enter") {
                        addKeyword(newKeyword);
                    }
                }}
            />
            <Button variant="outline" onClick={addKeyword}>
                Add
            </Button>
        </div>
    );
};

export default KeywordInput;
