import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export default function Dashboard() {

    return (
        <main className="p-6 space-y-6">
            <CardTitle className="text-2xl font-bold text-center">Dashboard</CardTitle>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border-0">
                    <CardHeader>
                        <CardTitle>Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Placeholder for card content */}
                        <div className="h-20 rounded-md text-green-500 text-[50px] font-bold ">$5000</div>
                    </CardContent>
                </Card>
                <Card className="border-0">
                    <CardHeader>
                        <CardTitle>Total Profit</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-20 rounded-md text-blue-400 text-[50px] font-bold ">$4050</div>
                    </CardContent>
                </Card>
                <Card className="border-0">
                    <CardHeader>
                        <CardTitle>Escrow Amount</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-20 rounded-md text-orange-400 text-[50px] font-bold ">$5000</div>
                    </CardContent>
                </Card>
                <Card className="border-0">
                    <CardHeader>
                        <CardTitle>Total Active Freelancers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-20 rounded-md  text-[50px] font-bold ">25</div>
                    </CardContent>
                </Card>
                <Card className="border-0">
                    <CardHeader>
                        <CardTitle>Total Active Clients</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-20 rounded-md  text-[50px] font-bold ">25</div>
                    </CardContent>
                </Card>
                <Card className="border-0">
                    <CardHeader>
                        <CardTitle>Total Active Job post</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-20 rounded-md  text-[50px] font-bold ">25</div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
