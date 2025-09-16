"use client";

import './page.css';
import Footer from '../components/footer';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GenerateLink() {
    const [generatedLink, setGeneratedLink] = useState("");
    const [copied, setCopied] = useState(false);
    const [userid, setUserid] = useState("");

    const router = useRouter();

    useEffect(() => {
        const storedUserid = localStorage.getItem("userid");
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
            const res = await fetch("forever-backend-production.up.railway.app/createlink", {
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

    return (
        <div className="dashboard">
            <div id="navbar">
                <h1 id="h1">Forever AI Helper</h1>
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
