"use client"

import {
    Form
} from "@/components/ui/form"
import { CardContent, Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { LoginSchema, LoginData } from "@/lib/zodSchema";
import { useRouter, useSearchParams } from "next/navigation";
import AdminFormField from "@/components/AdminLogin/AdminFormField";
import { useSignIn } from "@clerk/nextjs";


export default function AdminLogin() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { signIn, setActive, isLoaded } = useSignIn();

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
            console.log("username", username);
            console.log("password", password);
            const signInAttempt = await signIn?.create({
                identifier: username,
                password,
                redirectUrl: "/dashboard",
            });

            console.log("signInAttempt", signInAttempt);

            if (signInAttempt?.status === "complete") {
                setActive?.({ session: signInAttempt?.createdSessionId },);
                
                
                
                // const redirectUrl = searchParams.get("redirect_url");
                // console.log("redirectUrl", redirectUrl);
                // if (redirectUrl) {
                //     router.push(redirectUrl);
                // } else {
                //     router.push("/dashboard");
                // }
            } else {
                // Handle sign-in errors
                form.setError("root", {
                    type: "manual",
                    message: "Sign-in failed. Please check your credentials.",
                });
            }
        } catch (error) {
            // Handle any errors that occurred during sign-in
            if (error instanceof Error) {
                if (error.message.includes("422")) {
                    form.setError("root", {
                        type: "manual",
                        message: "Invalid credentials. Please check your username and password.",
                    });
                } else {
                    form.setError("root", {
                        type: "manual",
                        message: "An error occurred during sign-in. Please try again.",
                    });
                }
            }
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
                                {form.formState.errors.root && (
                                    <p className="text-red-500">
                                        {form.formState.errors.root.message}
                                    </p>
                                )}
                                <Button type="submit" className="w-full" disabled={!isLoaded}>
                                    {isLoaded ? "Sign In" : "Loading..."}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
