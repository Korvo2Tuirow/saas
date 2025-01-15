"use client"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";


const formSchema = z.object({
    email: z.string({
        required_error: "Email is required."
    }).email({
        message: "Must be a valid email address."
    }),
    password: z.string({
        required_error: "Password is required."
    }).min(6, {
        message: "Password minimum length 7 caracters."
    })
        .max(20)
})
export function CreateAccountForm() {

    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({

        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        //console.log(values);       

        try {
            const supabase = createClientComponentClient()
            const { email, password } = values;
            
            const {error,
                data: {user},
            } = await supabase.auth.signUp({
                email,
                password,
               /* options: {
                    emailRedirectTo: `${location.origin}/auth/callback`,
                }*/
            });

    
            if(user){
                form.reset();
                router.refresh();
               /*router.push("/")*/
            }

        } catch (error) {
            console.log("CreateAccountForm", error);
        }
    }

       const [view, setView] = useState('password')
        const [hide, setHide] = useState('Show')
        const handleViewPassword = () =>{ 
    
            if(view ==="password") {
                setView("text")
                setHide("Hide")
            }else{
                setView("password")
                setHide("Show")
            }
        }

    return (
        <div className="flex flex-col justify-center items-center space-y-2">

            <span className="text-lg">You will love it.</span>
            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-2">

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input placeholder="E-mail"
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="password" type={view}
                                        {...field} />
                                </FormControl>
                                <button onClick={handleViewPassword} className="text-gray-500  w-full text-sm text-end">{hide} password</button>                             
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Create Account</Button>

                </form>



            </Form>



        </div>
    )
}