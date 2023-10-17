import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import baseURL from "./BaseURL";
const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({ children }) => {

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    let loginUser = async (e) => {
        setLoading(true)
        toast.loading('please wait...');
        e.preventDefault()
        let response = await fetch(`${baseURL}/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': e.target.username.value, 'password': e.target.password.value })
        })
        let data = await response.json()

        if (response?.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))

            localStorage.setItem('authTokens', JSON.stringify(data))
            toast.dismiss();
            toast.success('Successfully Logged in!')
            setIsLoggedIn(true)


        } else if(response?.status===401) {
            toast.dismiss();
            toast.error("Username or Password is incorrect!")
        }
        setLoading(false)
    }


    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        setIsLoggedIn(false)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }



    let contextData = {
        user: user,
        authTokens: authTokens,
        setAuthTokens: setAuthTokens,
        setUser: setUser,
        loginUser: loginUser,
        logoutUser: logoutUser,
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,



    }


    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens.access))

        }
        setLoading(false)

    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData} >
          {children}
        </AuthContext.Provider>
    )
}