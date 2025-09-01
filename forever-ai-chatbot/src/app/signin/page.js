"use client"

import './page.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { redirect} from "next/navigation";
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { Eye, EyeOff } from "lucide-react"; // eye icons


export default function Signin(){
//https://forever-backend-m87a.onrender.com/login
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        try{
            await fetch('https://forever-backend-m87a.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            }).then(res=>res.json())
            .then(data=>{
                if(data.message === "success"){
                    setError('');
                    console.log("Login successful");
                    localStorage.setItem('username', data.user.username);
                    localStorage.setItem('tier', data.user.tier);
                    localStorage.setItem('userid',data.user.userid);
                    
                    router.push('/dashboard');
                }else{
                    setError(data.message);
                }
            })
            
            
        }catch(error){
            console.log(error);
            setError(error.message);
        }

    };
    return(
        <div className='signin'>
        <Navbar />
        <div className="signin-page">
            <div className="login-container">
                <div className="login-card">
                    <h2 className="login-title">Login</h2>
                     {error && (
                                <div className="alert-danger">
                                {error}
                                </div>
                            )}
                    <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        />
                    </div>

                     <div className="form-group">
                            <label>Password</label>
                            <div className="relative w-full">
                                <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                className="border p-2 pr-10 rounded w-full"
                                />
                                <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                                >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                    </div>

                    <button type="submit" className="login-button">
                        Login
                    </button>
                    <p>Do you not have an account? Create one <a href="/signup" id="link">here</a>.</p>
                    </form>
                </div>
            </div>
        </div>
        
        <Footer />
        </div>
    );
}
        
     