import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';


const LoginPage = () => {
    return (
        <>
            <div className='w-[100%] h-[90vh] flex items-center justify-center'>
                <Card variant="outlined" style={{display:"flex",justifyContent:"center",alignItems:"center", flexDirection:"column",width:"40%",height:"60%"}}>
                    <TextField id="outlined-basic" label="Email" variant="outlined"style={{width:"80%", paddingBottom:"10px"}} />
                    <TextField id="outlined-basic" label="Password" variant="outlined"style={{width:"80%", paddingBottom:"10px"}} />
                    <Button variant="contained"style={{width:"30%"}}>SignUp</Button>
                </Card>
            </div>
        </>
    )
}
export default LoginPage;