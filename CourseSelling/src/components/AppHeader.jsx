import { Button } from "@mui/material"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AppHeader = () => {
    const navigate = useNavigate();
    const [email,setemail] = useState(null);
    useEffect(()=>{
        fetchData();
    },[]);
    const fetchData = async ()=>{
        const data = await fetch("http://localhost:3000/admin/me",{
            method:"GET",
            headers:{
                "Authorization": "Bearer "+ localStorage.getItem("token"),
            }
        })
        const json = await data.json();
        setemail(json.username);
        console.log(json.username);
    }   
    if(email){
        return (
            <>
                <div className="max-w-[1024px] h-[10vh] mx-auto ">
                <div className="grid grid-cols-2 pt-[10px]">
                    <div>
                        <h1 className="font-bold text-2xl italic underline">Coursera</h1>
                    </div>
                    <div className="flex justify-end gap-3">
                        <h1>{email}</h1>
                        <Button variant="contained" onClick={()=>{
                             localStorage.setItem("token",null);
                             window.location="/";
                        }}>SignOut</Button>
                    </div>
                </div>
                </div>
            </>
        )
    }
    else{
    return (
        <>
            <div className="max-w-[1024px] h-[10vh] mx-auto ">
            <div className="grid grid-cols-2 pt-[10px]">
                <div>
                    <h1 className="font-bold text-2xl italic underline">Coursera</h1>
                </div>
                <div className="flex justify-end gap-3">
                    <Button variant="contained" onClick={()=>{
                        navigate("/signup")
                    }}>SignUp</Button>
                    <Button variant="contained" onClick={()=>{
                         navigate("/Login")
                    }}>Login</Button>
                </div>
            </div>
            </div>
        </>
    )
}
}
export default AppHeader;