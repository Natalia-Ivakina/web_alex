import React, { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import NavBar from "../components/NavBar";
import ContactIconsComponent from "../components/ContactIcons";
import "../styles/ContactForm.css";
import LogoutButtonComponent from "../components/LogoutButton";

const ContactPage = () => {
  const [state, handleSubmit] = useForm("xovlalwr");
  const [showPhoto, setShowPhoto] = useState(false);

  useEffect(() => {
    if (state.succeeded) {
      setShowPhoto(true);
      const timer = setTimeout(() => {
        setShowPhoto(false);
      }, 100000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);

  return (
    <>
      <NavBar />
      <div className="wrapper">
        <main>
          <LogoutButtonComponent></LogoutButtonComponent>
          <div className="headertext">WANNA WORK TOGETHER?</div>
          <div className="wrapper-contact">
            <div className="contact-form">
              <div id="form">
                <div className="contact-text">Send me a message:</div>
                {state.succeeded ? (
                  <div className="confirmation-text">
                    <p>Your message was sent!</p>
                  </div>
                ) : (
                  <form id="input" onSubmit={handleSubmit}>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Name*"
                      required
                    />
                    <ValidationError
                      prefix="Name"
                      field="name"
                      errors={state.errors}
                    />

                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Email*"
                      required
                    />
                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                    />

                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      placeholder="Subject"
                    />
                    <ValidationError
                      prefix="Subject"
                      field="subject"
                      errors={state.errors}
                    />

                    <textarea
                      id="message"
                      name="message"
                      rows={10}
                      placeholder="Message*"
                      required
                    />
                    <ValidationError
                      prefix="Message"
                      field="message"
                      errors={state.errors}
                    />

                    <button
                      type="submit"
                      id="sendBtn"
                      disabled={state.submitting}
                    >
                      {state.submitting ? "Sending..." : "Send"}
                    </button>
                  </form>
                )}
                <ContactIconsComponent />
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
              </div>
            </div>
          </div>
        </main>
        {/* <div className="row developer">
          <p>Design and Development by Natalia Ivakina ~ 2025</p>
        </div> */}
      </div>
    </>
  );
};

export default ContactPage;
