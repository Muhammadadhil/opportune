import { useState } from "react";
import { Bell, Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NotificationProps {
    notifications: any[];
    clearNotifications: () => void;
}

export const NotificationModal: React.FC<NotificationProps> = ({ notifications, clearNotifications }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button onClick={() => setOpen(true)} className="flex items-center focus:outline-none" aria-label="Notifications">
                <Bell className="h-6 w-6" />
                {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{notifications.length}</span>
                )}
            </button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                    <DialogHeader className="border-b border-gray-200 dark:border-gray-700 pb-4">
                        <div className="flex items-center justify-between">
                            <DialogTitle className="text-gray-900 dark:text-gray-100">Notifications</DialogTitle>
                        </div>
                    </DialogHeader>

                    <ScrollArea className="h-[400px] pr-4">
                        {notifications.length > 0 ? (
                            <div className="space-y-4">
                                {notifications.map((notification, index) => (
                                    <div key={index} className="flex items-start gap-4 py-2">
                                        <Avatar className="h-10 w-10">
                                            <img src={notification.avatar || "/placeholder.svg?height=40&width=40"} alt={notification.username || "User avatar"} />
                                        </Avatar>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm text-gray-800 dark:text-gray-200">
                                                <span className="font-medium">{notification.username || "User"}</span> {notification.action || notification.message}
                                            </p>
                                            {notification.files &&
                                                notification.files.map((file: any, fileIndex: number) => (
                                                    <div key={fileIndex} className="flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-700 p-2 text-sm">
                                                        <div className="flex-1">
                                                            <p className="font-medium text-gray-800 dark:text-gray-200">{file.name}</p>
                                                            <p className="text-gray-600 dark:text-gray-400">{file.size}</p>
                                                        </div>
                                                        <Button variant="ghost" size="icon">
                                                            <Download className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{notification.timestamp || "Just now"}</p>
                                        </div>
                                        {notification.unread && <div className="h-2 w-2 rounded-full bg-blue-500" />}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex h-[300px] items-center justify-center">
                                <p className="text-sm text-gray-600 dark:text-gray-400">No notifications</p>
                            </div>
                        )}
                    </ScrollArea>

                    <div className="flex items-center justify-end border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" onClick={clearNotifications}>
                                Mark all as read
                            </Button>
                        </div>
                        {/* <Button variant="default" size="sm">
                            View all notifications
                        </Button> */}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
