import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import Home from './pages/Home';
import Services from './pages/Services';
import Training from './pages/Training';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      {/* Navbar includes the AnnouncementBar internally */}
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dich-vu" element={<Services />} />
          <Route path="/dao-tao" element={<Training />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/gioi-thieu" element={<About />} />
          <Route path="/lien-he" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <FloatingCTA />
    </BrowserRouter>
  );
}
