import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { useGetUsers } from '@/hooks/user/useGetUsers';
import { IUser } from '@/types/IUser';
import { Button } from '@/components/ui/button1';
import { getPaginationNumbers } from "@/utils/getPageNumbers";
import { useToggleBlockStatus } from '@/hooks/user/useBlock';

const UserList: React.FC = () => {
    const [searchKey, setSearchKey] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const limit = 10;

    const { data: users, isLoading } = useGetUsers(searchKey, page, limit);
    console.log('users:', users);

    const { mutate: toggleBlockStatus, isPending: isBlocking } = useToggleBlockStatus();

    const handleBlockToggle = (userId: string) => {
        toggleBlockStatus(userId);
    };

    useEffect(() => {
        setTotalPages(users?.totalPages);
    }, [users]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const getPageNumbers = () => {
        return getPaginationNumbers(totalPages, page);
    };

    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <h2 className="text-2xl font-semibold leading-tight text-zinc-900 dark:text-white">User List</h2>
                <div className="my-2 flex sm:flex-row flex-col">
                    <div className="block relative">
                        <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-zinc-500 dark:text-zinc-400">
                                <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z" />
                            </svg>
                        </span>
                        <input
                            onChange={(e) => setSearchKey(e.target.value)}
                            placeholder="Search"
                            className="appearance-none rounded-lg border dark:border-zinc-700 border-zinc-400 block pl-8 pr-6 py-2 w-full bg-white dark:bg-zinc-800 text-sm placeholder-zinc-400 dark:placeholder-zinc-500 text-zinc-700 dark:text-zinc-300 focus:bg-white dark:focus:bg-zinc-700 focus:placeholder-zinc-600 focus:text-zinc-700 dark:focus:text-zinc-300 focus:outline-none"
                        />
                    </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 dark:border-zinc-800 border-zinc-200 dark:bg-zinc-900 bg-zinc-100 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-5 py-3 border-b-2 dark:border-zinc-800 border-zinc-200 dark:bg-zinc-900 bg-zinc-100 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th className="px-5 py-3 border-b-2 dark:border-zinc-800 border-zinc-200 dark:bg-zinc-900 bg-zinc-100 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-5 py-3 border-b-2 dark:border-zinc-800 border-zinc-200 dark:bg-zinc-900 bg-zinc-100 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                                        Country
                                    </th>
                                    <th className="px-5 py-3 border-b-2 dark:border-zinc-800 border-zinc-200 dark:bg-zinc-900 bg-zinc-100 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.users?.map((user: IUser, index: number) => (
                                    <tr key={user._id} className={index % 2 === 0 ? "bg-white dark:bg-zinc-800" : "bg-zinc-50 dark:bg-zinc-900"}>
                                        <td className="px-5 py-5 border-b border-zinc-200 dark:border-zinc-700 text-sm">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-10 h-10">
                                                    <img className="w-full h-full rounded-full" src={`https://ui-avatars.com/api/?name=${user.firstname}+${user.lastname}&background=random`} alt="" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-zinc-900 dark:text-zinc-300 whitespace-no-wrap">
                                                        {user.firstname} {user.lastname}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-zinc-200 dark:border-zinc-700 text-sm">
                                            <p className="text-zinc-900 dark:text-zinc-300 whitespace-no-wrap">{user.role}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-zinc-200 dark:border-zinc-700 text-sm">
                                            <p className="text-zinc-900 dark:text-zinc-300 whitespace-no-wrap">{user.email}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-zinc-200 dark:border-zinc-700 text-sm">
                                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 dark:text-green-200 leading-tight">
                                                <span aria-hidden className="absolute inset-0 bg-green-200 dark:bg-green-700 opacity-50 rounded-full"></span>
                                                <span className="relative">{user.country}</span>
                                            </span>
                                        </td>
                                        <td className="px-5 py-5 border-b border-zinc-200 dark:border-zinc-700 text-sm">
                                            <div className="flex items-center">
                                                <Switch checked={!user.isBlocked} onCheckedChange={() => handleBlockToggle(user._id)} className="mr-2" disabled={isBlocking} />
                                                <span className={user.isBlocked ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}>{user.isBlocked ? "Blocked" : "Active"}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {!isLoading && (
                            <div className="flex items-center justify-center mt-8 mb-8">
                                <nav className="flex items-center space-x-2" aria-label="Pagination">
                                    <Button
                                        onClick={() => handlePageChange(page - 1)}
                                        disabled={page === 1}
                                        className="px-2 py-1 rounded-md bg-white dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700"
                                    >
                                        Previous
                                    </Button>

                                    {getPageNumbers().map((pageNumber, index) => (
                                        <Button
                                            key={index}
                                            onClick={() => typeof pageNumber === "number" && handlePageChange(pageNumber)}
                                            className={`px-3 py-1 rounded-md ${pageNumber === page ? "bg-black dark:bg-zinc-700 text-white" : "bg-white dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700"} ${
                                                pageNumber === "..." ? "cursor-default" : ""
                                            }`}
                                            disabled={pageNumber === "..."}
                                        >
                                            {pageNumber}
                                        </Button>
                                    ))}

                                    <Button
                                        onClick={() => handlePageChange(page + 1)}
                                        disabled={page === totalPages}
                                        className="px-2 py-1 rounded-md bg-white dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700"
                                    >
                                        Next
                                    </Button>
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserList;

