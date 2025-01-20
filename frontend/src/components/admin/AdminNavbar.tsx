import { BellIcon, MenuIcon, Moon, Sun } from "lucide-react";
import Button from "../ui/Button";
import { useDispatch , useSelector } from "react-redux";
import  { toggleTheme} from '@/store/slices/appSlice'
import { RootState } from "@/store/store";

const TopBar = () => {

    const dispatch = useDispatch();

    const handleToggleTheme=()=> {
        dispatch(toggleTheme());
    };

    const { theme } = useSelector((state: RootState) => state.app);
    
    return (
        <header className="bg-white  dark:bg-zinc-900 p-4 flex justify-between items-center">
            <div className="flex items-center">
                <Button variant="ghost" className="md:hidden mr-2">
                    <MenuIcon className="h-6 w-6" />
                </Button>
            </div>
            <div className="flex items-center space-x-4">

                 <button
                    onClick={() => {
                        handleToggleTheme();
                    }}
                    className={`p-2 rounded-full ${
                        theme === "dark" ? "bg-gray-700  hover:bg-gray-600" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    } transition-colors duration-300`}
                >
                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>
        </header>
    );
};

export default TopBar;
