import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { loadPageText } from "../services/pageTextService";
import { EditPageTextComponent } from "../components/EditPageTextForm";
import { checkAuth } from "../services/loginService";
import NavBar from "../components/NavBar";

const AboutPage = () => {
  const queryClient = useQueryClient();

  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated
  useEffect(() => {
    checkAuth()
      .then(setIsAuthenticated)
      .catch((error) => console.error(error));
  }, []);

  //pause for text_________________________
  const {
    data: pageText = { title: "", text: "" },
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pageText", "about"],
    queryFn: () => loadPageText("about"),
    staleTime: 1000 * 60 * 5,
  });

  const updatePageText = (updatedText) => {
    queryClient.setQueryData(["pageText", "about"], updatedText);
  };

  //pause for img_________________________
  useEffect(() => {
    const images = ["/findme.png", "/textme.png", "/arrow.png", "/logome.png"];

    let loadedImages = 0;

    const preloadImages = () => {
      images.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedImages += 1;
          if (loadedImages === images.length) {
            setIsImagesLoaded(true);
          }
        };
        img.onerror = () => {
          console.error(`Error loading image: ${src}`);
        };
      });
    };

    preloadImages();
  }, []);

  //size of screen_______________________
  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //adjustable content
  // const contactBlock = (
  //   <div id="contact">
  //     <img id="findme" src="/findme.png" alt="Find me" />
  //     <a id="artstationlink" href="https://www.artstation.com/alexboy">
  //       ArtStation
  //     </a>
  //     <br />
  //     <a id="youtubelink" href="https://www.youtube.com/user/AlexboyAMV">
  //       Youtube
  //     </a>
  //     <br />
  //     <a id="linkeldnlink" href="https://www.linkedin.com/in/akialex/">
  //       LinkedIn
  //     </a>
  //   </div>
  // );

  if (isLoading || !isImagesLoaded) return <div>Loading...</div>;
  if (error) return <div>Error loading page text</div>;

  return (
    <>
      <NavBar />
      <div className="wrapper">
        <div className="page-container">
          <main>
            {isAuthenticated && (
              <div className="adminlayout">
                <EditPageTextComponent
                  apiType="about"
                  onTextUpdate={updatePageText}
                  textData={pageText}
                />
              </div>
            )}
            <div>
              <p className="headertext">{pageText.title}</p>
              <div className="edit-form">
                <div className="row">
                  <div className="aboutme">
                    {pageText.text.split("\n").map((line, index) => (
                      <p className="abouttext" key={index}>
                        {line}
                      </p>
                    ))}
                  </div>
                  {/* {!isMediumScreen && contactBlock} */}
                </div>
                <div className="row">
                  {/* {isMediumScreen && contactBlock} */}
                  <div className="container2 right-align">
                    <div id="me">
                      <p>
                        <img src="/textme.png" alt="logo" />
                      </p>
                    </div>
                    <div id="arrow">
                      <img src="/arrow.png" alt="logo" />
                    </div>
                    <div id="logo">
                      <img src="/logome.png" alt="logo" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        <div className="row developer">
          <p>Design and Development by Natalia Ivakina © ~ 2025</p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
