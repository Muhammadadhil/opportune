import { BellIcon, MenuIcon } from "lucide-react";
import Button from "./Button";
import toast from "react-hot-toast";

const TopBar = () => {

    const handleClick=()=> toast.success('yes you click on bell icon');

    return (
        <header className="bg-white border-b p-4 flex justify-between items-center">
            <div className="flex items-center">
                <Button variant="ghost" className="md:hidden mr-2">
                    <MenuIcon className="h-6 w-6" />
                </Button>
                <h2 className="font-Poppins text-2xl font-extrabold text-slate-800">
                    Opportune <span className="text-amber-800">.</span>
                </h2>
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
