import React, { useContext, useEffect } from 'react'
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { MainContext } from '../../MainCon';
import { auth } from "../../Firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { GoPackage } from "react-icons/go";
import { ref, set } from 'firebase/database';
import { db } from "../../Firebase"
function StudentSignup() {

    const { notify, currentUser } = useContext(MainContext)
    const navigate = useNavigate()

    const SignUpHandler = (e) => {
        e.preventDefault()
        if (e.target.password.value != e.target.confirm_password.value) {
            alert("password not be match")
        } else {
            const data = {
                name: e.target.firstname.value + " " + e.target.lastname.value,
                email: e.target.email.value,
                password: e.target.password.value,
                subject: e.target.subject.value
            }
            createUserWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    e.target.reset()
                    const FindUser = userCredential.user;
                    set(ref(db, 'users/' + FindUser.uid), {
                        name: data.name,
                        email: data.email,
                        role: "user",
                        status: "pending",
                        subject: data.subject
                    }).then((success) => {
                        notify("Your request is Pending please wait", 1)
                        navigate("/status")
                    }).catch((eror) => {
                        notify(eror)
                    })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    notify(errorMessage, "error")
                });

        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-500  p-4">
            <form className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6 animate-fadeIn" onSubmit={SignUpHandler}>
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-2">Student Sign Up</h2>
                <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
                    <FaUser className="text-blue-500 mr-3" />
                    <input
                        type="text"
                        placeholder="First Name"
                        required
                        name='firstname'
                        className="bg-transparent outline-none flex-1 py-2"
                    />
                </div>
                <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
                    <FaUser className="text-blue-500 mr-3" />
                    <input
                        type="text"
                        placeholder="Last Name"
                        required
                        name='lastname'
                        className="bg-transparent outline-none flex-1 py-2"
                    />
                </div>
                <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
                    <FaEnvelope className="text-blue-500 mr-3" />
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        name='email'
                        className="bg-transparent outline-none flex-1 py-2"
                    />
                </div>
                <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
                    <GoPackage className="text-blue-500 mr-3" />
                    <input
                        type="subject"
                        placeholder="subject"
                        required
                        name='subject'
                        className="bg-transparent outline-none flex-1 py-2"
                    />
                </div>
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
                <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
                    <FaLock className="text-blue-500 mr-3" />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        required
                        name='confirm_password'
                        className="bg-transparent outline-none flex-1 py-2"
                    />
                </div>
                <div className="flex gap-4 justify-center mt-4">
                    <Link to="/student/login">
                        <button
                            type="button"
                            className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 px-6 rounded-lg shadow transition"
                        >
                            Login
                        </button>
                    </Link>
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}

export default StudentSignup