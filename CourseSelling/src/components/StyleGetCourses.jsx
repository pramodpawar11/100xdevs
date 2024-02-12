import { Card } from '@mui/material';
import React from 'react'

const StyleGetCourses = ({ course }) => {
    const { title, description, imageLink, price } = course;
    return (
        <div className="flex justify-center items-center">

            <Card className="flex flex-col items-center justify-center  border-2 m-5 cursor-pointer">
                <h1>{title}</h1>
                <p>{description}</p>
                <p>{price}</p>
                <img className="h-40" src={imageLink} />
            </Card>

        </div>
    )
}

export default StyleGetCourses