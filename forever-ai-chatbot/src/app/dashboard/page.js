'use client';
import './page.css';
import Footer from '../components/footer';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Bold, Settings, Menu, Home, Share2, Trash } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {

    const [username, setUsername] = useState('');
    const [tier, setTier] = useState('');
    const [userid, setUserid] = useState('');
    const [conversations, setConversations] = useState([]);
    const [conversationLoading, setConversationLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [conversationToDelete, setConversationToDelete] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        const storedUserid = localStorage.getItem("userid");
        const storedUsername = localStorage.getItem("username");
        const storedTier = localStorage.getItem("tier");
        setUserid(storedUserid);
        setUsername(storedUsername);
        setTier(storedTier);
        const getUserData = async ()=>{
            const storedUserid = localStorage.getItem("userid");
            try{
                console.log(storedUserid);
                const res = await fetch(`https://forever-backend-production.up.railway.app/getuserdata`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userid: storedUserid })
                })
                const data = await res.json();
                if(data.message=="error")
                {
                    console.log("error");
                    alert("Server error");
                    return;
                }
                else
                {
                    
                    setUsername(data.data.username);
                    
                    setTier(data.data.tier);
                    
                }
            }catch(e){
                console.log(e);
                alert("An error has occured");
            }

        }
        const fetchConversations = async () => {
            const res = await fetch("https://forever-backend-production.up.railway.app/chat/usermode/getAllConversations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userid: storedUserid })
            });
            const data = await res.json();
            setConversations(data.conversations);
            setConversationLoading(false);
        }

        if (storedUserid)
            {
                getUserData();
                fetchConversations();
            } 
        else router.push('/signin');
    }, [router]);

    const startConvo = async () => {
        if(userid){
            const res = await fetch("https://forever-backend-production.up.railway.app/chat/usermode/startConvo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userid })
            });
            const data = await res.json();
            if(data.message === "success"){
                localStorage.setItem("conversationId", data.conversationid);
                router.push("/chat");
            } else alert("Failed to start conversation.");
        }
    }

    const handleConversationClick = (conversationId) => {
        localStorage.setItem("conversationId", conversationId);
        router.push("/chat");
    }

    const handleSettings = () => router.push("/settings");
    const generateLink = () => router.push("/generateLink");
    const handleHome = () => router.push("/dashboard");
    const handleGenerate = () => router.push("/generateLink");

    return (
        <div className='dashboard'>
           {/* Sidebar overlay for mobile */}
            {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    
                    <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>×</button>
                </div>
                
                <ul className="sidebar-menu">
                    <h2>User: {username || 'User'}</h2>
                    <li onClick={handleHome}><Home/>Home</li>
                    <li onClick={handleGenerate}><Share2/>Generate a link</li>
                    <li onClick={handleSettings}><Settings /> Settings</li>
                </ul>
                <ul className="sidebar-bottom-links">
                    <li><Link href="/termsAndConditions">Terms and Conditions</Link></li>
                    <li><Link href="/privacyPolicy">Privacy Policy</Link></li>
                </ul>
            </div>


            {/* Navbar */}
            <div id="navbar">
                <button className="menu-button" onClick={() => setSidebarOpen(true)}>
                    <Menu size={30} color="white"/>
                </button>
                <h1 id="h1">Forever Life</h1>
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

                {/* Conversation List */}
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
                                        <button className="conversation-button" onClick={() => handleConversationClick(conv.id)}>
                                            {conv.title}
                                        </button>
                                        <button className="delete-conversation" onClick={() => { setConversationToDelete(conv.id); setShowDeleteModal(true); }}>
                                            <Trash/>
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
                                <button className="cancel-btn" onClick={() => { setShowDeleteModal(false); setConversationToDelete(null); }}>Cancel</button>
                                <button className="confirm-btn" onClick={async () => {
                                    if (conversationToDelete) {
                                        const res = await fetch("https://forever-backend-production.up.railway.app/delete/conversation", {
                                            method: "DELETE",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ conversation_id: conversationToDelete })
                                        });
                                        const data = await res.json();
                                        if (data.message === "success") setConversations(conversations.filter(conv => conv.id !== conversationToDelete));
                                    }
                                    setShowDeleteModal(false);
                                    setConversationToDelete(null);
                                }}>Delete</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
