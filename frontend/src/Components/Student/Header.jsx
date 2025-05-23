import React, { useContext } from 'react'
import { MdNightlight } from "react-icons/md";
import { MdSunny } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { MainContext } from '../../MainCon';

import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';



function Header() {
    const navigate = useNavigate()
    const { Light, SetLight, currentUser, logout } = useContext(MainContext)
    return (
        <div className={`w-full p-4 ${Light ? "bg-gray-900" : "bg-gray-600"}   text-gray-200 flex justify-between items-center `}>
            <div className=' flex items-center md:gap-4 gap-2'>
                <FaArrowAltCircleLeft onClick={() => navigate("/")} className=' text-2xl cursor-pointer hover:text-blue-200' />
                <h1 className='font-bold md:text-xl'>Time4Class</h1>
            </div>

            <div className='flex  items-center gap-3'>
                <h1>hey'👋 <span className=' uppercase tracking-tighter md:text-xl text-sm'>{currentUser?.name}</span></h1>
                {
                    Light === true ? <MdSunny className=' cursor-pointer text-xl' onClick={() => SetLight(false)} /> : <MdNightlight className=' cursor-pointer text-xl ' onClick={() => SetLight(true)} />

                }
                <AiOutlineLogout className=' cursor-pointer text-xl' onClick={logout} />
            </div>
        </div>
    )
}

export default Header
