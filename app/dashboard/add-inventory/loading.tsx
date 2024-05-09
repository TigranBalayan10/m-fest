import FormSkeleton from "@/components/DashboardForm/FormSkeleton"



const Loading = () => {
    return (
        <div className='container mx-auto px-4 sm:px-0 p-4 flex flex-col gap-4 items-center justify-center'>
            <FormSkeleton />
        </div>
    )

}

export default Loading