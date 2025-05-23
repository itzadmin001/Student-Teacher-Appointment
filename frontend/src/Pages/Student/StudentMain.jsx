import React from 'react'
import Header from '../../Components/Student/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../../Components/Student/Footer'

function StudentMain() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>


    )
}

export default StudentMain
