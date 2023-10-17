
import React ,{useContext,useEffect,useState} from 'react'
import { useNavigate  } from 'react-router-dom'
import AuthContext from '../utils/AuthContext';
const NavBar = () => {
  const navigate=useNavigate ()
  let {  user, logoutUser } = useContext(AuthContext)
  return (
    <div className="bg-black flex justify-between items-center" >
       <img className='w-56' src='https://i.ibb.co/vZXCBxn/368558567-236796635999343-3212075310249196059-n.png'/>
       <div className='text-white text-5xl justify-self-center'>Packet Analyzer</div>
       {user && <a onClick={logoutUser} className='text-white text-4xl mr-20 cursor-pointer'>logout</a>}
       {!user && <a onClick={()=>navigate('/login')} className='text-white text-4xl mr-20 cursor-pointer'>Login</a>}
     </div>
  )
}

export default NavBar