// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell,TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {Button} from '@/components/ui/button';
import useApplications from '@/hooks/jobs/useApplications';
import {useSelector} from 'react-redux'
import {RootState} from '@/store/store';
import {IApplication} from '@/types/IApplication';
import {useParams} from 'react-router-dom';
// import TableRowSkelton from '@/components/common/TableRowSkelton';

export const JobApplications: React.FC = () => {

    const {userInfo}=useSelector((state:RootState)=> state.user)

    const clientId = userInfo?._id;
    const {id} = useParams();

    const {data:applications} = useApplications(clientId,id!);

    return (
        <div className="mx-auto px-4 py-8">
            <Table className="border ">
                <TableCaption>A list of your recent applications.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[300px]">Id</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* {isLoading && applications?.data?.applications.map(() => <TableRowSkelton />)} */}
                    {applications?.data?.applications.map((app: IApplication) => {
                        return (
                            <TableRow className="h-20" key={app._id}>
                                <TableCell className="font-medium">APP{app._id}</TableCell>
                                <TableCell>{app.status}</TableCell>
                                <TableCell>{app?.freelancerDetails?.firstname + " " + app?.freelancerDetails?.lastname}</TableCell>
                                <TableCell className="text-right ">
                                    <div className="">
                                        <Button variant="default" className="">
                                            Decline
                                        </Button>
                                        <Button className="mx-8 bg-green-800 hover:bg-green-700">Approve</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};
