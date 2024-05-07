import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"



const FormSkeleton = () => {
    return (
        <div className='container mx-auto px-4 sm:px-0 bg-slate-700 p-4 flex items-center flex-col gap-4'>
            <div className="p-5 text-center flex flex-col items-center gap-4">
                <h1 className='text-2xl sm:text-4xl font-bold text-white'>
                    <Skeleton className="h-[20px] w-[400px] rounded" />
                </h1>
                <h2 className='text-xl sm:text-2xl text-white'>
                    <Skeleton className="h-[20px] w-[200px] rounded" />
                </h2>
            </div>
            <Card className='bg-slate-300 p-4 flex flex-col items-center w-full sm:w-1/2'>
                <CardHeader className='mb-3 items-center'>
                    <CardTitle>
                        <Skeleton className="h-[20px] w-[200px] rounded" />
                    </CardTitle>
                    <CardDescription>
                        <Skeleton className="h-[20px] w-[200px] rounded" />
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="w-2/3 space-y-2">
                        <Skeleton className="h-[20px] w-[200px] rounded" />
                        <Skeleton className="h-[20px] w-[200px] rounded" />
                        <Skeleton className="h-[20px] w-[200px] rounded" />
                        <Skeleton className="h-[20px] w-[200px] rounded" />
                        <Skeleton className="h-[20px] w-[200px] rounded" />
                        <Skeleton className="h-[20px] w-[200px] rounded" />
                        <Skeleton className="h-[20px] w-[200px] rounded" />
                        <Skeleton className="h-[20px] w-[200px] rounded" />
                    </div>
                </CardContent>
            </Card>
        </div>

    )
}

export default FormSkeleton