import { UserNav } from "@/components/common/user_nav";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";


export default async function UserApp() {

    let loggedIn = false;

    try {

        const supabase = createServerComponentClient({ cookies })
        const { data: { session }, } = await supabase.auth.getSession();

        if (session) loggedIn = true;
        //

    } catch (error) {
        console.log("UserApp", error);
    } finally {
        if (!loggedIn) redirect("/", RedirectType.replace);
    }

    return (

        <div>
        <h1>Usuario Logado</h1>

        <UserNav/>
        </div>
    )
}