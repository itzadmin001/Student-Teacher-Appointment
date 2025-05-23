import React, { useContext, useEffect, useState } from 'react'
import { FaPlus, FaTrash, FaCheck, FaTimes } from 'react-icons/fa'
import { MainContext } from '../../MainCon'
import { useNavigate } from 'react-router-dom'
import LoadingPage from '../../Components/Student/LoadingPage'
import { db } from "../../Firebase"
import { ref, remove, update } from 'firebase/database'

function TeachersDashboard() {
    const {
        currentUser,
        getTeacherAppointments,
        successfulAppointments,
        notify,
        getSuccessfulAppointments,
        teacherAppointments
    } = useContext(MainContext);

    const [showSchedule, setShowSchedule] = useState(false);
    const [rejectId, setRejectId] = useState(null);
    const [schedules, setSchedules] = useState([{ date: "", time: "" }]);
    const [rejectReason, setRejectReason] = useState("");
    const [loading, SetLoading] = useState(true);
    const navigate = useNavigate();

    const addScheduleSlot = () => {
        setSchedules([...schedules, { date: "", time: "" }]);
    };

    useEffect(() => {
        if (currentUser) {
            SetLoading(false);
            if (currentUser.role === "teacher") {
                getTeacherAppointments(currentUser.uid);
                getSuccessfulAppointments(currentUser.uid);
            } else if (currentUser.role === "user") {
                navigate("/student/dashboard");
            } else {
                navigate("/teacher/login");
            }
        } else {
            navigate("/teacher/login");
        }
        // eslint-disable-next-line
    }, [currentUser]);

    const handleAddSchedule = async (e, userId) => {
        e.preventDefault();
        const userRef = ref(db, `users/${userId}`);
        try {
            await update(userRef, {
                schedules: schedules,
                status: "success"
            });
            setShowSchedule(false);
            setSchedules([{ date: "", time: "" }]);
        } catch (error) {
            console.error("Error updating schedules:", error);
        }
    };

    const handleApprove = async (appointmentId) => {
        try {
            const appointmentRef = ref(db, `appointments/${appointmentId}`);
            await update(appointmentRef, {
                appointment: "success"
            });
            notify("Appointment Approve suucessfully");
            getSuccessfulAppointments(currentUser.uid);
            getTeacherAppointments(currentUser.uid);
        } catch (error) {
            console.error("Error approving appointment:", error);
        }
    };

    const handleReject = async (appointmentId) => {
        if (!rejectReason.trim()) {
            notify("Please enter a reason for rejection.", "error");
            return;
        }
        try {
            const appointmentRef = ref(db, `appointments/${appointmentId}`);
            await update(appointmentRef, {
                appointment: "rejected",
                reason: rejectReason
            });
            notify("Appointment rejected successfully");
            setRejectId(null);
            setRejectReason("");
            getTeacherAppointments(currentUser.uid);
            getSuccessfulAppointments(currentUser.uid);
        } catch (error) {
            console.error("Error rejecting appointment:", error);
            notify("Error rejecting appointment", "error");
        }
    };

    const handleDeleteAppointment = async (appointmentId) => {
        try {
            const appointmentRef = ref(db, `appointments/${appointmentId}`);
            await remove(appointmentRef);
            notify("Appointment deleted successfully");
            getSuccessfulAppointments(currentUser.uid);
            getTeacherAppointments(currentUser.uid);
        } catch (error) {
            console.error("Error deleting appointment:", error);
            notify("Error deleting appointment", "error");
        }
    };

    if (loading) return <LoadingPage />;
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            {/* Status & Schedule */}
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-blue-700">Status</h2>
                    <button
                        onClick={() => setShowSchedule(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
                    >
                        <FaPlus /> Add Schedule
                    </button>
                </div>
                <div className="bg-blue-100 rounded-lg p-4 text-blue-800 font-medium">
                    Your current schedule is up to date. Add new slots as needed!
                </div>
                {/* Schedule Modal */}
                {showSchedule && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
                            <h3 className="text-lg font-semibold mb-4 text-blue-700">Add Schedule</h3>
                            <form onSubmit={e => handleAddSchedule(e, currentUser.uid)} className="flex flex-col gap-4">
                                {schedules.map((slot, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <input
                                            type="date"
                                            value={slot.date}
                                            onChange={e => {
                                                const newSchedules = [...schedules];
                                                newSchedules[idx].date = e.target.value;
                                                setSchedules(newSchedules);
                                            }}
                                            required
                                            className="border rounded-lg px-3 py-2 outline-blue-500 flex-1"
                                        />
                                        <input
                                            type="time"
                                            value={slot.time}
                                            onChange={e => {
                                                const newSchedules = [...schedules];
                                                newSchedules[idx].time = e.target.value;
                                                setSchedules(newSchedules);
                                            }}
                                            required
                                            className="border rounded-lg px-3 py-2 outline-blue-500 flex-1"
                                        />
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addScheduleSlot}
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                                >
                                    + Add More
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowSchedule(false)}
                                    className="text-blue-600 hover:underline mt-1"
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            {/* Upcoming Appointments */}
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-8">
                <h2 className="text-xl font-bold text-blue-700 mb-4">Your Upcoming Appointment Detail</h2>
                <table className="min-w-full bg-white rounded-lg">
                    <thead>
                        <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                            <th className="py-3 px-4 text-left">Sr. No</th>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Date</th>
                            <th className="py-3 px-4 text-left">Schedule Time</th>
                            <th className="py-3 px-4 text-center">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {successfulAppointments
                            ?.filter(req => req.appointment === "success")
                            .map((req, idx) => (
                                <tr key={req.id} className="hover:bg-blue-50 transition">
                                    <td className="py-3 px-4 border-b">{idx + 1}</td>
                                    <td className="py-3 px-4 border-b">{req.name}</td>
                                    <td className="py-3 px-4 border-b">{req.email}</td>
                                    <td className="py-3 px-4 border-b">{req.date}</td>
                                    <td className="py-3 px-4 border-b">{req.time}</td>
                                    <td className="py-3 px-4 border-b text-center">
                                        <button onClick={() => handleDeleteAppointment(req.id)} className="text-red-500 hover:text-red-700 transition">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* Approve / Rejection Appointments */}
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-blue-700 mb-6">Approve / Rejection Appointment</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teacherAppointments
                        ?.filter(req => req.appointment === "pending")
                        .map(req => (
                            <div key={req.id} className="bg-blue-50 rounded-lg shadow p-5 flex flex-col gap-3">
                                <div className="flex items-center gap-4">
                                    <img src="https://randomuser.me/api/portraits/men/32.jpg" className='w-12 h-12 rounded-full' alt="" />
                                    <div>
                                        <h3 className="font-semibold text-blue-800">{req.name}</h3>
                                        <p className="text-sm text-gray-600">{req.email}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 mt-2">
                                    <span className="text-gray-700"><b>Time:</b> {req.time}</span>
                                    <span className="text-gray-700"><b>date:</b> {req.date}</span>
                                    <span className="text-gray-700"><b>Subject:</b> {req.subject}</span>
                                    <span className="text-gray-700"><b>Message:</b> <span className="italic">{req.message}</span></span>
                                </div>
                                <div className="flex gap-3 mt-3">
                                    <button
                                        className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition"
                                        onClick={() => handleApprove(req.id)}
                                    >
                                        <FaCheck /> Approve
                                    </button>
                                    <button
                                        className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition"
                                        onClick={() => setRejectId(req.id)}
                                    >
                                        <FaTimes /> Reject
                                    </button>
                                </div>
                                {rejectId === req.id && (
                                    <div className="mt-3">
                                        <input
                                            type="text"
                                            placeholder="Reason for rejection"
                                            value={rejectReason}
                                            onChange={e => setRejectReason(e.target.value)}
                                            className="w-full border rounded-lg px-3 py-2 outline-blue-500"
                                            required
                                        />
                                        <button
                                            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition w-full"
                                            onClick={() => handleReject(req.id)}
                                        >
                                            Submit Reason
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default TeachersDashboard;