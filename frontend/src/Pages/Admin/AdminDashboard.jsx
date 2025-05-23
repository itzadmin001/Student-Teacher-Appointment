import React, { use, useContext, useEffect, useState } from 'react'
import { FaPlus, FaTrash, FaCheck, FaTimes } from 'react-icons/fa'
import { MainContext } from '../../MainCon'
import { useNavigate } from 'react-router-dom'
import LoadingPage from "../../Components/Student/LoadingPage"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { ref, remove, set, update } from 'firebase/database'
import { auth, db } from "../../Firebase"





function AdminDashboard() {
    const { role, notify, currentUser, teachers, setTeacher, getAllStudent, getTeachers, Allstudents } = useContext(MainContext)
    const navigate = useNavigate()
    const [loading, Setloading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [refresh, setRefresh] = useState(false);
    const [pendingStudents, setPendingStudents] = useState([]);


    useEffect(() => {
        const filtered = Allstudents.filter(student => student.status === "pending");
        setPendingStudents(filtered);
    }, [Allstudents]);

    useEffect(() => {
        getTeachers({ setTeacher });
        getAllStudent({ Allstudents });
    }, [refresh]);

    useEffect(() => {
        if (currentUser) {
            if (currentUser.role === "admin") {
                Setloading(false)
            } else if (currentUser.role === "user") {
                navigate("/student/login")
            } else if (currentUser.role === "teacher") {
                navigate("/teacher/login")
            }
        } else {
            navigate("/admin/login")

        }

    }, [currentUser])

    console.log(pendingStudents)


    const handleAddTeacher = (e) => {
        e.preventDefault()

        if (e.target.confirmPassword.value != e.target.password.value) {
            notify("password do'not same")
        } else {
            const data = {
                name: e.target.name.value,
                department: e.target.department.value,
                subject: e.target.subject.value,
                age: e.target.age.value,
                email: e.target.email.value,
                password: e.target.password.value
            }

            createUserWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    e.target.reset()
                    setShowForm(false)
                    const FindUser = userCredential.user;
                    set(ref(db, 'users/' + FindUser.uid), {
                        name: data.name,
                        email: data.email,
                        role: "teacher",
                        age: data.age,
                        subject: data.subject,
                        department: data.department,
                    }).then((success) => {
                        setRefresh(r => !r);
                        notify("Teacher account craeted successfully", "success")
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



    const handleApproveStudent = async (userId) => {
        // Approve logic here
        const userRef = ref(db, `users/${userId}`);
        try {
            await update(userRef, { status: "success" });
            setRefresh(r => !r);
            console.log(`Status updated for user ${userId} to "success"`);
        } catch (error) {
            console.error("Error updating user status:", error);
        }
    }

    const handleRejectStudent = async (userId) => {
        const userRef = ref(db, `users/${userId}`);
        try {
            await update(userRef, { status: "rejected" });
            setRefresh(r => !r);
            console.log(`Status updated for user ${userId} to "reject"`);
        } catch (error) {
            console.error("Error updating user status:", error);
        }

    }


    if (loading) return <LoadingPage />
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            {/* Create Teacher */}
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-blue-700">Create Teacher</h2>
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
                    >
                        <FaPlus /> Create Teacher
                    </button>
                </div>
                {showForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                            <h3 className="text-lg font-semibold mb-4 text-blue-700">Add Teacher</h3>
                            <form onSubmit={handleAddTeacher} className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Teacher Name"
                                    required
                                    className="border rounded-lg px-3 py-2 outline-blue-500"
                                />
                                <input
                                    type="text"
                                    name="department"
                                    placeholder="Department"
                                    required
                                    className="border rounded-lg px-3 py-2 outline-blue-500"
                                />
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    required
                                    className="border rounded-lg px-3 py-2 outline-blue-500"
                                />
                                <input
                                    type="number"
                                    name="age"
                                    placeholder="Age"
                                    required
                                    className="border rounded-lg px-3 py-2 outline-blue-500"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    className="border rounded-lg px-3 py-2 outline-blue-500"
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    className="border rounded-lg px-3 py-2 outline-blue-500"
                                />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    required
                                    className="border rounded-lg px-3 py-2 outline-blue-500"
                                />
                                <div className="flex gap-3 mt-2">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                                    >
                                        Add Teacher
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-blue-700 px-4 py-2 rounded-lg transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            {/* Teachers Table */}
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-8">
                <h2 className="text-xl font-bold text-blue-700 mb-4">All Teachers</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                                <th className="py-3 px-4 text-left">Sr. No</th>
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">Department</th>
                                <th className="py-3 px-4 text-left">Subject</th>
                                <th className="py-3 px-4 text-left">Age</th>
                                <th className="py-3 px-4 text-left">Email</th>
                                <th className="py-3 px-4 text-center">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.map((t, idx) => (
                                <tr key={t.id} className="hover:bg-blue-50 transition">
                                    <td className="py-3 px-4 border-b">{idx + 1}</td>
                                    <td className="py-3 px-4 border-b">{t.name}</td>
                                    <td className="py-3 px-4 border-b">{t.department}</td>
                                    <td className="py-3 px-4 border-b">{t.subject}</td>
                                    <td className="py-3 px-4 border-b">{t.age}</td>
                                    <td className="py-3 px-4 border-b">{t.email}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Students Cards */}
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-blue-700 mb-6">Students</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pendingStudents && pendingStudents.length > 0 ? pendingStudents?.map(s => (

                        <div key={s.id} className="bg-blue-50 rounded-lg shadow p-5 flex flex-col gap-3">
                            <div>
                                <h3 className="font-semibold text-blue-800">{s.name}</h3>
                                <p className="text-sm text-gray-600">{s.email}</p>
                                <p className="text-sm text-gray-600">subject: {s.subject}</p>
                            </div>
                            <div className="flex gap-3 mt-3">
                                <button
                                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition"
                                    onClick={() => handleApproveStudent(s.id)}
                                >
                                    <FaCheck /> Approve
                                </button>
                                <button
                                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition"
                                    onClick={() => handleRejectStudent(s.id)}
                                >
                                    <FaTimes /> Reject
                                </button>
                            </div>
                        </div>
                    )) : <h1 className=' text-sm text-gray-500' >No pending reqest student</h1>}
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard