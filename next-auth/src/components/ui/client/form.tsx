"use client"

import { Input } from "../input"
import { Button } from "../button"
import { toast } from "sonner"
import Login from "@/app/login/page"

const LoginForm = ()=>{
    return (
        <form
           className="flex flex-col gap-4" action={async (formData)=>{
            const email = formData.get("email") as string
            const password = formData.get("password") as string
            if(!email || !password) toast.error("Please provide fields");
            await Login(email,password)
          }}>
            <Input type="email" placeholder="Email" name="email" />
            <Input type="password" placeholder="Password" name="password"/>
            <Button type="submit">Login</Button>
          </form>
    )
    
}
export default LoginForm