"use client"


import {
    Form
} from "@/components/ui/form"
import { CardContent, Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { LoginSchema, LoginData } from "@/lib/zodSchema";
import { useRouter } from "next/navigation";
import AdminFormField from "@/components/AdminLogin/AdminFormField";
import { useSignIn } from "@clerk/nextjs";


export default function AdminLogin() {
    const router = useRouter();
    const { signIn, setActive } = useSignIn();

    const form = useForm<LoginData>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    });

    async function onSubmit(values: LoginData) {
        try {
            const { username, password } = values;
            const signInAttempt = await signIn?.create({
                identifier: username,
                password,
            });

            if (signInAttempt?.status === "complete") {
                setActive?.({ session: signInAttempt?.createdSessionId });
                router.push("/dashboard"); // Redirect to the admin dashboard page
            } else {
                // Handle sign-in errors
                console.error("Sign-in failed");
            }
        } catch (error) {
            // Handle any errors that occurred during sign-in
            console.error("Sign-in error:", error);
        }
    }


    return (
        <div className="container mx-auto px-4 sm:px-0 p-4 flex flex-col gap-4 items-center justify-center">
            <Card className="w-[350px] mt-5">
                <CardHeader>
                    <CardTitle>Admin Login</CardTitle>
                    <CardDescription>Enter your credentials to access the admin dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid w-full items-center gap-4">
                                <AdminFormField control={form.control} name="username" placeholder="Username" />
                                <AdminFormField control={form.control} name="password" placeholder="Password" />
                                <Button type="submit" className="w-full">Sign In</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
