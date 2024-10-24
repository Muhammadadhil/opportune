import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export default function Dashboard() {
    return (
        <main className="p-6 space-y-6">
            <CardTitle className="text-2xl font-bold text-center">Dashboard</CardTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="border-0">
                        <CardHeader>
                            <CardTitle></CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Placeholder for card content */}
                            <div className="h-20  rounded-md"></div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Chart</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Placeholder for chart */}
                    <div className="h-64  rounded-md"></div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Top Store</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Placeholder for table */}
                    <div className="h-64 bg-gray-100 rounded-md"></div>
                </CardContent>
            </Card>
        </main>
    );
}
