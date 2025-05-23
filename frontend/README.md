# Student-Teacher Appointment System

This project is a *Student-Teacher Appointment System* built using *React* and *Vite*. It allows students to book appointments with teachers, teachers to manage their schedules and appointments, and admins to manage users and teachers. Below is a detailed explanation of how the system works and the functionality of each component.

---

## How to Use the System

### 1. *Student Login*
   - The first step is for the *student* to log in or sign up.
   - Students can log in using their credentials on the *Student Login Page*.
   - If a student is new, they can register using the *Student Sign-Up Page. After registration, their account will be in a **pending* state until approved by the admin.

### 2. *Admin Login*
   - After the student has signed up, the *admin* must log in to approve or reject the student's registration request.
   - Admins can log in using the *Admin Login Page*.
   - Once logged in, the admin can:
     - Approve or reject student registration requests.
     - Create teacher accounts.
     - View and manage all teachers and students.

### 3. *Teacher Login*
   - After the admin has created teacher accounts, teachers can log in using the *Teacher Login Page*.
   - Teachers can:
     - Add their schedules (date and time slots).
     - Approve or reject appointment requests from students.
     - Provide reasons for rejecting appointments.

---

## Features and Workflow

### *Student Workflow*
1. *Sign-Up/Login*:
   - Students can sign up or log in to the system.
   - After signing up, their account status will be *pending* until approved by the admin.

2. *Dashboard*:
   - Once approved, students can log in and access their dashboard.
   - Students can view all teachers and their available schedules.
   - Students can book appointments with teachers by selecting a date, time, and providing a message.

3. *Appointment Status*:
   - Students can view the status of their appointments:
     - *Pending*: Waiting for teacher approval.
     - *Approved*: Appointment confirmed.
     - *Rejected*: Appointment declined with a reason.

---

### *Admin Workflow*
1. *Login*:
   - Admins can log in using their credentials.

2. *Manage Students*:
   - Admins can view all student registration requests.
   - Admins can approve or reject student accounts.

3. *Manage Teachers*:
   - Admins can create teacher accounts by providing details like name, email, department, and subject.
   - Admins can view all teachers and their details.

---

### *Teacher Workflow*
1. *Login*:
   - Teachers can log in using their credentials.

2. *Add Schedules*:
   - Teachers can add their available schedules (date and time slots) for appointments.

3. *Manage Appointments*:
   - Teachers can view appointment requests from students.
   - Teachers can approve or reject appointments.
   - Teachers can provide reasons for rejecting appointments.

4. *View Upcoming Appointments*:
   - Teachers can view all approved appointments.

---

## File and Component Details

### *Frontend Structure*
The project is structured as follows:

#### *Main Files*
- **src/App.jsx**: The main entry point for routing. It defines routes for students, teachers, and admins.
- **src/main.jsx**: The root file that renders the app and wraps it with the context provider.

#### *Components*
- **src/Components/Student/Button.jsx**: A reusable button component.
- **src/Components/Student/Footer.jsx**: The footer displayed on all pages.
- **src/Components/Student/Header.jsx**: The header displayed on all pages.
- **src/Components/Student/LoadingPage.jsx**: A loading spinner displayed during data fetching.
- **src/Components/Student/StatusPage.jsx**: Displays the status of a student's registration or appointment.

#### *Pages*
- *Student Pages*:
  - **src/Pages/Student/Home.jsx**: The homepage for students with options to log in or sign up.
  - **src/Pages/Student/StudentLogin.jsx**: The login page for students.
  - **src/Pages/Student/StudentSignup.jsx**: The sign-up page for students.
  - **src/Pages/Student/StudentDashboard.jsx**: The dashboard where students can view teachers and book appointments.
  - **src/Pages/Student/StudentMain.jsx**: The layout for student pages, including the header, footer, and content.

- *Admin Pages*:
  - **src/Pages/Admin/AdminLogin.jsx**: The login page for admins.
  - **src/Pages/Admin/AdminDashboard.jsx**: The dashboard where admins can manage students and teachers.

- *Teacher Pages*:
  - **src/Pages/Teachers/TeacherLogin.jsx**: The login page for teachers.
  - **src/Pages/Teachers/TeachersDashboard.jsx**: The dashboard where teachers can manage schedules and appointments.

#### *Context*
- **src/MainCon.jsx**: Provides global state management using React Context. It handles:
  - User authentication.
  - Fetching and managing students, teachers, and appointments.
  - Notifications using react-toastify.

#### *Firebase Integration*
- **src/Firebase.js**: Configures Firebase for authentication, database, and storage.

---

## Technologies Used
- *React*: Frontend framework.
- *Vite*: Build tool for fast development.
- *Firebase*: Backend for authentication and real-time database.
- *Tailwind CSS*: Utility-first CSS framework.
- *React Router*: For routing.
- *React Toastify*: For notifications.

---

## How It Works
1. *Student Registration*:
   - Students sign up and wait for admin approval.
   - Admin approves or rejects the registration.

2. *Appointment Booking*:
   - Students book appointments with teachers.
   - Teachers approve or reject the appointments.

3. *Admin Management*:
   - Admins manage students and teachers.

4. *Teacher Management*:
   - Teachers manage their schedules and appointments.

---

## Getting Started
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install