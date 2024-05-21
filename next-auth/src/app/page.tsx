import { auth } from "@/auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth()
  const user = session?.user;
  
  return (
    <div className="h-dvh flex items-center justify-center">
      <h1 className="text-5xl font-bold">Hello world</h1>
    </div>
  );
}
