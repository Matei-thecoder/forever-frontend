"use client";

import Navbar from  "../components/navbar";
import Footer from "../components/footer";  
import './page.css';
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import Image from "next/image";

export default function Home(){

  const router = useRouter();
  const pathname = usePathname();
      
  const guestomode = () =>{
    router.push('/guestmode');
  }
  const signin = () =>{
    const userid = localStorage.getItem("userid");
    if(userid)
    {
      router.push('/dashboard');
    }
    else
    {
      router.push('/signin');
    }
    
  }

  return (
    <div className="home">
    
      <Navbar />
      <div className="main-container">
          <div id="chat-section">
              <h2>Start chatting now with our specialized Chatbot!</h2>
              <button id="startbutton" onClick={signin}>Login</button>
              <button id="startbutton" onClick={guestomode}>Enter Guestmode</button>
          </div>
          <div id="video-section">
              <h2 id="video-title">See our educational videos selection here. <a href='/videos' id="video-link">See more...</a></h2>

              <div id="line">.</div>
              <div className="video-list">
                <iframe width="300" height="170" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video 1" frameBorder="0" allowFullScreen></iframe>
                <iframe width="300" height="170" src="https://www.youtube.com/embed/3JZ_D3ELwOQ" title="YouTube video 2" frameBorder="0" allowFullScreen></iframe>
                <iframe width="300" height="170" src="https://www.youtube.com/embed/L_jWHffIx5E" title="YouTube video 3" frameBorder="0" allowFullScreen></iframe>
                <iframe width="300" height="170" src="https://www.youtube.com/embed/tVj0ZTS4WF4" title="YouTube video 4" frameBorder="0" allowFullScreen></iframe>
                
              </div>
          </div>
          <div id="aboutme-section">
              <h2 id="aboutme-title">About me</h2>
              <div id="line">.</div>
              <div id="aboutme-container">
                <Image src="/aboutmepic.png" width={200}
                height={200}
                alt="About me" id="aboutmepic"/>
                <p id="aboutmetext">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed quam ac lacus tempus 
                  lobortis ac sed felis. Aliquam et ultricies nisl. Vestibulum ante ipsum primis in faucibus 
                  orci luctus et ultrices posuere cubilia curae; Nunc vel dui et dolor lacinia placerat sed ut 
                  leo. Nunc neque urna, vehicula non nibh rutrum, gravida interdum nunc. Quisque suscipit at nisl 
                  non blandit. Aliquam dictum dignissim arcu, eu mollis nunc vestibulum nec. In et dui facilisis 
                  sem posuere ultricies et et ligula.</p>
              </div>

          </div>
          <div id="contactme-section">
              <h2 id="contactme-title">Contact me</h2>
              <div id="line">.</div>
              <p>Feel free to contact me at bla@email.com</p>
          </div>
      </div>

      <Footer />
    </div>
  );
}