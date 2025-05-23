import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import StudentMain from './Pages/Student/StudentMain'
import Home from './Pages/Student/Home'
import StudentLogin from "./Pages/Student/StudentLogin"
import StudentSignUp from "./Pages/Student/StudentSignup"
import TeacherLogin from './Pages/Teachers/TeacherLogin'
import AdminLogin from './Pages/Admin/AdminLogin'
import StudentDashboard from './Pages/Student/StudentDashboard'
import TeachersDashboard from './Pages/Teachers/TeachersDashboard'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import StatusPage from './Components/Student/StatusPage'

function App() {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <StudentMain />,
        children: [
          {
            path: "",
            element: <Home />
          }, {
            path: "/student/login",
            element: <StudentLogin />
          },
          {
            path: "/student/sign-up",
            element: <StudentSignUp />
          },
          {
            path: "student/dashboard",
            element: <StudentDashboard />
          },
          {
            path: "teacher/dashboard",
            element: <TeachersDashboard />
          },
          {
            path: "admin",
            element: <AdminDashboard />
          },
          {
            path: "status",
            element: <StatusPage />
          },
          {
            path: "/teacher/login",
            element: <TeacherLogin />
          },
          {
            path: "/admin/login",
            element: <AdminLogin />
          }
        ]
      }

    ]
  )
  return (
    <RouterProvider router={router} />
  )
}

export default App
