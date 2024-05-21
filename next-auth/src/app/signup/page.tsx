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
import { User } from "@/models/userSchema";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { connectionToDb } from "@/lib/utils";
const Page = () => {
    const signup =async (formData: FormData)=>{
        "use server";
              const name = formData.get("name") as string | undefined;
              const email = formData.get("email") as string | undefined;
              const password = formData.get("password") as string | undefined;

              if(!email || !password || !name){
                throw new Error ("Please provide all fields");
              }
              await connectionToDb()
              const user = await User.findOne({email});
              if(user) throw new Error ("user alredy exists");
              const hashedPassword = await hash(password,10);
              await User.create({
                name,
                email,
                password:hashedPassword,
              });
             redirect("/login");
            }
    
  return (
    <div className="flex items-center justify-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={signup}
            className="flex flex-col gap-4"
          >
            <Input type="text" placeholder="Name" name="name" />
            <Input type="email" placeholder="Email" name="email" />
            <Input type="password" placeholder="Password" name="password"/>
            <Button type="submit">Signup</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <form>
            <Button variant={"outline"} type="submit">
              signup with google
            </Button>
          </form>
          <Link href="/login">Allredy have an account? Signin</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
;

export default Page;
