import Navbar from  "../components/navbar";
import './page.css';

export default function Home(){
  return (
    <>
      <Navbar />
      <div class="main-container">
          <div id="chat-section">
              <h2>Start chatting now with our specialized Chatbot!</h2>
              <button id="startbutton">Sign In</button>
              <button id="startbutton">Enter Guestmode</button>
          </div>
          <div id="video-section">
              <h2>See our educational videos selection!</h2>
              <div id="line"></div>
              <div className="video-list">
                <iframe width="300" height="170" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video 1" frameBorder="0" allowFullScreen></iframe>
                <iframe width="300" height="170" src="https://www.youtube.com/embed/3JZ_D3ELwOQ" title="YouTube video 2" frameBorder="0" allowFullScreen></iframe>
                <iframe width="300" height="170" src="https://www.youtube.com/embed/L_jWHffIx5E" title="YouTube video 3" frameBorder="0" allowFullScreen></iframe>
                <iframe width="300" height="170" src="https://www.youtube.com/embed/tVj0ZTS4WF4" title="YouTube video 4" frameBorder="0" allowFullScreen></iframe>
                
              </div>
          </div>
      </div>
    </>
  );
}