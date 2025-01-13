import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ReactSetState } from "@/types/ReactSetState";

interface ConfirmDialogProps {
    action?: string
    id: string;
    title: string;
    description1: string;
    description2?: string;
    open: boolean;
    setOpen: ReactSetState<boolean>;
    onConfirm: (gigId: string) => void;
}

const ConfirmDialog = ({ action, title, description1, description2, open, setOpen, onConfirm, id }: ConfirmDialogProps) => (
    <Dialog open={open} onOpenChange={setOpen}>
        {/* <DialogTrigger className=" rounded-xl transition duration-300 ease-in-out">
            <Button>remove gig</Button>
        </DialogTrigger> */}
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>
                    {description1}
                    <span className="block">{description2}</span>
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button
                    variant="outline"
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpen(false);
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="default"
                    onClick={(e) => {
                        e.stopPropagation();
                        onConfirm(id);
                    }}
                >
                    {action || "Remove"}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);

export default ConfirmDialog;
