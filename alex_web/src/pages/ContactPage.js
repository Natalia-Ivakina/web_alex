import NavBar from "../components/NavBar";
import "../styles/ContactForm.css";

const ContactPage = () => (
  <>
    <NavBar />
    <div className="wrapper">
      <main>
        <div className="headertext">WANNA WORK TOGETHER?</div>
        <div className="wrapper-contact">
          <div className="contact-form">
            <div id="contact">
              {/* <img id="findme" src="/findme.png" alt="Find me" /> */}
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
              <div id="input">
                <input type="text" placeholder="Name*" required></input>
                <input type="text" placeholder="Email*" required></input>
                <input type="text" placeholder="Subject"></input>
                <textarea
                  type="text"
                  placeholder="Message*"
                  rows={10}
                  required
                ></textarea>
                <button type="submit" id="sendBtn">
                  Send
                </button>
              </div>
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

export default ContactPage;
