import { Button } from "@/components/ui/button";
import { revalidateAll } from "@/lib/actions";


const GetNewMessagesButton = () => {
    return (
        <form action={revalidateAll}>
            <Button>Get New Messages</Button>
        </form>
    )
}

export default GetNewMessagesButton