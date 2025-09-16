"use client"

import './page.css';
//import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";
import { Bold } from 'lucide-react';


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
            res = await fetch("https://forever-backend-production.up.railway.app/chat/usermode/getAllConversations", {
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
            const res = await fetch("https://forever-backend-production.up.railway.app/chat/usermode/startConvo", {
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
    
    const handleSettings = () =>{
        router.push("/settings");
    }
    const generateLink = () =>{
        router.push("/generateLink");
    }
    return (
        <div className='dashboard'>
            <div id = "navbar">
                <h1 id="h1">Forever AI Helper</h1>
                <button id="settings-button" onClick={handleSettings}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="settings-icon" height="40px" fontWeight={Bold} viewBox="0 -960 960 960" width="40px" fill="#ffffffff"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/></svg>
                </button>
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
                <div className="generateLink">
                    <h3>Want to increase your tier? Generate a link to share with friends here</h3>
                    <button onClick={generateLink} className="genLinkBut">Generate a Link</button>
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
                            const res = await fetch("https://forever-backend-production.up.railway.app/delete/conversation", {
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
