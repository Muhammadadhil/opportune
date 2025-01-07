import { ArrowDownRight, ArrowUpRight, DollarSign, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { useAdminTransactions } from "@/hooks/dashboard/useAdminTransactions";
import { useDashboardData } from "@/hooks/dashboard/useDashboardData";

export default function Dashboard() {

    const { data: transactions } = useAdminTransactions();
    const { data: dashboardData } = useDashboardData();

    console.log('transactions:',transactions);
    console.log('dashboardData:',dashboardData);

    
    const transactionData = Array.isArray(transactions?.data) ? transactions.data : [];
    const totalCommission = transactionData.reduce((sum: number, transaction) => sum + transaction.amount, 0);
    const averageCommission = transactionData.length ? totalCommission / transactionData.length : 0;

    return (
        <main className="p-6 space-y-6">
            <CardTitle className="text-2xl font-bold text-center">Dashboard</CardTitle>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Commission</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-[40px] font-bold text-green-600">${totalCommission}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Commission</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-[40px] font-bold text-green-600">${averageCommission}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Highest Commission</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-[40px] font-bold text-green-600">${Math.max(...(transactionData.map((t) => t.amount) || [0]))}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Lowest Commission</CardTitle>
                        <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-[40px] font-bold text-blue-500">{Math.min(...(transactionData.map((t) => t.amount) || [0]))}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm">Escrow Holding Amount</CardTitle>
                        <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-[40px] font-bold text-green-600">{dashboardData?.data?.totalEscrowAmount}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm">Total Active Freelancers</CardTitle>
                        <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-[40px] font-bold text-green-600">50</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm">Total Active Clients</CardTitle>

                        <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-[40px] font-bold text-orange-600">50</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm ">Total Active Job post</CardTitle>
                        <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-[40px] font-bold text-blue-600"> {dashboardData?.data?.totalOpenJobs}</div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
