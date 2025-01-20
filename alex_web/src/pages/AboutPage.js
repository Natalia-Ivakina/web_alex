const AboutPage = () => {
    return (
        <>
            <p className='headertext'>About Me</p>
            <div id='aboutme'>
                <p className='abouttext'>
                    Hi everyone!
                </p>
                <p className='abouttext'>
                    I'm Alex, a passionate Cinematic Artist, Video Editor, Colorist, Unreal Engine Artist and Motion
                    Designer.
                </p>
                {/*для админа*/}
                <button>Edit text</button>
            </div>
            <div id='contact'>
                <img id= 'findme' src="/findme.png" alt="Find me"/>
                <br/>
                <a id='artstationlink' href='https://www.artstation.com/alexboy' >
                    ArtStation
                </a>
                <br/>
                <a id='youtubelink' href='https://www.youtube.com/user/AlexboyAMV' >
                    Youtube
                </a>
                <br/>
                <a id='linkeldnlink' href='https://www.linkedin.com/in/akialex/' >
                    LinkedIn
                </a>
            </div>
            {/*<div id='me'>*/}
            {/*    <img id='textme' src="/textme.png" alt="Text me"/>*/}
            {/*    <img id='arrow' src="/arrow.png" alt="Arrow"/>*/}
            {/*    <img id='logome' src="/logome.png" alt="Logo me"/>*/}
            {/*</div>*/}
        </>
    );
};

export default AboutPage;
