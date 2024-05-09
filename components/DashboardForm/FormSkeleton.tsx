import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const FormSkeleton = () => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <Skeleton className="h-[40px] w-[150px] rounded" />
                    </CardTitle>
                    <CardDescription>
                        <Skeleton className="h-[20px] w-[220px] rounded" />
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Skeleton className="h-[30px] w-[400px] rounded" />
                        </div>
                        <div className="grid gap-2">
                            <Skeleton className="h-[30px] w-[400px] rounded" />
                        </div>
                        <div className="grid gap-2">
                            <Skeleton className="h-[30px] w-[400px] rounded" />
                        </div>
                        <div className="grid gap-2">
                            <Skeleton className="h-[70px] w-[400px] rounded" />
                        </div>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Skeleton className="h-[30px] w-[200px] rounded" />
                            </div>
                            <div className="grid gap-2">
                                <Skeleton className="h-[30px] w-[200px] rounded" />
                            </div>
                            <div className="grid gap-2">
                                <Skeleton className="h-[30px] w-[200px] rounded" />
                            </div>
                            <div className="grid gap-2">
                                <Skeleton className="h-[30px] w-[200px] rounded" />
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block ">
                                <Skeleton className="h-[30px] w-[200px] rounded" />
                            </div>
                        </div>
                    </div>
                    <CardFooter className="flex justify-end gap-3 px-0 my-4">
                        <Skeleton className="h-[30px] w-[100px] rounded" />
                        <Skeleton className="h-[30px] w-[100px] rounded" />
                        <Skeleton className="h-[30px] w-[100px] rounded" />
                    </CardFooter>
                </CardContent>
            </Card>
        </>
    )
}

export default FormSkeleton