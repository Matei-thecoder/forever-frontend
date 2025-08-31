"use client"

import './page.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";


export default function Dashboard() {

    const [username, setUsername] = useState('');
    const [tier, setTier] = useState('');
    const [userid, setUserid] = useState('');
    const [conversations, setConversations] = useState([]);
    const [conversationLoading, setConversationLoading] = useState(true);

    const router = useRouter();
    const pathname = usePathname();
    
    useEffect(() => {
        // Runs on every route change (including back/forward)
        console.log("Route changed:", pathname);
         window.scrollTo(0, 0);
         
        // reset state, re-run UI logic, etc.
    }, [pathname]);
    let storedUserid;
    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        const storedTier = localStorage.getItem("tier");
        storedUserid = localStorage.getItem("userid");
        setUserid(storedUserid);
        setUsername(storedUsername);
        setTier(storedTier);
        
        
        let res;
        let data;
        const fetchConversations = async () => {
            res = await fetch("http://localhost:5000/chat/usermode/getAllConversations", {
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
        
        
        
    }, []);

    const startConvo = async() =>{
        console.log(userid);
        if(userid)
        {
            const res = await fetch("http://localhost:5000/chat/usermode/startConvo", {
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
            <Navbar />
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
                                    <button key={index} id="conversation" onClick={() => handleConversationClick(conv.id)}>
                                        {conv.title}
                                    </button>
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
            </div>
            <Footer />
        </div>
    );
}
