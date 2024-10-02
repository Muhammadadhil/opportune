import React from "react";
import ClientDetail from "../components/details/ClientDetail";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const DetailsClient: React.FC = () => {
    const [companySize, setCompanySize] = useState<string>("");
    const [companyName, setCompanyName] = useState<string>("");
    const [website, setWebsite] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ companySize, companyName, website });
    };

    return (
        <div className="max-w-md mx-auto mt-36 p-6 bg-white rounded-lg mb-3">
            <h1 className="text-2xl font-bold mb-4">Welcome to Opporutne. </h1>
            <p className="mb-6 text-gray-600">Tell us about your business and you'll be on your way to connect with talent.</p>

            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <Label className="block mb-4">How many people are in your company?</Label>
                    <RadioGroup value={companySize} onValueChange={setCompanySize}>
                        <div className="flex items-center space-x-2 mb-3">
                            <RadioGroupItem value="just-me" id="just-me" />
                            <Label htmlFor="just-me">It's just me</Label>
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                            <RadioGroupItem value="2-9" id="2-9" />
                            <Label htmlFor="2-9">2-9 employees</Label>
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                            <RadioGroupItem value="10-99" id="10-99" />
                            <Label htmlFor="10-99">10-99 employees</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-3">
                            <RadioGroupItem value="100-1000" id="100-1000" />
                            <Label htmlFor="100-1000">100-1,000 employees</Label>
                        </div>
                        
                    </RadioGroup>
                </div>

                <div className="mb-4">
                    <Label htmlFor="company-name" className="block mb-2">
                        Company Name
                    </Label>
                    <Input id="company-name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full" />
                </div>

                <div className="mb-6">
                    <Label htmlFor="website" className="block mb-2">
                        Website
                    </Label>
                    <Input id="website" value={website} onChange={(e) => setWebsite(e.target.value)} className="w-full" />
                </div>

                <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
                    Continue
                </Button>
            </form>
        </div>
    );
};

export default DetailsClient;
