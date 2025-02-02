import { useState } from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button1";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, DollarSign, Users, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useAdminTransactions } from "@/hooks/dashboard/useAdminTransactions";

const AdminTransactions = () => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState("");

    const { data: transactions, isLoading } = useAdminTransactions();


    //adCh1 want to do the paginatino

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };


    console.log("transactions:", transactions);


    const totalCommission = transactions?.reduce((sum: number, transaction) => sum + transaction.amount, 0) || 0;
    const averageCommission = transactions?.length ? totalCommission / transactions?.length : 0;

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Commission</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">${totalCommission}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Commission</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">${averageCommission.toFixed(2)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Highest Commission</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">${Math.max(...(transactions?.map((t) => t.amount.toFixed(2)) || [0]))}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Lowest Commission</CardTitle>
                        <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{Math.min(...(transactions?.map((t) => t.amount.toFixed(2)) || [0]))}</div>
                    </CardContent>
                </Card>
            </div>

            <Card className="max-w-[1000px]">
                <CardHeader>
                    <CardTitle>Admin Commission History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between mb-4 ">
                        <Input placeholder="Search freelancer..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
                        <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select page size" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10 per page</SelectItem>
                                <SelectItem value="20">20 per page</SelectItem>
                                <SelectItem value="50">50 per page</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Freelancer</TableHead>
                                    <TableHead>Client</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                    <TableHead>Type</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading
                                    ? Array.from({ length: 5 }).map((_, index) => (
                                          <TableRow key={index}>
                                              <TableCell>
                                                  <Skeleton className="h-4 w-[100px]" />
                                              </TableCell>
                                              <TableCell>
                                                  <Skeleton className="h-4 w-[150px]" />
                                              </TableCell>
                                              <TableCell>
                                                  <Skeleton className="h-4 w-[80px]" />
                                              </TableCell>
                                              <TableCell>
                                                  <Skeleton className="h-4 w-[100px]" />
                                              </TableCell>
                                          </TableRow>
                                      ))
                                    : transactions?.map((transaction) => (
                                          <TableRow key={transaction._id}>
                                              <TableCell>{formatDate(transaction.createdAt)}</TableCell>
                                              <TableCell>{transaction.freelancerId.firstname + " " + transaction.freelancerId.lastname}</TableCell>
                                              <TableCell>{transaction.clientId.firstname + " " + transaction.clientId.lastname}</TableCell>

                                              <TableCell className="text-right font-medium">${transaction.amount}</TableCell>
                                              <TableCell>
                                                  <span
                                                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                          transaction.type === "credit" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                                      }`}
                                                  >
                                                      {transaction.type}
                                                  </span>
                                              </TableCell>
                                          </TableRow>
                                      ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex items-center justify-end space-x-2 py-4">
                        <Button variant="outline" size="sm" onClick={() => setPage(page - 1)} disabled={page === 1 || isLoading}>
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setPage(page + 1)} disabled={!transactions?.hasNextPage || isLoading}>
                            Next
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminTransactions;
