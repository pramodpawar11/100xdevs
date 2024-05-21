import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { CredentialsSignin } from "next-auth";
import LoginForm from "@/components/ui/client/form";
const Login = async (email:string,password:string) => {
    const loginHandler = async (email:string,password:string)=>{
        "use server"
        try{
            await signIn("credentials",{
                email,
                password,
                redirect:true,
                redirectTo:"/"
            });
        }
        catch(error){
            const err = error as CredentialsSignin;
            return err.message
        }
    }
  return (
    <div className="flex items-center justify-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent >
          <LoginForm/>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
            <form>
                <Button variant={"outline"} type="submit">Login with google</Button>
            </form>
            <Link href="/signup">Dont't have an account? Signup</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
