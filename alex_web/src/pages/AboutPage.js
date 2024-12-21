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
                    <br/>
                    My journey in video editing began in 2005, when I got my first PC and was absolutely fascinated by
                    the idea of creating something out of a simple idea. This idea ignited a passion for crafting
                    immersive
                    worlds, giving them life, mood, and a unique narrative.
                    <br/>
                    A gamer since the Atari 2600 and a movie fan from the days of our first black-and-white TV, I've got
                    plenty of experience and a genuine love for creativity.
                    <br/>
                    The world of creativity is vast and ever-evolving, and while I know a lot, I'm always learning to
                    bring my best ideas, my most emotional moods, and captivating stories to life.
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
