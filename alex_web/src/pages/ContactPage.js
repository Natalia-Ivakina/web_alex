import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/ContactForm.css";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setName("");
    setEmail("");
    setSubject("");
    setMessage("");

    setSent(true);
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

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
                  <a
                    id="artstationlink"
                    href="https://www.artstation.com/alexboy"
                  >
                    ArtStation
                  </a>
                  <br />
                  <a
                    id="youtubelink"
                    href="https://www.youtube.com/user/AlexboyAMV"
                  >
                    Youtube
                  </a>
                  <br />
                  <a
                    id="linkeldnlink"
                    href="https://www.linkedin.com/in/akialex/"
                  >
                    LinkedIn
                  </a>
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
                {sent && (
                  <div className="confirmation-text">
                    <p>Your message was sent ...</p>
                    <p>I will find you and I will contact you</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        <div className="row developer">
          <p>Design and Development by Natalia Ivakina © ~ 2025</p>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
