import { useState } from "react";
import { Bell } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {INotification} from '@/types/INotification';
// import {markNotificationAsRead} from '@/api/notification';
import {useMarkNotificationAsRead} from "@/hooks/notification/useMarkAsRead";
import {getRelativeTime} from '@/utils/relativeDateFormatter';

interface NotificationProps {
    notifications: INotification[];
}

export const NotificationModal: React.FC<NotificationProps> = ({ notifications }) => {
    const [open, setOpen] = useState(false);

    const mutation=useMarkNotificationAsRead();

    const handleRead=(id:string)=>{
        // markNotificationAsRead(id);
        mutation.mutate(id)

    }

    console.log('notifications:',notifications);

    const sortedNotifications = notifications?.length ? [...notifications].sort((a,b)=>  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) : [];

    console.log('sortedNotifcations:',sortedNotifications)

    return (
        <div className="relative">
            <button onClick={() => setOpen(true)} className="flex items-center focus:outline-none" aria-label="Notifications">
                <Bell className="h-6 w-6" />
                {notifications?.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{notifications.length}</span>
                )}
            </button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-md bg-white/90 dark:bg-zinc-900/40 backdrop-blur-sm border-gray-200 dark:border-zinc-900">
                    <DialogHeader className="border-b border-gray-200 dark:border-gray-700 pb-4">
                        <div className="flex items-center justify-between">
                            <DialogTitle className="text-gray-900 dark:text-gray-100">Notifications</DialogTitle>
                        </div>
                    </DialogHeader>

                    <ScrollArea className="h-[400px] pr-4">
                        {notifications?.length > 0 ? (
                            <div className="space-y-4">
                                {sortedNotifications.map((notification) => (
                                    <div key={notification._id} className="flex flex-col gap-2 py-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg px-4">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm text-gray-800 dark:text-gray-200">{notification.message}</p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">{getRelativeTime(notification.createdAt) || "Just now"}</p>
                                            </div>
                                            {!notification.isRead && <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0 mt-1" />}
                                        </div>
                                        <div className="flex justify-start">
                                            <Button onClick={() => handleRead(notification._id)} variant="outline" size="sm" className="text-xs">
                                                Mark as read
                                            </Button>
                                        </div>
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
                            <Button variant="ghost" size="sm">
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
