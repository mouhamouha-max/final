import React ,{useContext,useEffect} from 'react'
import { useNavigate  } from 'react-router-dom'
import AuthContext from '../utils/AuthContext';
const Login = () => {
    let { loginUser, user, isLoggedIn } = useContext(AuthContext)
    const navigate=useNavigate ()
    useEffect(() => {
        if (user) { return navigate(`/`) }
      }, [isLoggedIn])
  return (
    <div class="flex justify-center items-center mt-28">
          <div className="bg-[white] rounded shadow w-1/4">
                <div className="border-b py-8 font-bold text-black text-center text-xl tracking-widest uppercase">
                    Welcome back!
                </div>

                <form onSubmit={e => loginUser(e)} className="bg-grey-lightest px-10 py-10">
           
                    <div className="mb-3">
                        <input className="border w-full p-3" name="username" type="text" placeholder="Username"/>
                    </div>
                    <div className="mb-6">
                        <input className="border w-full p-3" name="password" type="password" placeholder="**************"/>
                    </div>
                    <div className="flex">
                        <button className="bg-[#ea2127] hover:bg-primary-dark w-full p-4 text-sm text-white uppercase font-bold tracking-wider">
                            Login
                        </button>
                    </div>
                </form>

                <div className="border-t px-10 py-6">
                    <div className="flex justify-between">
                        <a onClick={()=>navigate('/register')} className="cursor-pointer font-bold text-primary hover:text-primary-dark no-underline">Don't have an account?</a>
                        <a  className="text-grey-darkest hover:text-black no-underline">Forgot Password?</a>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Login