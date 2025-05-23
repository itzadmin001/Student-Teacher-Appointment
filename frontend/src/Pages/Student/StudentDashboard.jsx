import React, { useContext, useEffect, useState } from 'react'
import Teachers from "../../assets/Images/Teachers.jpg"
import Button from '../../Components/Student/Button';
import { MainContext } from '../../MainCon';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../../Components/Student/LoadingPage';
import { db } from "../../Firebase"
import { ref, set, update } from 'firebase/database';

function StudentDashboard() {
    const { Light, SetLight, currentUser, status, teachers, notify, teacherAppointments } = useContext(MainContext)
    const [showMessageInput, setShowMessageInput] = React.useState(false);
    const [messageText, setMessageText] = React.useState("");
    const [loading, SetLoading] = useState(true)
    const [appointmentBook, SetApoointmentBook] = useState(false)
    const [appointmentsData, setAppointmentsData] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        if (currentUser) {
            SetLoading(false)
        } else {
            navigate("/student/login")
        }
    }, [currentUser])

    useEffect(() => {
        if (status === "success") {
        } else {
            navigate("/status")
        }
    }, [])

    useEffect(() => {
        import('firebase/database').then(({ ref, onValue }) => {
            const appointmentsRef = ref(db, 'appointments');
            onValue(appointmentsRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const arr = Object.values(data);
                    setAppointmentsData(arr);
                } else {
                    setAppointmentsData([]);
                }
            });
        });
    }, [currentUser]);

    const bookApointmenthanlder = (currentUserId, time, date, teacherId, messageText) => {
        // Check if user already has a pending appointment with this teacher
        const existingPending = appointmentsData.some(
            (a) =>
                a.user === currentUserId &&
                a.teacherId === teacherId &&
                a.appointment === "pending"
        );
        if (existingPending) {
            notify("You already have a pending appointment with this teacher. Please wait for approval or rejection before booking another.", "error");
            return;
        }

        set(ref(db, 'appointments/' + Date.now()), {
            user: currentUserId,
            name: currentUser.name,
            email: currentUser.email,
            time: time,
            subject: currentUser.subject,
            date: date,
            teacherId: teacherId,
            appointment: "pending",
            message: messageText // <-- message भी save करें
        }).then((success) => {
            SetApoointmentBook(true)
            notify("Appointment created successfully", "success")
            setMessageText(""); // message clear करें
        }).catch((eror) => {
            notify(eror)
        })
    }

    if (loading) return <LoadingPage />

    return (
        <section>
            <UpComingAppointments
                appointmentsData={appointmentsData}
                Light={Light}
                appointmentBook={appointmentBook}
                teachers={teachers}
                bookApointmenthanlder={bookApointmenthanlder}
                currentUser={currentUser}
                setShowMessageInput={setShowMessageInput}
                showMessageInput={showMessageInput}
                messageText={messageText}
                setMessageText={setMessageText}
            />
        </section>
    )
}

const UpComingAppointments = ({
    appointmentsData,
    Light,
    appointmentBook,
    teachers,
    bookApointmenthanlder,
    currentUser,
    messageText,
    setMessageText
}) => {
    // User के appointments filter करें
    const userAppointments = appointmentsData.filter(
        a => a.user === currentUser?.uid && a.appointment === "success"
    );
    console.log(userAppointments)

    return (
        <div className={`py-10 px-2 ${Light ? "bg-gray-800 text-gray-200" : "bg-white"} select-none`}>
            <h1 className="text-2xl font-semibold text-center mb-8 text-blue-700">Your Upcoming Appointments 🎓</h1>
            <div className="overflow-x-auto">
                <table className={`min-w-full ${Light ? "bg-gray-800 text-gray-200" : "bg-white"}  rounded-xl shadow-lg overflow-hidden `}>
                    <thead>
                        <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                            <th className="py-3 px-4 text-left">Sr. No</th>
                            <th className="py-3 px-4 text-left">Your Name</th>
                            <th className="py-3 px-4 text-left">Date</th>
                            <th className="py-3 px-4 text-left">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userAppointments.map((a, idx) => (
                            <tr key={a.id || idx} className="hover:bg-blue-50 hover:text-gray-900 transition">
                                <td className="py-3 px-4 border-b">{idx + 1}</td>
                                <td className="py-3 px-4 border-b font-medium text-blue-700">{a.name || a.teacherId}</td>
                                <td className="py-3 px-4 border-b">{a.date}</td>
                                <td className="py-3 px-4 border-b">{a.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <h1 className='text-2xl font-semibold text-center mb-8 text-blue-700 mt-5 '>ALL Teachers</h1>
            <div className='grid md:grid-cols-5 sm:grid-cols-4 gap-6 mt-5'>
                {teachers?.map((item, i) => (
                    <div key={item.id} className='bg-white text-center rounded-lg shadow-xl p-4 flex flex-col items-center'>
                        <img src={Teachers} alt="" className='rounded-lg w-[18vw] mb-3' />
                        <div className='flex flex-col gap-2 mt-2'>
                            <h1>Name: <span>{item.name}</span></h1>
                            <h1>Department: <span>{item.department}</span></h1>
                            <h1>Email: <span>{item.email}</span></h1>
                            <h1>Subject: <span>{item.subject}</span></h1>
                            <div className='mt-5 flex flex-col gap-3 w-full'>
                                {item.schedules && item.schedules.length > 0 ? (
                                    item.schedules.map((s, idx) => {
                                        const [localMessage, setLocalMessage] = useState("");
                                        const latestApp = appointmentsData.find(
                                            a =>
                                                a.user === currentUser?.uid &&
                                                a.teacherId === item.id &&
                                                a.date === s.date &&
                                                a.time === s.time
                                        );
                                        const isRejected = latestApp && latestApp.appointment === "rejected";
                                        const isPending = latestApp && latestApp.appointment === "pending";
                                        const rejectReason = latestApp && latestApp.reason;

                                        return (
                                            <div key={idx} className="mb-4">
                                                <h1>Timing: <span>{s.time}</span></h1>
                                                <h1>Date: <span>{s.date}</span></h1>
                                                {isRejected && (
                                                    <div className="bg-red-100 text-red-700 rounded px-3 py-2 mb-2">
                                                        <div><b>Your request was rejected.</b></div>
                                                        {rejectReason && (
                                                            <div>Reason: <span className="italic">{rejectReason}</span></div>
                                                        )}
                                                    </div>
                                                )}
                                                {isPending && (
                                                    <div className="bg-yellow-100 text-yellow-700 rounded px-3 py-2 mb-2">
                                                        <b>Your request is pending approval.</b>
                                                    </div>
                                                )}
                                                {!isPending && (
                                                    <form
                                                        onSubmit={e => {
                                                            e.preventDefault();
                                                            bookApointmenthanlder(currentUser.uid, s.time, s.date, item.id, localMessage);
                                                            setLocalMessage(""); // clear input after submit
                                                        }}
                                                        className="flex flex-col gap-2"
                                                    >
                                                        <input
                                                            type="text"
                                                            value={localMessage}
                                                            onChange={e => setLocalMessage(e.target.value)}
                                                            placeholder="Type your message..."
                                                            className="border rounded-lg px-3 py-2 text-black"
                                                            required
                                                        />
                                                        <button
                                                            type="submit"
                                                            className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition`}
                                                        >
                                                            {appointmentBook ? "Booked✅" : "Book Appointment"}
                                                        </button>
                                                    </form>
                                                )}
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className="text-gray-500 italic text-center py-4">
                                        No schedule decided
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StudentDashboard