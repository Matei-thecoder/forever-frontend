"use client"

import "./page.css"

import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function Settings(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [userid,setUserid] = useState("");
    const [tier,setTier] = useState("");
    const [invited_friends, setInvited_friends] = useState("");
    const [deletetext, setDeleteText] = useState("");
    const router = useRouter();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showDelConvModal, setShowDelConvModal] = useState(false);
    const [showDelAccModal, setShowDelAccModal] = useState(false);
    const [deleteAccErr, setDeleteAccErr] = useState("");


    const handleBack = () =>{
        router.back();
    }

    useEffect(()=>{
        const storedUsername = localStorage.getItem("username");
        const storedEmail = localStorage.getItem("email");
        const storedTier = localStorage.getItem("tier");
        const storedUserid = localStorage.getItem("userid");
        const storedInvited_friends = localStorage.getItem("invited_friends");
        setEmail(storedEmail);
        setUsername(storedUsername);
        setTier(storedTier);
        setUserid(storedUserid);
        setInvited_friends(storedInvited_friends);
    }, [])
    const changeUsername = () =>{
        router.push('/changeUsername');
    }
    const deleteConversations = () =>{
        const storedUserid = localStorage.getItem("userid");
        try{
            fetch(`https://forever-backend-m87a.onrender.com/delete/all/conversations`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userid: storedUserid }),
            }).then(res=>res.json())
            .then(data=>{
                if(data.message === "success"){
                    console.log("delete conversations successful");
                    router.push('/dashboard');
                }else{
                    console.log(data.message);
                    alert("Error deleting conversations");
                }
            })
        }
        catch(e)
        {
            console.log(e);
            alert("Error deleting conversations");
        }
           
    }
    const deleteAccount = () =>{
        const storedUserid = localStorage.getItem("userid");
        if(deletetext !== "DELETE ACCOUNT")
        {
            setDeleteAccErr("Please type 'DELETE ACCOUNT' to confirm.");
            return;
        }
        try{
            fetch(`https://forever-backend-m87a.onrender.com/delete-account`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: storedUserid }),
            }).then(res=>res.json())
            .then(data=>{
                if(data.message === "success"){
                    console.log("delete account successful");
                    localStorage.removeItem('userid');
                    localStorage.removeItem('email');
                    localStorage.removeItem('username');
                    localStorage.removeItem('tier');
                    router.push('/home');
                }else{
                    console.log(data.message);
                    setDeleteAccErr("Error deleting account");
                }
            })
        }
        catch(e)
        {
            console.log(e);
            setDeleteAccErr("Error deleting conversations");
        }
    }
    const changePassword = () =>{
        router.push('/changePassword');
    }
    const LogOut = () =>{
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("tier");
        localStorage.removeItem("userid");
        localStorage.removeItem("invited_friends");
        router.push("/home");
    }
    return (
        <div className="settings">
            <div className="navbar-1">
                <button id="close-button" onClick={handleBack}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="close-icon" height="40px" viewBox="0 -960 960 960" width="40px" fill="#ffffffff"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                </button>
                <h1 className="h1-1">Forever AI Helper</h1>
                
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
                    <p id="opttext">Friends Invited: {invited_friends}</p>
                </div>
                <div id="options">
                    <h2>Options</h2>
                    <div id="line">.</div>
                    <hr></hr>
                    <button id="optbut" onClick={changeUsername}>Change username</button>
                    <button id="optbut" onClick={changePassword}>Change password</button>
                    <button id="optbut" onClick={()=>setShowDelConvModal(true)}>Delete your conversations</button>
                    <button id="optbut" className="red" onClick={()=> setShowDelAccModal(true)}>Delete your account</button>
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
            {showDelConvModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                    <h3>Are you sure?</h3>
                    <p>Do you really want to delete your conversations?</p>
                    <div className="modal-buttons">
                        <button
                        className="cancel-btn"
                        onClick={() => {
                            setShowDelConvModal(false);
                        }}
                        >
                        Cancel
                        </button>
                        <button
                        className="confirm-btn"
                        onClick={deleteConversations}
                        >
                        Delete
                        </button>
                        
                    </div>
                
                </div>
                </div>
            )}
            {showDelAccModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                    <h3>Are you sure?</h3>
                    <p>Do you really want to delete your account?</p>
                    {deleteAccErr && (
                                <div className="alert-danger">
                                {deleteAccErr}
                                </div>
                            )}
                    <div className="modal-buttons">
                        <div className="form-group">
                            <label>Type in DELETE ACCOUNT to delete your account.</label>
                            <input
                            className="input"
                            type="text"
                            value={deletetext}
                            onChange={(e) => setDeleteText(e.target.value)}
                            placeholder=""
                            required
                            />
                        </div>
                        <button
                        className="cancel-btn"
                        onClick={() => {
                            setShowDelAccModal(false);
                        }}
                        >
                        Cancel
                        </button>
                        <button
                        className="confirm-btn"
                        onClick={deleteAccount}
                        >
                        Delete
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