"use client"

import "./page.css"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Settings(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [tier,setTier] = useState("");
    const router = useRouter();
    const [showLogoutModal, setShowLogoutModal] = useState(false);


    const handleBack = () =>{
        router.back();
    }

    useEffect(()=>{
        const storedUsername = localStorage.getItem("username");
        const storedEmail = localStorage.getItem("email");
        const storedTier = localStorage.getItem("tier");
        setEmail(storedEmail);
        setUsername(storedUsername);
        setTier(storedTier);
    }, [])
    const changeUsername = () =>{
        alert("not working yet");
    }
    const deleteConversations = () =>{
        alert("not working yet");
    }
    const deleteAccount = () =>{
        alert("not working yet");
    }
    const LogOut = () =>{
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("tier");
        localStorage.removeItem("userid");
        router.push("/home");
    }
    return (
        <div className="settings">
            <div className="navbar">
                <button id="close-button" onClick={handleBack}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="close-icon" height="40px" viewBox="0 -960 960 960" width="40px" fill="#ffffffff"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                </button>
                <h1 className="h1">Forever AI Helper</h1>
                
            </div>
            <div className="container">
                <div id="welcome-container">
                    {!username && !email ? (
                    <>
                        <div className="loader"></div>
                        <p>Loading your dashboard...</p>
                    </>
                    ) : (
                        <h1>User: {username}</h1>
                    )}
                </div>
                <div id="options">
                    <h2>Personal details</h2>
                    <div id="line">.</div>
                    <hr></hr>
                    <p id="opttext">Username: {username}</p>
                    <p id="opttext">Email: {email}</p>
                    <p id="opttext">Tier: {tier}</p>
                </div>
                <div id="options">
                    <h2>Options</h2>
                    <div id="line">.</div>
                    <hr></hr>
                    <button id="optbut" onClick={changeUsername}>Change username</button>
                    <button id="optbut" onClick={deleteConversations}>Delete your conversations</button>
                    <button id="optbut" onClick={deleteAccount}>Delete your account</button>
                </div>
                <button id="logout-button" onClick={()=>{setShowLogoutModal(true)}}>
                    Log Out
                </button>
            </div>
            {showLogoutModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                    <h3>Are you sure?</h3>
                    <p>Do you really want to log out?</p>
                    <div className="modal-buttons">
                        <button
                        className="cancel-btn"
                        onClick={() => {
                            setShowLogoutModal(false);
                        }}
                        >
                        Cancel
                        </button>
                        <button
                        className="confirm-btn"
                        onClick={LogOut}
                        >
                        Log Out
                        </button>
                        
                    </div>
                
                </div>
                </div>
            )}
             <div className="footer-container">
            <p>© 2025 Forever AI Helper. All rights reserved.</p>
          </div>
        </div>
    )
}