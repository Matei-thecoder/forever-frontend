"use client"

import './page.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { redirect} from "next/navigation";
import { useRouter } from 'next/navigation';

import { useState, useEffect } from 'react';
import { Eye, EyeOff } from "lucide-react"; // eye icons


export default function GenerateLink() {
    const [generatedLink, setGeneratedLink] = useState("");
    const [copied, setCopied] = useState(false);
    const [userid,setUserid] = useState("");


    useEffect(() => {
        const storedUserid = localStorage.getItem("userid");
        
        setUserid(storedUserid);
        
        
        
    }, []);

    const handleGenerate =async () => {
        // Example link generation logic
        const randomId = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
        const link = `https://example.com/user/${randomId}`;
        const storedUserid = localStorage.getItem("userid");
        setGeneratedLink(link);

        try{
            const res = await fetch("https://forever-backend-m87a.onrender.com/createlink",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify( {
                    userid: storedUserid,
                    link:randomId
                })
            })
            const data = await res.json();
            console.log(data);
        }catch(e){
            console.log(e);
            alert("An error has occured")
        }


    };

    const copyToClipboard = () => {
        if (generatedLink) {
            navigator.clipboard.writeText(generatedLink);
            setCopied(true);
        }
    };

     return (
        <div className='signin'>
            <Navbar />
            <div className="signin-page">
                <div className="login-container">
                    <div className="login-card">
                        <h2 className="login-title">Generate your own link here</h2>

                        {/* Link Generator */}
                        <div className="generated-link-container">
                            <input
                                type="text"
                                value={generatedLink}
                                placeholder="Your link will appear here"
                                readOnly
                                className="generated-link-input"
                            />
                            {generatedLink && (
                                <button
                                    onClick={copyToClipboard}
                                    className="copy-button"
                                >
                                    {copied ? (
                                        <p>Copied</p>
                                    ):(
                                        <p>Copy</p>
                                    )}
                                </button>
                            )}
                        </div>

                        <button onClick={handleGenerate} className="login-button" style={{ marginTop: "10px" }}>
                            Generate Link
                        </button>
                    </div>
                </div>

                {/* Referral Benefits Section (Outside the Card) */}
                <div className="referral-section">
                    <h2>Unlock Exclusive Rewards!</h2>
                    <p>
                        Share your unique link with your friends and climb up the tiers to earn amazing benefits! The more friends you invite, the bigger your rewards. Don’t miss out on discounts, exclusive premium videos, and special perks designed just for you.
                    </p>
                    <ul>
                        <li>
                            <strong>Tier 1:</strong> Invite 5 friends → 5% discount + access to exclusive premium videos
                        </li>
                        <li>
                            <strong>Tier 2:</strong> Invite 10 friends → 10% discount + unlock more premium content
                        </li>
                        <li>
                            <strong>Tier 3:</strong> Invite 15 friends → 15% discount + unlock all premium videos
                        </li>
                    </ul>
                    <p>Start sharing now and level up your rewards!</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

