import React ,{useContext,useEffect,useState} from 'react'
import { useNavigate  } from 'react-router-dom'
import AuthContext from '../utils/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import baseURL from '../utils/BaseURL';
const Register = () => {
    let {  user, isLoggedIn } = useContext(AuthContext)
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [password2,setPassword2]=useState('')


    const navigate=useNavigate ()
    const register=async(e)=>{
        toast.loading('please wait...');
        e.preventDefault()
        const res= axios.post(`${baseURL}/register/`,{
            'username':username,
            'email':email,
            'password':password,
            'password2':password2
        }).then(response=>{
            if(response.status===200){
                toast.success('Registration successful');
                navigate(`/register`)
            }else{
                toast.error(response.data.message) 
            }
        }).catch(error=>toast.error(error?.response?.data?.message))
        toast.dismiss();
    }
    useEffect(() => {
        if (user) { return navigate(`/`) }
      }, [isLoggedIn])
  return (
    <div className="flex justify-center items-center mt-28">
          <div className="bg-[white] rounded shadow w-1/4">
                <div className="border-b py-8 font-bold text-black text-center text-xl tracking-widest uppercase">
                    Welcome back!
                </div>

                <form onSubmit={e => register(e)} className="bg-grey-lightest px-10 py-10">
           
                    <div className="mb-3">
                        <input onChange={e=>setUsername(e.target.value)} value={username} className={`border w-full p-3  `} name="username" type="text" placeholder="Username"/>
                        <input onChange={e=>setEmail(e.target.value)} value={email} className={`border w-full mt-6 p-3  `} name="email" type="text" placeholder="Email"/>
                    </div>
                    <div className="mb-6">
                        <input onChange={e=>setPassword(e.target.value)} value={password} className={`border w-full p-3   `} name="password" type="password" placeholder="**************"/>
                        <input onChange={e=>setPassword2(e.target.value)} value={password2} className={`border w-full mt-6 p-3  `} name="password2" type="password" placeholder="**************"/>
                    </div>
                    <div className="flex">
                        <button className="bg-[#ea2127] hover:bg-primary-dark w-full p-4 text-sm text-white uppercase font-bold tracking-wider">
                            Register
                        </button>
                    </div>
                </form>

                <div className="border-t px-10 py-6">
                    <div className="flex justify-between">
                        <a onClick={()=>navigate('/login')} className="cursor-pointer font-bold text-primary hover:text-primary-dark no-underline">Already have an account?</a>
                        <a  className="text-grey-darkest hover:text-black no-underline">Forgot Password?</a>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Register