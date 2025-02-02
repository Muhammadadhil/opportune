import { useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button1";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface SubmitWorkDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (message: string, file: File | null) => Promise<void>;
    amount: number;
}

export function SubmitWorkDialog({ isOpen, onClose, onSubmit, amount }: SubmitWorkDialogProps) {
    
    const [message, setMessage] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit(message, file);
            onClose();
        } catch (error) {
            console.error("Error submitting work:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:min-w-md">
                <DialogHeader>
                    <DialogTitle>Submit Work for Payment</DialogTitle>
                    <DialogDescription>Submit your completed work to receive the milestone payment.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label>Payment Amount</Label>
                        <div className="text-2xl font-bold text-green-600">${amount.toFixed(2)}</div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Describe the work you're submitting..." className="h-32" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="file">Attachment</Label>
                        <div className="flex items-center gap-2">
                            <Input id="file" type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" />
                            <Button type="button" variant="outline" className="w-full" onClick={() => document.getElementById("file")?.click()}>
                                <Upload className="mr-2 h-4 w-4" />
                                {file ? file.name : "Upload File"}
                            </Button>
                            {file && (
                                <Button type="button" variant="ghost" size="sm" onClick={() => setFile(null)}>
                                    Remove
                                </Button>
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground">Max file size: 25MB</p>
                    </div>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button type="button" variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting} className="bg-green-700 hover:bg-green-600">
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Submit Work
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
