"use client";

import './page.css';
import Footer from '../components/footer';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bold, Settings, Menu, Home, Share2, Trash } from 'lucide-react';
import Link from 'next/link';


export default function GenerateLink() {
    const [generatedLink, setGeneratedLink] = useState("");
    const [copied, setCopied] = useState(false);
    const [userid, setUserid] = useState("");
    const [username, setUsername] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const storedUserid = localStorage.getItem("userid");
        const storedUsername = localStorage.getItem("username");
        setUsername(storedUsername);
        if (!storedUserid) {
            router.push("/signin");
        } else {
            setUserid(storedUserid);
        }
    }, [router]);

    const handleGenerate = async () => {
        const randomId = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
        const link = `https://forever-chatbot.vercel.app/signup/${randomId}`;
        setGeneratedLink(link);

        try {
            const res = await fetch("https://forever-backend-production.up.railway.app/createlink", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userid, link: randomId }),
            });
            const data = await res.json();
            console.log(data);
        } catch (e) {
            console.error(e);
            alert("An error occurred while generating the link.");
        }
    };

    const copyToClipboard = () => {
        if (generatedLink) {
            navigator.clipboard.writeText(generatedLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };
     const handleSettings = () => router.push("/settings");
    const generateLink = () => router.push("/generateLink");
    const handleHome = () => router.push("/dashboard");
    const handleGenerate1 = () => router.push("/generateLink");
    return (
        <div className="dashboard">
            {/* Sidebar overlay for mobile */}
            {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    
                    <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>×</button>
                </div>
                
                <ul className="sidebar-menu">
                    <h2>User: {username || 'User'}</h2>
                    <li onClick={handleHome}><Home/>Home</li>
                    <li onClick={handleGenerate1}><Share2/>Generate a link</li>
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
                <div className="login-card">
                    <h2 className="login-title">Generate your unique invite link</h2>

                    <div className="generated-link-container">
                        <input
                            type="text"
                            value={generatedLink}
                            placeholder="Your link will appear here"
                            readOnly
                            className="generated-link-input"
                        />
                        {generatedLink && (
                            <button onClick={copyToClipboard} className="copy-button">
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        )}
                    </div>

                    <button onClick={handleGenerate} className="genLinkBut">
                        Generate Link
                    </button>
                </div>

                <div className="referral-section">
                    <h2>Unlock Exclusive Rewards!</h2>
                    <p>
                        Share your unique link with your friends and climb up the tiers to earn amazing benefits! The more friends you invite, the bigger your rewards. Don’t miss out on discounts, exclusive premium videos, and special perks designed just for you.
                    </p>
                    <ul>
                        <li><strong>Tier 1:</strong> Invite 5 friends → 5% discount + access to exclusive premium videos</li>
                        <li><strong>Tier 2:</strong> Invite 10 friends → 10% discount + unlock more premium content</li>
                        <li><strong>Tier 3:</strong> Invite 15 friends → 15% discount + unlock all premium videos</li>
                    </ul>
                    <p>Start sharing now and level up your rewards!</p>
                </div>
            </div>

            <Footer />
        </div>
    );
}
