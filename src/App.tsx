import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sobre from "./pages/Sobre";




function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#050A14] text-white font-inter">
        
        <ToastContainer 
          position="top-right" 
          autoClose={3000} 
          theme="dark" 
        />
        
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

