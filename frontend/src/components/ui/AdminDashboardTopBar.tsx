import { BellIcon, MenuIcon, UserCircle } from "lucide-react";
import Button from "./Button";

const TopBar = () => (
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
            <Button variant="ghost" >
                <BellIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" >
                <UserCircle className="h-5 w-5" />
            </Button>
        </div>
    </header>
);

export default TopBar;