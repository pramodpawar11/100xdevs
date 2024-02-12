import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useState} from 'react';


const SignupPage = () => {
    const [username,setusername] = useState(" ");
    const [password,setpassword] = useState(" ");
    const [name,setname] = useState(" ");
    return (
        <>
            <div className='w-[100%] h-[90vh] flex items-center justify-center'>
                <Card variant="outlined" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "40%", height: "60%" }}>

                    <TextField id="name" label="Name" variant="outlined" style={{ width: "80%", paddingBottom: "10px" }} onChange={(e)=>{
                        setname(e.target.value);
                    }} />

                    <TextField id="username" label="Email" variant="outlined"  style={{ width: "80%", paddingBottom: "10px"}} onChange={(e)=>{
                        setusername(e.target.value);
                    }} />

                    <TextField id="password" label="Password" variant="outlined" type='password' style={{ width: "80%", paddingBottom: "10px" }} onChange={(e)=>{
                        setpassword(e.target.value);
                    }} />

                    <Button variant="contained" style={{ width: "30%" }} onClick={() => {
                            function callBack2(data){
                                localStorage.setItem("token",data.token);
                                window.location = '/';
                            }
                            function callback(res){
                                res.json().then(callBack2);
                            }
                            fetch("http://localhost:3000/admin/signup",{
                                method:"POST",
                                body:JSON.stringify({
                                    name,
                                    username,
                                    password
                                }),
                                headers:{
                                    "content-type":"application/json"
                                }
                            }).then(callback)
                        }
    
                    }>SignUp</Button>
                </Card>
            </div>
        </>
    )
}
export default SignupPage;