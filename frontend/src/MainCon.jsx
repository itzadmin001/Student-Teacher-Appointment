
import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { auth } from "./Firebase"
import { get, ref, onValue } from 'firebase/database';
import { db } from "./Firebase"

const MainContext = createContext()

function MainCon(props) {
    const [currentUser, setCurrentUser] = useState(null)
    const [teachers, setTeachers] = useState([]);
    const [Light, SetLight] = useState(false)
    const [status, Setstatus] = useState("pending")
    const [role, Setrole] = useState(undefined)
    const [Allstudents, SetAllstudent] = useState([])
    const [successfulAppointments, setSuccessfulAppointments] = useState([]); // <-- new state
    const [teacherAppointments, setTeacherAppointments] = useState([]);

    const getAllStudent = async () => {
        const usersRef = ref(db, "users");
        try {
            const snapshot = await get(usersRef);
            const data = snapshot.val();

            if (data) {
                const filteredUsers = Object.entries(data)
                    .filter(([id, user]) => user.role === "user")
                    .map(([id, user]) => ({ id, ...user }));

                SetAllstudent(filteredUsers);
            } else {
                SetAllstudent([]);
            }
        } catch (error) {
            console.error("Error fetching users with role 'user':", error);
            SetAllstudent([])
        }
    }

    const getTeachers = async () => {
        const usersRef = ref(db, "users");

        try {
            const snapshot = await get(usersRef);
            const data = snapshot.val();

            if (data) {
                const teachers = Object.entries(data)
                    .filter(([id, user]) => user.role === "teacher")
                    .map(([id, user]) => ({ id, ...user }));
                setTeachers(teachers);
            } else {
                setTeachers([]);
            }
        } catch (error) {
            console.error("Error fetching teachers:", error);
            setTeachers([]);
        }
    }

    const getTeacherAppointments = async (teacherId) => {
        console.log(teacherId)
        const appointmentsRef = ref(db, "appointments");
        try {
            const snapshot = await get(appointmentsRef);
            const data = snapshot.val();
            if (data) {
                // Filter: teacherId match & appointment status "pending"
                const filtered = Object.entries(data)
                    .map(([id, app]) => ({ id, ...app }))
                    .filter(app => app.teacherId === teacherId && app.appointment === "pending");
                setTeacherAppointments(filtered);
            } else {
                setTeacherAppointments([]);
            }
        } catch (error) {
            console.error("Error fetching teacher appointments:", error);
            setTeacherAppointments([]);
        }
    };

    const getSuccessfulAppointments = async (teacherId) => {
        console.log(teacherId)
        const appointmentsRef = ref(db, "appointments");
        try {
            const snapshot = await get(appointmentsRef);
            const data = snapshot.val();
            if (data) {
                // Filter: teacherId match & appointment status "success"
                const filtered = Object.entries(data)
                    .map(([id, app]) => ({ id, ...app }))
                    .filter(app => app.teacherId === teacherId && app.appointment === "success");
                setSuccessfulAppointments(filtered); // <-- save in state
            } else {
                setSuccessfulAppointments([]);
            }
        } catch (error) {
            console.error("Error fetching successful appointments:", error);
            setSuccessfulAppointments([]);
        }
    };




    useEffect(() => {
        getTeachers()
        getAllStudent()
    }, [])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const dbRef = ref(db, 'users/' + user.uid);
                const snapshot = await get(dbRef);
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    setCurrentUser({
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        ...userData
                    });
                    Setstatus(userData.status)
                    Setrole(userData.role)
                } else {
                    setCurrentUser(user);
                }
            } else {
                setCurrentUser(null);
                Setrole(undefined)
            }
        });

        return () => unsubscribe();
    }, []);

    const logout = () => {
        signOut(auth)
            .then(() => {
                Setrole(null)
                setCurrentUser(null);
            })
            .catch((error) => {
                console.error("Logout Error:", error);
            });
    };
    const notify = (msg, flag) => toast(msg, { type: flag });

    return (
        <MainContext.Provider value={{ successfulAppointments, getSuccessfulAppointments, setTeacherAppointments, teacherAppointments, getTeacherAppointments, Light, SetLight, Allstudents, getAllStudent, getTeachers, notify, teachers, setTeachers, role, status, currentUser, setCurrentUser, logout }}>
            <ToastContainer />
            {props.children}
        </MainContext.Provider>
    )
}

export default MainCon
export { MainContext }