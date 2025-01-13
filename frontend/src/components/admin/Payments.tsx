// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { ChevronDown, Search } from "lucide-react";
// import { format } from "date-fns";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { PaymentStatus } from "@/enums/PaymentStatus";
// import { EscrowStatus } from "@/enums/EscrowStatus";
// import { fetchPayments } from "@/api/payments";
// import { IPayment } from "@/types/IPayment";

// export function PaymentListing() {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [page, setPage] = useState(1);
//     const pageSize = 10;

//     const { data: payements, isLoading, error } = useQuery({
//         queryKey: ["payments"],
//         queryFn: ()=> fetchPayments(),
//     });

//     const paymentss: IPayment[] = payements || [];
//     console.log('payments:',paymentss)

//     // const totalPages = data?.totalPages || 1;

//     const formatCurrency = (amount: number) => {
//         return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
//     };

//     const getStatusBadge = (status: PaymentStatus | EscrowStatus) => {
//         const colorMap = {
//             [PaymentStatus.PENDING]: "bg-yellow-500",
//             [PaymentStatus.SUCCEEDED]: "bg-green-500",
//             [PaymentStatus.FAILED]: "bg-red-500",
//             [EscrowStatus.HOLDING]: "bg-blue-500",
//             [EscrowStatus.RELEASED]: "bg-green-500",
//             [EscrowStatus.REFUNDED]: "bg-orange-500",
//         };

//         return <Badge className={`${colorMap[status]} text-white`}>{status}</Badge>;
//     };

//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>An error occurred: {(error as Error).message}</div>;

//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle>Payment Listings</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <div className="flex justify-between items-center mb-4">
//                     <div className="relative">
//                         <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//                         <Input placeholder="Search payments..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-8" />
//                     </div>
//                 </div>
//                 <Table>
//                     <TableHeader>
//                         <TableRow>
//                             <TableHead>ID</TableHead>
//                             <TableHead>Amount</TableHead>
//                             <TableHead>Status</TableHead>
//                             <TableHead>Created At</TableHead>
//                             <TableHead>Actions</TableHead>
//                         </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                         {paymentss.map((payment) => (
//                             <Collapsible key={payment._id}>
//                                 <TableRow>
//                                     <TableCell>{payment._id}</TableCell>
//                                     <TableCell>{formatCurrency(payment?.amount)}</TableCell>
//                                     <TableCell>{getStatusBadge(payment?.status)}</TableCell>
//                                     <TableCell>{format(new Date(payment.createdAt), "PPP")}</TableCell>
//                                     <TableCell>
//                                         <CollapsibleTrigger asChild>
//                                             <Button variant="ghost" size="sm">
//                                                 <ChevronDown className="h-4 w-4" />
//                                             </Button>
//                                         </CollapsibleTrigger>
//                                     </TableCell>
//                                 </TableRow>
//                                 <CollapsibleContent asChild>
//                                     <TableRow>
//                                         <TableCell colSpan={5}>
//                                             <div className="p-4 bg-muted rounded-md">
//                                                 <h4 className="font-semibold mb-2">Payment Details</h4>
//                                                 <div className="grid grid-cols-2 gap-4">
//                                                     <div>
//                                                         <p>
//                                                             <strong>Contract ID:</strong> {payment.contractId}
//                                                         </p>
//                                                         AdminTransactions{" "}
//                                                         <p>
//                                                             <strong>Milestone ID:</strong> {payment.milestoneId}
//                                                         </p>
//                                                         <p>
//                                                             <strong>Client ID:</strong> {payment.clientId}
//                                                         </p>
//                                                         <p>
//                                                             <strong>Freelancer ID:</strong> {payment.freelancerId}
//                                                         </p>
//                                                     </div>
//                                                     <div>
//                                                         <p>
//                                                             <strong>Stripe Session ID:</strong> {payment.stripeSessionId || "N/A"}
//                                                         </p>
//                                                         <p>
//                                                             <strong>Stripe Payment Intent ID:</strong> {payment.stripePaymentIntentId || "N/A"}
//                                                         </p>
//                                                         <p>
//                                                             <strong>Stripe Charge ID:</strong> {payment.stripeChargeId || "N/A"}
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                                 <h4 className="font-semibold mt-4 mb-2">Escrow Details</h4>
//                                                 <div className="grid grid-cols-2 gap-4">
//                                                     <div>
//                                                         <p>
//                                                             <strong>Escrow ID:</strong> {payment.escrowId}
//                                                         </p>
//                                                         <p>
//                                                             <strong>Escrow Amount:</strong> {formatCurrency(payment.escrow.amount)}
//                                                         </p>
//                                                     </div>
//                                                     <div>
//                                                         <p>
//                                                             <strong>Escrow Status:</strong> {getStatusBadge(payment.escrow.status)}
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </TableCell>
//                                     </TableRow>
//                                 </CollapsibleContent>
//                             </Collapsible>
//                         ))}
//                     </TableBody>
//                 </Table>
//                 <div className="flex justify-between items-center mt-4">
//                     {/* <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
//                         Previous
//                     </Button> */}
//                     {/* <span>
//                         Page {page} of {totalPages}
//                     </span> */}
//                     {/* <Button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
//                         Next
//                     </Button> */}
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }
