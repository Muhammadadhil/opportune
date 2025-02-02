import React, { useState } from "react";
import { Button } from "@/components/ui/button1";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { createAdminNotification } from "@/api/notification";

const ManageNotification = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userType, setUserType] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { toast } = useToast();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await createAdminNotification({ title, content, userType });
            toast({
                title: "Notification Created",
                description: "Your notification has been successfully created and sent.",
            });
            // Reset form
            setTitle("");
            setContent("");
            setUserType("");
        } catch (error) {
            toast({
                title: "Error",
                description: "There was an error creating the notification. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-[550px]">
            <CardHeader>
                <CardTitle>Manage Notification</CardTitle>
                <CardDescription>Create and send notifications to users.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" placeholder="Enter notification title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="content">Content</Label>
                            <Textarea id="content" placeholder="Write notification content" value={content} onChange={(e) => setContent(e.target.value)} required />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="userType">User Type</Label>
                            <Select value={userType} onValueChange={setUserType} required>
                                <SelectTrigger id="userType">
                                    <SelectValue placeholder="Select user type" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="all">All Users</SelectItem>
                                    <SelectItem value="freelancer">Freelancers</SelectItem>
                                    <SelectItem value="client">Clients</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button
                    variant="outline"
                    onClick={() => {
                        setTitle("");
                        setContent("");
                        setUserType("");
                    }}
                >
                    Clear
                </Button>
                <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send Notification"}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ManageNotification;
