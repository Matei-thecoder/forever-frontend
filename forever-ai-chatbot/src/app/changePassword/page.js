"use client"

import './page.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { redirect} from "next/navigation";
import { useRouter } from 'next/navigation';

import { useState, useEffect } from 'react';
import { Eye, EyeOff } from "lucide-react"; // eye icons


export default function Signin(){
//https://forever-backend-m87a.onrender.com/login
    const [oldpassword,setOldPassword] = useState('');
    const [newpassword,setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    
    const router = useRouter();
    useEffect(()=>{
        const storedEmail = localStorage.getItem("email");
        setEmail(storedEmail);
        if(!storedEmail){
            return (
                <div id="loader-container">
                                 <p>Loading conversations...</p>
                                <div className="loader"></div>
                               
                                    
                        </div>
            )
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(confirmNewPassword !== newpassword)
        {
            setError("New password and confirm password do not match");
            return;
        }
        // Handle form submission logic here
        const storedEmail = localStorage.getItem("email");
        try{
            await fetch('forever-backend-production.up.railway.app/changepassword', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: storedEmail, oldpassword, newpassword }),
            }).then(res=>res.json())
            .then(data=>{
                if(data.message === "success"){
                    setError('');
                    console.log("change password successful");
                    
                    

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
                    <h2 className="login-title">Change your password</h2>
                     {error && (
                                <div className="alert-danger">
                                {error}
                                </div>
                            )}
                    <form onSubmit={handleSubmit} className="login-form">
                        <label>Old Password</label>
                            <div className="relative w-full">
                                <input
                                type={showOldPassword ? "text" : "password"}
                                value={oldpassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                placeholder="Password"
                                required
                                className="border p-2 pr-10 rounded w-full"
                                />
                                <button
                                type="button"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                                className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                                >
                                {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        <label>New Password</label>
                            <div className="relative w-full">
                                <input
                                type={showNewPassword ? "text" : "password"}
                                value={newpassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Password"
                                required
                                className="border p-2 pr-10 rounded w-full"
                                />
                                <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                                >
                                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        <div className="form-group">
                            <label>Confirm New Password</label>
                            <input
                                type="password"
                                value={confirmNewPassword}
                                placeholder='Comfirm password'
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                            />
                        </div>

                     

                    <button type="submit" className="login-button">
                        Change
                    </button>
                    
                    </form>
                </div>
            </div>
        </div>
        
        <Footer />
        </div>
    );
}
        
     