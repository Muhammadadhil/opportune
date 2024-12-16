import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/api/user"; 
import { userInfo } from "@/types/Iuser";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/userSlice";
import { useSelector } from 'react-redux';
import { RootState } from "@/store/store";

 

interface editProfileDialogProps {
    user: userInfo;
    onClose: () => void;
}

export function EditProfileDialog({ user, onClose }:editProfileDialogProps) {

    const { userInfo } = useSelector((state: RootState) => state.user);

    const [isLoading,setIsLoading]=useState(false);
    const [formData, setFormData] = useState({
        firstname: user.firstname,
        lastname: user.lastname,
        country: user.country,
    });

    const dispatch = useDispatch();



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setIsLoading(true);
            await updateProfile(user._id,formData);
            dispatch(setCredentials({ ...userInfo, firstname:formData.firstname, lastname:formData.lastname, country:formData.country }));
            onClose();
        }catch(error){
            console.log(error);
        } finally{
            setIsLoading(false);
        }
        
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="firstname" className="text-right">
                            First Name
                        </Label>
                        <Input id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="lastname" className="text-right">
                            Last Name
                        </Label>
                        <Input id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="country" className="text-right">
                            Country
                        </Label>
                        <Input id="country" name="country" value={formData.country} onChange={handleChange} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save changes"}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
