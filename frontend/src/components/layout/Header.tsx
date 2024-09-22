import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import Navbar from "./Navbar";


const Header = () => {

    return (
        // <div className="mt-6 ml-40 flex justify-between mr-40">
        //     <h2 className="font-Poppins text-2xl font-extrabold">
        //         Opportune <span className="text-amber-800">.</span>
        //     </h2>
        //     <div className="w-96 h-11 bg-slate-300 rounded-full"></div>
        //     <div className="flex">
        //         <div className="w-20 h-9 bg-slate-100 rounded-full mr-2 justify-center">
        //             <p className="text-center mt-1 cursor-pointer select-none">login</p>
        //         </div>
        //         <div className="w-20 h-9 bg- rounded-full bg-green-800 hover:bg-green-700">
        //             <p className="text-center mt-1 text-white cursor-pointer select-none">join</p>
        //         </div>
        //     </div>
        // </div>
        <>
            <Navbar/>
        </>
    );
};

export default Header;
