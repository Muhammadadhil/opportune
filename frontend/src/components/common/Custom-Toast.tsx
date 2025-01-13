import React from "react";
import { Check } from "lucide-react";
import { Toast, toast } from "react-hot-toast";

interface CustomToastProps {
    t: Toast;
    message: string;
}

export const CustomToast: React.FC<CustomToastProps> = ({ t, message }) => {
    return (
        <div className={`${t.visible ? "animate-enter" : "animate-leave"} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
            <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                            <Check className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                    <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">Notification</p>
                        <p className="mt-1 text-sm text-gray-500">{message}</p>
                    </div>
                </div>
            </div>
            <div className="flex border-gray-200">
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Close
                </button>
            </div>
        </div>
    );
};
