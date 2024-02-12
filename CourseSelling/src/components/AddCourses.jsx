import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useState } from 'react';

const AddCourses = () => {
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
                            console.log(data);
                        }
                        function callback(res) {
                            res.json().then(callback2)
                        }
                        fetch("http://localhost:3000/admin/courses", {
                            method: "POST",
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
export default AddCourses