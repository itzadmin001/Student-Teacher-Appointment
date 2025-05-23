import React, { useContext } from 'react'
import Student from "../../assets/Images/Student2.jpg"
import Teacher from "../../assets/Images/Teachers2.jpg"
import Admin from "../../assets/Images/Admin2.jpg"
import Button from '../../Components/Student/Button'
import { Link, useNavigate } from 'react-router-dom'
import { MainContext } from '../../MainCon'


function Home() {
    const navigate = useNavigate()
    const { Light, SetLight } = useContext(MainContext)
    const date = new Date()

    return (
        <div>
            <div className=' fixed bottom-2 right-2 bg-white p-4 rounded-lg shadow-2xl border-2 border-gray-500' >{date.toDateString()}</div>
            <Hero Light={Light} />
        </div>
    )
}

const Hero = ({ Light }) => {
    return (
        <section className={`w-full h-[100vh] p-4 flex flex-col justify-center items-center duration-500 select-none ${Light ? "bg-gray-800  text-gray-100" : ""}`}>
            <h1 className=' text-center text-4xl font-bold mb-10'>Student-Teacher Appointment</h1>
            <main className=' w-3/5 grid grid-cols-3 gap-4'>
                <div className={`p-4 border-2 shadow-lg select-none duration-300 ${Light ? "rounded-3xl" : "rounded-lg "}`}>
                    <img src={Student} alt="" className='rounded-lg' />
                    <div className=' text-center flex flex-col gap-3 mt-5'>
                        <h1 className='text-2xl font-semiBold'>Student</h1>
                        <Link to={"/student/login"} className="bg-blue-500 py-2 px-4 font-semiBold hover:bg-blue-700 hover:text-gray-200 duration-300 rounded-lg" >Join</Link>
                    </div>
                </div>
                <div className={`p-4 border-2 shadow-lg select-none duration-300 ${Light ? "rounded-3xl" : "rounded-lg "}`}>
                    <img src={Teacher} alt="" className='rounded-lg' />
                    <div className=' text-center flex flex-col gap-3 mt-5'>
                        <h1 className='text-2xl font-semiBold'>Teachers</h1>
                        <Link to={"/teacher/login"} className="bg-blue-500 py-2 px-4 font-semiBold hover:bg-blue-700 hover:text-gray-200 duration-300 rounded-lg" >Join</Link>
                    </div>
                </div>
                <div className={`p-4 border-2 shadow-lg select-none duration-300 ${Light ? "rounded-3xl" : "rounded-lg "}`}>
                    <img src={Admin} alt="" className='rounded-lg' />
                    <div className=' text-center flex flex-col gap-3 mt-5'>
                        <h1 className='text-2xl font-semiBold'>Admin</h1>
                        <Link to={"/admin/login"} className="bg-blue-500 py-2 px-4 font-semiBold hover:bg-blue-700 hover:text-gray-200 duration-300 rounded-lg" >Join</Link>
                    </div>
                </div>

            </main>
        </section>
    )
}



export default Home
