"use client"

import '../page.css';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

import { useState } from 'react';
import { Eye, EyeOff } from "lucide-react"; // eye icons


export default function Signup(){

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [username,setUsername] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error,setError] = useState('');
    const router = useRouter();
    const params = useParams();
    const inviteCode = params.link;

    const getStrength = (pwd) => {
        let score = 0;

        if (pwd.length >= 6) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;
        

        return score;
    };

    const strength = getStrength(password);

    const strengthLabel = ["Too short", "Weak", "Medium", "Strong", "Very strong"];
    const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-emerald-600"];

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        if(password !== confirmPassword)
        {
            setError("Passwords do not match.");
            return;
        }
        try{
            await fetch('https://forever-backend-m87a.onrender.com/signup/link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password,link }),
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.message == "success")
                {
                    setError('');
                    console.log("succes");
                    router.push('/signin');
                }
                else if(data.message.code == "weak_password")
                {
                    setError("Your password is too weak.");
                }
                else if(data.message.code == "user_already_exists")
                {
                    setError("User already exists.");
                }
                else
                {
                    setError(data.message);
                }
            })
        }
        catch(e){
            console.error('Error:', e);
            alert('Signup failed. Please try again.');
        }
        
    };
    return(
        <div className='signup'>
        <Navbar />
                <div className="signin-page">
                    <div className="login-container">
                        <div className="login-card">
                            <h2 className="login-title">Signup</h2>
                            {/* Error Alert */}
                            {error && (
                                <div className="alert-danger">
                                {error}
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="login-form">
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                required
                                />
                            </div>
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

                            {/* strength bar */}
                            {password.length > 0 && (
                                <div className="mt-2">
                                <div className="w-full h-2 bg-gray-200 rounded">
                                    <div
                                    className={`h-2 rounded ${strengthColors[strength]} transition-all`}
                                    style={{ width: `${(strength / 4) * 100}%` }}
                                    />
                                </div>
                                <p className="text-sm mt-1">
                                    {password.length < 6 ? "Too short (min 6 chars)" : strengthLabel[strength]}
                                </p>
                                </div>
                            )}
                            </div>
                            

                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                                required
                                />
                            </div>
        
                            <button type="submit" className="login-button">
                                Sign Up
                            </button>
                            <p>Do you already have an account? Login <a href="/signin" id="link">here</a>.</p>
                            </form>
                        </div>
                    </div>
                </div>
                
                <Footer />
        </div>
    );
}