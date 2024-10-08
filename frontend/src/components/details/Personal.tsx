import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Personal: React.FC = () => {
    
    const [companyName, setCompanyName] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ companyName });
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Welcome to Opporutne. </h1>
            <p className="mb-6 text-gray-600">.</p>

            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <Label className="block mb-2">How many people are in your company?</Label>
                    <Input id="company-name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full" />
                </div>

                <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
                    Continue
                </Button>
            </form>
        </div>
    );
};

export default Personal;
