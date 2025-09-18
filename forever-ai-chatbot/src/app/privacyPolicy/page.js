"use client"

import Navbar from  "../components/navbar";
import Footer from "../components/footer";  
import './page.css';
import { Bold, Settings, Menu, Home, Share2, Trash } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PrivacyPolicy(){
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [username, setUsername] = useState('');
    const router = useRouter();
    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if(storedUsername)
            setUsername(storedUsername);
        
    }, []);
    const handleSettings = () => router.push("/settings");
    const generateLink = () => router.push("/generateLink");
    const handleHome = () => router.push("/dashboard");
    const handleGenerate = () => router.push("/generateLink");
  return (
    <div className="privacypolicy">
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
        <div className="privacypolicy-container">
            <h1 className="h1">Privacy Policy</h1>
            <h2 className="h2_1">Effective Date: 17.09.2025</h2>
            <div className="txt">
                Forever Life values your privacy and is committed to protecting your personal information. 
This Privacy Policy (“Policy”) explains how we collect, use, store, and protect information obtained through 
our website. By accessing or using the App, you consent to the practices described herein.
            </div>
            <h2 className="h2">1. Information We Collect</h2>
            <h2 className="h2">1.1 Information Provided By You</h2>
            <div className="txt">
                Information you provide when interacting with the
                 App, including inputs to the AI (e.g., questions,
                  prompts, preferences).
                Account information when signing in via
                 Google Authentication (email address, 
                 name, and profile picture as provided by Google).
            </div>
            <h2 className="h2">1.2 Automatically Collected Information</h2>
            <div className="txt">
                Technical and usage information, such as IP 
                address, device type, operating system, browser, 
                app version, and activity logs.
                Analytics and performance data collected to 
                monitor and improve the App`s functionality.
            </div>
            <h2 className="h2">1.3 Database Storage</h2>
            <div className="txt">
                User-provided information is securely stored 
                in our Supabase database, including AI chat 
                inputs, selected preferences, and authentication 
                details.
            </div>
            <h2 className="h2">2. Use of Information</h2>
             <div className="txt">
                We use the information collected for purposes including:

                <ul className="ul">
                    <li>
                        Delivering and improving App functionality and AI-generated guidance.
                    </li>
                    <li>
                        Managing user accounts and providing authentication via Google OAuth.
                    </li>
                    <li>
                        Responding to inquiries and providing customer support.
                    </li>
                    <li>
                        Tracking and processing affiliate interactions and referrals.
                    </li>
                    Complying with legal obligations.
                </ul>
            </div>
            <h2 className="h2">3. AI and Chat Data</h2>
            <div className="txt">
                Input provided to the AI (OpenAI ChatGPT) is 
                processed to generate responses for your use only.
                We do not sell or share individual AI inputs for
                 marketing purposes.
            </div>
            <h2 className="h2">4. Affiliate Links</h2>
            <div className="txt">
                The App may include affiliate links to products 
                from Forever Living Products.
                If you purchase products via these links, we may 
                receive a commission at no additional cost to you.
                We do not guarantee the effectiveness, suitability,
                 or safety of any products.
            </div>
            <h2 className="h2">5. Sharing and Disclosure</h2>
            <div className="txt">
                We may disclose information only under the following limited circumstances:
                    <ul className="ul">
                    <li>
                        With service providers necessary to operate the App, including Supabase and OpenAI.
                    </li>
                    <li>
                        If required to comply with applicable law, regulation, or legal process.
                    </li>
                    <li>
                        In connection with a business transfer, merger, or acquisition.
                    </li>
                    
                </ul>
                We do not sell, trade, or rent your personal information to third parties.
            </div>
            <h2 className="h2">6. Data Security</h2>
            <div className="txt">
                We implement reasonable administrative, technical,
                 and physical safeguards to protect your data.
                No system is completely secure; while we strive 
                to protect your information, we cannot guarantee 
                absolute security.
            </div>
            <h2 className="h2">7. Data Retention</h2>
            <div className="txt">
                Data stored in Supabase is retained as long as 
                necessary to provide the App`s functionality or
                 comply with legal obligations.
                Users may request deletion of their personal 
                data by contacting us at support@forever-life.org.
            </div>
           <h2 className="h2">8. User Rights</h2>
           <div className="txt">
                Depending on your jurisdiction, you may have rights to:
                <ul className="ul">
                    <li>
                        Access, correct, or delete your personal data.
                    </li>
                    <li>
                        Opt-out of marketing communications (if applicable).
                    </li>
                    <li>
                        Withdraw consent where required by law.
                    </li> 
                    
                </ul>
                To exercise these rights, please contact us at support@forever-life.org.
            </div>
            <h2 className="h2">9. Third-Party Services</h2>
            <div className="txt">
                    The App utilizes the following third-party services:
                    <ul className="ul">
                    <li>
                        Supabase: database, authentication, and storage services.
                    </li>
                    <li>
                        OpenAI / ChatGPT : AI-generated content.

                    </li>
                    <li>
                        Google OAuth : for user authentication and account management.
                    </li> 
                    <li>
                        Analytics services (if integrated) for App performance monitoring.
                    </li>
                    
                </ul>
                We recommend reviewing the privacy policies of these providers.
            </div>
            <h2 className="h2">10. Children`s Privacy</h2>
            <div className="txt">
               The App is not intended for children, and we do 
               not knowingly collect information from children 
               under applicable legal ages.
            </div>
            <h2 className="h2">11. Changes to This Policy</h2>
             <div className="txt">
               We may update this Privacy Policy periodically.
            Changes will be posted in the App and will take 
            effect immediately.
            Continued use of the App constitutes acceptance 
            of the updated Policy.
            </div>
            <h2 className="h2">12. Contact Us</h2>
            <div className="txt">
              For questions or concerns regarding this Privacy 
              Policy, please contact us at:
                support@forever-life.org
            </div>
        </div>
        <Footer />
    </div>
  )
}