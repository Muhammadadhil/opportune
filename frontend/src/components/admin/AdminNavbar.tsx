import { BellIcon, MenuIcon } from "lucide-react";
import Button from "../ui/Button";
import toast from "react-hot-toast";

const TopBar = () => {

    const handleClick=()=> toast.success('yes you click on bell icon');

    return (
        <header className="bg-white  p-4 flex justify-between items-center">
            <div className="flex items-center">
                <Button variant="ghost" className="md:hidden mr-2">
                    <MenuIcon className="h-6 w-6" />
                </Button>
                
            </div>
            <div className="flex items-center space-x-4">
                <Button variant="ghost">
                    <BellIcon className="h-5 w-5" onClick={handleClick} />
                </Button>
                
        
            </div>
        </header>
    );
};

export default TopBar;
