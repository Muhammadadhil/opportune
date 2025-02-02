import React from 'react';
import { X } from "lucide-react";
import { Button } from "../ui/button1";

interface CallingOverlayProps {
    calleeName: string;
    onCancel: () => void;
    isCaller?: boolean;
    onJoin: () => void;
}

const CallingOverlay: React.FC<CallingOverlayProps> = ({ calleeName, onCancel, isCaller = true, onJoin }) => {
    return (
        <div className="fixed inset-0 z-50 dark:bg-black/40 flex items-center justify-center">
            <div className=" p-8 rounded-lg shadow-lg text-center min-w-[400px] dark:border-2 dark:bg-zinc-900/70 backdrop-blur-md dark:border-zinc-700">
                <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-black mx-auto mb-4 flex items-center justify-center">
                    {calleeName[0].toUpperCase()}
                </div>
                <h2 className="text-xl font-semibold mb-4">{calleeName}</h2>
                <p className="text-gray-600 mb-6">
                    {isCaller ? 'Calling...' : 'Incoming call...'}
                </p>
                <div className="flex justify-center gap-4">
                    <Button
                        variant="outline"
                        onClick={onJoin}
                        className="rounded-xl p-4"
                    >
                        Join Room
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onCancel}
                        className="rounded-xl p-4"
                    >
                        End Call <X className="ml-3 w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CallingOverlay;