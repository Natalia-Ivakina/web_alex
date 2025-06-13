import NavBar from "../components/NavBar";

const ContactPage = () => (
  <>
    <NavBar />
    <div className="wrapper">
      <div id="contact">
        <img id="findme" src="/findme.png" alt="Find me" />
        <a id="artstationlink" href="https://www.artstation.com/alexboy">
          ArtStation
        </a>
        <br />
        <a id="youtubelink" href="https://www.youtube.com/user/AlexboyAMV">
          Youtube
        </a>
        <br />
        <a id="linkeldnlink" href="https://www.linkedin.com/in/akialex/">
          LinkedIn
        </a>
      </div>
    </div>
  </>
);

export default ContactPage;
