"use client"

import { UserNav } from "../common/user_nav";

export default function UserAppHeader(){
    return(
        <header>
            <nav className="flex justify-between items-center m-4 ">
            <UserNav/>
                <span className="text-2xl font-bold">re<span>Store</span>
                </span>
              
            </nav>

        </header>
    )
}