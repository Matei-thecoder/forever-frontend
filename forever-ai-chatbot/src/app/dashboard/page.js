"use client"

import './page.css';
//import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";


export default function Dashboard() {

    const [username, setUsername] = useState('');
    const [tier, setTier] = useState('');
    const [userid, setUserid] = useState('');
    const [conversations, setConversations] = useState([]);
    const [conversationLoading, setConversationLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [conversationToDelete, setConversationToDelete] = useState(null);


    const router = useRouter();
    const pathname = usePathname();
    
    useEffect(() => {
        // Runs on every route change (including back/forward)
        console.log("Route changed:", pathname);
         window.scrollTo(0, 0);
         
        // reset state, re-run UI logic, etc.
    }, [pathname]);
    
    useEffect(() => {
        const storedUserid = localStorage.getItem("userid");
        const storedUsername = localStorage.getItem("username");
        const storedTier = localStorage.getItem("tier");
        setUserid(storedUserid);
        setUsername(storedUsername);
        setTier(storedTier);
        
        
        let res;
        let data;
        const fetchConversations = async () => {
            res = await fetch("https://forever-backend-m87a.onrender.com/chat/usermode/getAllConversations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify( {
                    userid: storedUserid
                })
            });
            console.log(res);
            data = await res.json();
            console.log(data);
            setConversations(data.conversations);
            setConversationLoading(false);
        }
        if (storedUserid) fetchConversations();
        else{
            router.push('/signin');
        }
        
        
        
    }, [router]);

    const startConvo = async() =>{
        console.log(userid);
        if(userid)
        {
            const res = await fetch("https://forever-backend-m87a.onrender.com/chat/usermode/startConvo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userid: userid
                })
            });
            const data = await res.json();
            console.log(data);
            if(data.message =="success")
            {
                localStorage.setItem("conversationId", data.conversationid);
                router.push("/chat");
            }
            else
            {
                alert("Failed to start conversation.");
            }
        }
        else{
            console.log("error");
        }
    }
    const handleConversationClick = (conversationId) => {
        localStorage.setItem("conversationId", conversationId);
        router.push("/chat");
    }
    

    return (
        <div className='dashboard'>
            <div id = "navbar">
                <h1 id="h1">Forever AI Helper</h1>
            </div>
            <div className="dashboard-container">
                {!username || !tier ? (
                    <>
                        <div className="loader"></div>
                        <p>Loading your dashboard...</p>
                    </>
                ) : (
                    <>
                        <div>
                            <h1>Welcome to your Dashboard, {username}!</h1>
                            <h2>Your tier: {tier}.</h2>
                        </div>
                        
                    </>
                )}
                <div className="startConvo">
                    <h3>Start a new conversation with our assistant here.</h3>
                    <button onClick={startConvo}>+</button>
                </div>
                <div className='conversation-list'>
                    <h3 id="special-h3">Your conversations</h3>
                     <div id="line">.</div>
                     {!conversationLoading ? (
                        !conversations[0] ? (
                            <div id="no-conversations-container">
                                <p id="no-conversations">
                                    You have no conversations yet. Start one above!
                                </p>
                            </div>
                        ) : (
                            <div id="conversations-container">
                                {[...conversations].reverse().map((conv, index) => (
                                    <div key={index} className="conversation">
                                    <button
                                        className="conversation-button"
                                        onClick={() => handleConversationClick(conv.id)}
                                    >
                                        {conv.title}
                                    </button>
                                    <button
                                    className="delete-conversation"
                                    onClick={() => {
                                        setConversationToDelete(conv.id);
                                        setShowDeleteModal(true);
                                    }}
                                    >
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#a9a9a9ff"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                                    </button>

                                    </div>
                                ))}
                                </div>

                        )
                    ) : (
                        <div id="loader-container">
                                 <p>Loading conversations...</p>
                                <div className="loader"></div>
                               
                                    
                        </div>
                    )}
                    
                </div>
                {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                    <h3>Are you sure?</h3>
                    <p>Do you really want to delete this conversation?</p>
                    <div className="modal-buttons">
                        <button
                        className="cancel-btn"
                        onClick={() => {
                            setShowDeleteModal(false);
                            setConversationToDelete(null);
                        }}
                        >
                        Cancel
                        </button>
                        <button
                        className="confirm-btn"
                        onClick={async () => {
                            if (conversationToDelete) {
                            const res = await fetch("https://forever-backend-m87a.onrender.com/delete/conversation", {
                                method: "DELETE",
                                headers: {
                                "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                conversation_id: conversationToDelete,
                                }),
                            });
                            const data = await res.json();
                            if (data.message === "success") {
                                setConversations(conversations.filter(conv => conv.id !== conversationToDelete));
                            } else {
                                alert("Failed to delete conversation.");
                            }
                            }
                            setShowDeleteModal(false);
                            setConversationToDelete(null);
                        }}
                        >
                        Delete
                        </button>
                        
                    </div>
                    </div>
                </div>
                )}

            </div>
            <Footer />
        </div>
    );
}
