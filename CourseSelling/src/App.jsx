import { useState } from 'react'
import SignupPage from './components/SignupPage.jsx';
import AppHeader from './components/AppHeader.jsx';
import LoginPage from './components/LoginPage.jsx';
import AddCourses from './components/AddCourses.jsx';
import Getcourses from './components/Getcourses.jsx';
import UpdateCourse from './components/UpdateCourse.jsx';
import { Route,  BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='h-[100vh] w-[100vw] bg-[#eeeeee]'>
      <Router>
      <AppHeader />
        <Routes>
            <Route path='/addcourses' element={<AddCourses/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
            <Route path='/course/:courseId' element={<UpdateCourse/>} />
            <Route path="/login" element ={<LoginPage/>}/>
            <Route path="/getcourses" element={<Getcourses/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
