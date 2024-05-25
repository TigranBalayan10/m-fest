import { Skeleton } from "@/components/ui/skeleton"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "../ui/separator";

const CarCardSkeleton = () => {
    return (
        <Card className="card-bg">
            <CardHeader>
                <CardTitle>
                    <Skeleton className="h-10 w-48" />
                </CardTitle>
                    <Skeleton className="h-7 w-56" />
            </CardHeader>
            <CardContent>
                <Skeleton className=" h-56" />
                <Skeleton className=" h-8 mt-2" />
                <Skeleton className=" h-8 mt-2" />
                <Skeleton className=" h-8 mt-2" />
                <Skeleton className=" h-8 mt-2" />
            </CardContent>
        </Card>
    )
}

export default CarCardSkeleton