import "../styles/ContactForm.css";

const ContactIconsComponent = () => {
  return (
    <div id="contact">
      <div id="links">
        <div className="link-icon">
          <span className="tooltip-art">Art station</span>
          <a id="artstationlink" href="https://www.artstation.com/alexboy">
            <img src="artstation-brands.svg" alt="artstation" />
          </a>
        </div>
        <div className="link-icon">
          <span className="tooltip-art">Youtube</span>
          <a id="youtubelink" href="https://www.youtube.com/user/AlexboyAMV">
            <img src="youtube-brands.svg" alt="youtube"></img>
          </a>
        </div>
        <div className="link-icon">
          <span className="tooltip-art">Linkedin</span>
          <a id="linkeldnlink" href="https://www.linkedin.com/in/akialex/">
            <img src="linkedin-brands.svg" alt="linkedin"></img>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactIconsComponent;
