import React from 'react'

function LoadingPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500 mb-6"></div>
                <h2 className="text-2xl font-bold text-blue-700 mb-2">Loading...</h2>
                <p className="text-gray-600 text-center">
                    Please wait while we prepare your experience.
                </p>
            </div>
        </div>
    )
}

export default LoadingPage