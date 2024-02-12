import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import StyleGetCourses from "./StyleGetCourses";
import { Button, Card, TextField } from "@mui/material";

const ChangeCourse = ({course})=>{
    const [titel, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [price, setprice] = useState("");
    const [image, setimage] = useState("");
    return (
        <>
            <div className='w-[100%] h-[90vh] flex items-center justify-center'>
                <Card variant="outlined" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "40%", height: "60%" }}>
                    <TextField id="title" label="Title" type='text' variant="outlined" style={{ width: "80%", paddingBottom: "10px" }} onChange={(e) => settitle(e.target.value)} />
                    <TextField id="description" label="description" type='text' variant="outlined" style={{ width: "80%", paddingBottom: "10px" }} onChange={(e) => setdescription(e.target.value)} />
                    <TextField id="price" label="Price" type='number' variant="outlined" style={{ width: "80%", paddingBottom: "10px" }} onChange={(e) => setprice(e.target.value)} />
                    <TextField id="imageLink" label="imageLink" type='text' variant="outlined" style={{ width: "80%", paddingBottom: "10px" }} onChange={(e) => setimage(e.target.value)} />
                    <Button variant="contained" style={{ width: "30%" }} onClick={() => {
                        function callback2(data) {
                            window.location = '/getcourses';
                            console.log(data);
                        }
                        function callback(res) {
                            res.json().then(callback2)
                        }
                        fetch("http://localhost:3000/admin/courses/"+course._id, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Bearer "+ localStorage.getItem("token")
                            },
                            body: JSON.stringify({
                                title: titel,
                                description: description,
                                price: price,
                                imageLink: image,
                                published: true
                            })
                    }).then(callback)
                             
                    }}>Submit</Button>
            </Card>
         </div >    
        </>
    )
}

const UpdateCourse = () => {
    const {courseId} = useParams();
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
    
    let course = showData.courses.filter((data,index)=>(index)==courseId)
    
  return (
    <div className="flex ">
        {<>

            <StyleGetCourses course={course[0]}/>
            <ChangeCourse course={course[0]}/>
        </>

        }    

    </div>
  )
}

export default UpdateCourse