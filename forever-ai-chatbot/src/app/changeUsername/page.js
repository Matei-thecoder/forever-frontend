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
    const [username,setUsername] = useState('');
    const [userid, setUserid] = useState('');
    const [error, setError] = useState('');
    
    const router = useRouter();
    useEffect(()=>{
        const storedUserid = localStorage.getItem("userid");
        setUserid(storedUserid);
        if(!storedUserid){
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
        // Handle form submission logic here
        const storedUserid = localStorage.getItem("userid");
        try{
            await fetch('forever-backend-production.up.railway.app/changeusername', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userid: storedUserid, username }),
            }).then(res=>res.json())
            .then(data=>{
                if(data.message === "success"){
                    setError('');
                    console.log("Login successful");
                    localStorage.setItem('username', username);
                    

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
                    <h2 className="login-title">Change your username</h2>
                     {error && (
                                <div className="alert-danger">
                                {error}
                                </div>
                            )}
                    <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label>New username</label>
                        <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="New username"
                        required
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
        
     