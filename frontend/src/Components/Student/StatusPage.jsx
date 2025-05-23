import React, { useContext, useEffect } from 'react'
import { MainContext } from '../../MainCon'
import { useNavigate } from 'react-router-dom'

function StatusPage({ reason = "" }) {
    const { currentUser, status } = useContext(MainContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (status === "success") {
            navigate("/student/dashboard")
        }
    }, [])

    useEffect(() => {
        if (currentUser) {
        } else {
            navigate("/student/login")
        }
    }, [currentUser])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full flex flex-col items-center">
                {status === "pending" && (
                    <>
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-6"></div>
                        <h2 className="text-2xl font-bold text-blue-700 mb-2">Request Pending</h2>
                        <p className="text-gray-700 text-center mb-2">
                            Your registration request is <span className="font-semibold text-blue-600">pending</span>.
                        </p>
                        <p className="text-gray-500 text-center">
                            Please wait while we review your information.<br />
                            You will be notified once your account is approved.
                        </p>
                    </>
                )}
                {status === "rejected" && (
                    <>
                        <div className="animate-bounce text-red-500 mb-6 text-6xl">✖</div>
                        <h2 className="text-2xl font-bold text-red-600 mb-2">Request Rejected</h2>
                        <p className="text-gray-700 text-center mb-2">
                            Sorry, your registration request has been <span className="font-semibold text-red-600">declined</span>.
                        </p>
                        {reason && (
                            <div className="bg-red-50 border border-red-200 text-red-500 rounded-lg px-4 py-2 mb-2 text-center">
                                Reason: {reason}
                            </div>
                        )}
                        <p className="text-gray-500 text-center">
                            You may try registering again after some time.
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}

export default StatusPage