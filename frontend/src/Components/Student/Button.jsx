import React from 'react'

function Button(props) {
    return (
        <div className={` px-4 py-2 rounded-lg bg-blue-500 cursor-pointer ${props.classes} duration-300`}>
            {props.text}
        </div>
    )
}

export default Button
