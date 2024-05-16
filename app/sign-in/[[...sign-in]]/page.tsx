import { Card } from "@/components/ui/card";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="container mx-auto px-4 sm:px-0 p-4 flex flex-col gap-4 items-center justify-center">
            <Card className="w-[350px] mt-5">
                <SignIn path="/sign-in" />
            </Card>
        </div>
    )
}