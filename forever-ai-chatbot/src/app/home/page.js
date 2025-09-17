"use client";

import Navbar from  "../components/navbar";
import Footer from "../components/footer";  
import './page.css';
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
                <iframe width="300" height="170" src="https://www.youtube.com/embed/KzTM6Q7cpQQ?si=CKdkKrMIDsVhbVGY" title="YouTube video 1" frameBorder="0" allowFullScreen></iframe>
                <iframe width="300" height="170" src="https://www.youtube.com/embed/oHmaga0sF-o?si=yOvnrlnIqiKkpH2p" title="YouTube video 2" frameBorder="0" allowFullScreen></iframe>
                <iframe width="300" height="170" src="https://www.youtube.com/embed/bCoVUu8boaw?si=lJCrkIvsrh-8Esle" title="YouTube video 3" frameBorder="0" allowFullScreen></iframe>
                <iframe width="300" height="170" src="https://www.youtube.com/embed/UrjnNGN0_GM?si=WEHZN9qXnpecyhCI" title="YouTube video 4" frameBorder="0" allowFullScreen></iframe>
                
              </div>
          </div>
          <div id="aboutme-section">
              <h2 id="aboutme-title">About me</h2>
              <div id="line">.</div>
              <div id="aboutme-container">
                <Image src="/aboutmepic.png" width={200}
                height={500}
                alt="About me" id="aboutmepic"/>
                <p id="aboutmetext">
                  💫 Sunt mamă și antreprenoare, cu o misiune clară: să construiesc un stil de viață sănătos și echilibrat pentru mine, familia mea și comunitatea din care fac parte. Ca FBO Forever, promovez produse și principii care sprijină sănătatea, frumusețea și vitalitatea pe termen lung.
                  <br></br>
                  📚 Cred cu tărie în puterea educației – atât în creșterea și formarea copiilor mei, cât și în dezvoltarea personală și financiară a celor din jur. Îmi place să inspir oamenii să facă alegeri conștiente, să învețe cum să își gestioneze mai bine resursele și să își construiască un viitor stabil.
                  <br></br>
                  🌱 Pentru mine, antreprenoriatul nu este doar un business, ci o cale de a lăsa în urmă valoare, echilibru și inspirație.
                </p>
              </div>

          </div>
          <div id="contactme-section">
              <h2 id="contactme-title">Contact me</h2>
              <div id="line">.</div>
              <p>Contact support at support@forever-life.org</p>
              <Link href="https://www.facebook.com/simona.puscasu.90/"><Image src="/facebook.png" width={50} height={50} alt="facebook" ></Image></Link>
          </div>
      </div>

      <Footer />
    </div>
  );
}