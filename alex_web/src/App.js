import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProjectListPage from "./pages/ProjectListPage";
import NavBar from "./NavBar";
import NotFoundPage from "./pages/NotFoundPage";
import Footer from "./Footer";
import MoodsPage from "./pages/MoodsPage";
import AmvPage from "./pages/AmvPage";
import ShowreelsPage from "./pages/ShowreelsPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
      <BrowserRouter>
        <div>
          <NavBar />
          <div id="wrapper">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/showreels" element={<ShowreelsPage />} />
              <Route path="/projects" element={<ProjectListPage />} />
              <Route path="/moods" element={<MoodsPage />} />
              <Route path="/amv" element={<AmvPage />} />
              <Route path="/admin" element={<LoginPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
            <Footer />
        </div>
      </BrowserRouter>
  );
}

export default App;
