import React, { useContext, useEffect, useState } from 'react'
import { FaUser, FaLock } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Firebase"
import { MainContext } from '../../MainCon';
import LoadingPage from '../../Components/Student/LoadingPage';


function StudentLogin() {
    const { notify, currentUser } = useContext(MainContext)
    const [loading, SetLoading] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        if (currentUser) {
            navigate("/student/dashboard")
        }
    }, [currentUser])


    const FormLoginHandler = (e) => {
        e.preventDefault()
        SetLoading(true)
        const data = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        try {
            e.target.reset()
            signInWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    SetLoading(false)
                    notify("Account Login SuccessFully", "success")
                    navigate("/student/dashboard")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    notify(errorMessage, "error")
                    SetLoading(false)
                });
        } catch (err) {
            notify("intenal server eror", "error")
            SetLoading(false)

        }

    }


    if (loading) return <LoadingPage />


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br  p-4">
            <form className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6 animate-fadeIn" onSubmit={FormLoginHandler}>
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-2">Student Login</h2>
                <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
                    <FaUser className="text-blue-500 mr-3" />
                    <input
                        type="email"
                        placeholder="Email"
                        name='email'
                        required
                        className="bg-transparent outline-none flex-1 py-2"
                    />
                </div>

                <label htmlFor="" className=' text-gray-500'>Email: student@gmail.com</label>
                <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
                    <FaLock className="text-blue-500 mr-3" />
                    <input
                        type="password"
                        placeholder="Password"
                        name='password'
                        required
                        className="bg-transparent outline-none flex-1 py-2"
                    />
                </div>

                <label htmlFor="" className=' text-gray-500'>password: stu@123</label>
                <div className="flex gap-4 justify-center mt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition"
                    >
                        Login
                    </button>
                    <Link to="/student/sign-up">
                        <button
                            type="button"
                            className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 px-6 rounded-lg shadow transition"
                        >
                            Register
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default StudentLogin