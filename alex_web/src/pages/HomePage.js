import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { EditPageTextComponent } from "../components/EditPageText";
import PageTextComponent from "../components/PageText";
import { loadPageText } from "../services/pageTextService";
import { checkAuth } from "../services/loginService";
import Card3 from "../components/AnimatedCard3";

const HomePage = () => {
  const queryClient = useQueryClient();

  // Check if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth()
      .then(setIsAuthenticated)
      .catch((error) => console.error("Auth check failed:", error));
  }, []);

  //pause for text_________________________
  const {
    data: pageText = { title: "", text: "" },
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["pageText", "home"],
    queryFn: () => loadPageText("home"),
    staleTime: 1000 * 60 * 5, //5 min
  });

  const updatePageText = (updatedText) => {
    queryClient.setQueryData(["pageText", "home"], updatedText);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading page text</div>;

  return (
    <>
      {isAuthenticated && (
        <div className="adminlayout">
          <EditPageTextComponent
            apiType="home"
            onTextUpdate={updatePageText}
            textData={pageText}
          />
        </div>
      )}
      <div>
        <PageTextComponent pageText={pageText} />
        <Card3 />
      </div>
    </>
  );
};

export default HomePage;
