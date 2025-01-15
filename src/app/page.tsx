import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";


import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CreateAccountForm } from "@/components/ui/auth/create-account-form";
import { LoginAccountForm } from "@/components/ui/auth/login-account-form";

export default async function Home() {

  let loggedIn = false;

  try {

    const supabase = createServerComponentClient({ cookies })
    const { data: { session }, } = await supabase.auth.getSession();

    if (session) loggedIn = true;
    //

  } catch (error) {
    console.log("Home", error);
  } finally{
    if(loggedIn) redirect("/user-app", RedirectType.replace);
  }

  return (
    <div className="flex justify-center items-center h-screen"> 
    
     <Tabs defaultValue="create-account" className="w-[400px] border rounded-md pb-4 shadow-2xl">
      <TabsList className="flex justify-around items-center rounded-b-none h-14 bg-gradient-to-r from-blue-500 to-sky-500">
        <TabsTrigger value="create-account" className="text-white font-bold">Account</TabsTrigger>
        <TabsTrigger value="login" className="text-white font-bold">Login</TabsTrigger>
      </TabsList>
      
      <TabsContent value="create-account">
       <CreateAccountForm/>
      </TabsContent>

      <TabsContent value="login">
      <LoginAccountForm/>
      </TabsContent>
    </Tabs>
    </div>
  );
}
