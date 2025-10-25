import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { loadPageText } from "../services/pageTextService";
import { EditPageTextComponent } from "../components/EditPageTextForm";
import { checkAuth } from "../services/loginService";
import NavBar from "../components/NavBar";
import "../styles/About.css";
import ContactIconsComponent from "../components/ContactIcons";
import LogoutButtonComponent from "../components/LogoutButton";

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

  if (isLoading || !isImagesLoaded) return <div>Loading...</div>;
  if (error) return <div>Error loading page text</div>;

  return (
    <>
      <NavBar />

      <div className="wrapper">
        <LogoutButtonComponent></LogoutButtonComponent>
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
            <div className="row">
              <div className="aboutme">
                {pageText.text.split("\n").map((line, index) => (
                  <p className="abouttext" key={index}>
                    {line}
                  </p>
                ))}
                <div style={{ marginTop: "3rem" }}>
                  <ContactIconsComponent />
                </div>
              </div>
            </div>
          </div>
        </main>
        <div className="container">
          <div className="logo-container">
            <div id="me">
              <p>
                <img src="/textme.png" alt="logo" />
              </p>
            </div>

            <div id="arrow">
              <Link to="/kosh">
                <img src="/arrow.png" alt="logo" />
              </Link>
            </div>
            <div id="logo">
              <img src="/logome.png" alt="logo" />
            </div>
          </div>
        </div>
        {/* <div className="row developer">
          <p>Design and Development by Natalia Ivakina ~ 2025</p>
        </div> */}
      </div>
    </>
  );
};

export default AboutPage;
