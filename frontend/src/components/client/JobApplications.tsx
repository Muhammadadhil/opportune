// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell,TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {Button} from '@/components/ui/button';
import useApplications from '@/hooks/jobs/useApplications';
import {useSelector} from 'react-redux'
import {RootState} from '@/store/store';
import {IApplication} from '@/types/IApplication';
import {useParams} from 'react-router-dom';

export const JobApplications: React.FC = () => {

    const {userInfo}=useSelector((state:RootState)=> state.user)

    const clientId = userInfo?._id;
    const {id} = useParams();

    const {data:applications} = useApplications(clientId,id!);
    console.log('applcations:',applications);


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
                    {applications?.data?.applications.map((app: IApplication) => {
                        return (
                            <TableRow className="h-20" key={app._id}>
                                <TableCell className="font-medium">APP{app._id}</TableCell>
                                <TableCell>{app.status}</TableCell>
                                <TableCell>Muhammd adhil</TableCell>
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


 {
     /* <Card className="w-full w-max-4xl mx-auto">
                <CardHeader>
                    <CardTitle>
                        <div className="flex justify-stretch">
                            <h2>muhammad adhil</h2>
                            <h2 className="text-gray-400 mx-32">application id: 8943759782934890</h2>
                        </div>
                    </CardTitle>
                    <CardDescription>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been</CardDescription>
                    <CardContent></CardContent>
                </CardHeader>
            </Card> */
 }

 // In Contract Service
// const applications = await ApplicationModel.find({ clientId: someClientId });

// // Batch API call to Freelancer Service
// const freelancerIds = applications.map(app => app.freelancerId);
// const freelancers = await axios.post('http://freelancer-service/api/freelancers/batch', { ids: freelancerIds });

// // Combine data
// const enrichedApplications = applications.map(app => ({
//     ...app,
//     freelancerDetails: freelancers.find(f => f.id === app.freelancerId),
// }));

// return enrichedApplications;
