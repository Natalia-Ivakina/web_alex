import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
//import NavBar from "./components/NavBar";
import NotFoundPage from "./pages/NotFoundPage";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactPage";
import AmvPage from "./pages/AmvPage";
import ShowreelsPage from "./pages/ShowreelsPage";
import LoginPage from "./pages/LoginPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div>
          {/* <NavBar /> */}
          <div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/showreels" element={<ShowreelsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/amv" element={<AmvPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/kosh" element={<LoginPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
