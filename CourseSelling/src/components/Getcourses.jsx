import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import StyleGetCourses from "./StyleGetCourses";

const Getcourses = () => {
    const [showData, setshowData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        const data = await fetch("http://localhost:3000/admin/courses", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        });
        const json = await data.json();
        setshowData(json);
    }
    if (showData.length == 0) return;
    return (
        <>
            <div className="flex flex-wrap justify-around">
                
                {
                    (showData.courses).map((data,index) => <StyleGetCourses key={index} course={data} />)
                }
            </div>
        </>
    )
}
export default Getcourses;