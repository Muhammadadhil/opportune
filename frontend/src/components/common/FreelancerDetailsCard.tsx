import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface FreelancerDetailsProps {
    name: string;
    imageUrl: string;
    description: string;
}

export function FreelancerDetails({ name, imageUrl, description }: FreelancerDetailsProps) {
    return (
        <Card className="min-w-[20rem]">
            <CardHeader>
                <CardTitle>Freelancer Details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={imageUrl} alt={name} />
                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{name}</h2>
                <p className="text-sm text-muted-foreground text-center">{description}</p>
            </CardContent>
        </Card>
    );
}
