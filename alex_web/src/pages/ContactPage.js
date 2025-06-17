import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/ContactForm.css";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [showPhoto, setShowPhoto] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setShowPhoto(true);
    setSent(true);
  };

  useEffect(() => {
    if (showPhoto) {
      const timer = setTimeout(() => {
        setShowPhoto(false);
      }, 100000);
      return () => clearTimeout(timer);
    }
  }, [showPhoto]);

  return (
    <>
      <NavBar />
      <div className="wrapper">
        <main>
          <div className="headertext">WANNA WORK TOGETHER?</div>
          <div className="wrapper-contact">
            <div className="contact-form">
              <div id="contact">
                <div className="contact-text">Find me here:</div>
                <div id="links">
                  <div className="link-icon">
                    <a
                      id="artstationlink"
                      href="https://www.artstation.com/alexboy"
                    >
                      <img src="artstation-brands.svg" alt="artstation" />
                      ArtStation
                    </a>
                  </div>
                  <div className="link-icon">
                    <a
                      id="youtubelink"
                      href="https://www.youtube.com/user/AlexboyAMV"
                    >
                      <img src="youtube-brands.svg" alt="youtube"></img>
                      Youtube
                    </a>
                  </div>
                  <div className="link-icon">
                    <a
                      id="linkeldnlink"
                      href="https://www.linkedin.com/in/akialex/"
                    >
                      <img src="linkedin-brands.svg" alt="linkedin"></img>
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
              <div id="form">
                <div className="contact-text">Or use the form:</div>
                <form id="input" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Name*"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Email*"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                  <textarea
                    placeholder="Message*"
                    rows={10}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button type="submit" id="sendBtn">
                    Send
                  </button>
                </form>
                {showPhoto && (
                  <div
                    className="confirmation-overlay"
                    onClick={() => setShowPhoto(false)}
                  >
                    <div
                      className="confirmation-photo"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img src="/IwF.jpg" alt="sent" />
                    </div>
                  </div>
                )}
                {sent && (
                  <div className="confirmation-text">
                    <p>Your message was sent ...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        <div className="row developer">
          <p>Design and Development by Natalia Ivakina ~ 2025</p>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
