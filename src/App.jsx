import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import CookieBanner from "./components/CookieBanner/CookieBanner";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Projects from "./pages/Projects/Projects";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";
import Careers from "./pages/Careers/Careers";
import Contact from "./pages/Contact/Contact";
import Privacy from "./pages/Privacy/Privacy";
import NotFound from "./pages/NotFound/NotFound";
import ComingSoon from "./pages/ComingSoon/ComingSoon";

export default function App() {
  if (import.meta.env.VITE_COMING_SOON === "true") {
    return <ComingSoon />;
  }

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
