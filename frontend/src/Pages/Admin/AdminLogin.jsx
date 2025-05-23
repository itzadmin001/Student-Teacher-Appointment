import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { FaLock, FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { auth } from "../../Firebase"
import { MainContext } from '../../MainCon'
import LoadingPage from '../../Components/Student/LoadingPage'

function AdminLogin() {
    const navigate = useNavigate()
    const [loading, SetLoading] = useState(false)
    const { notify, currentUser } = useContext(MainContext)

    useEffect(() => {
        if (currentUser) {
            setTimeout(() => {
                navigate("/admin")

            }, 2000)
        } else {
        }

    }, [currentUser])

    const FormLoginHandler = (e) => {
        e.preventDefault()
        const data = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        if (data.email != "admin@gmail.com") {
            notify("invalid email & password", "error")
        } else {
            try {
                e.target.reset()
                SetLoading(true)
                signInWithEmailAndPassword(auth, data.email, data.password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        notify("Account Login SuccessFully", "success")
                        setTimeout(() => {
                            SetLoading(false)
                            navigate("/admin")

                        }, 3000);
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

    }


    if (loading) return <LoadingPage />

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br  p-4">
            <form className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6 animate-fadeIn" onSubmit={FormLoginHandler}>
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-2">Admin Login</h2>
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
                <label htmlFor="" className=' text-gray-500'>Email: admin@gmail.com</label>
                <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
                    <FaLock className="text-blue-500 mr-3" />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        name='password'
                        className="bg-transparent outline-none flex-1 py-2"
                    />
                </div>
                <label htmlFor="" className=' text-gray-500'>Pasword: admin@12345</label>
                <div className="flex gap-4 justify-center mt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition"
                    >
                        Login
                    </button>

                </div>
            </form>
        </div>
    )
}

export default AdminLogin
