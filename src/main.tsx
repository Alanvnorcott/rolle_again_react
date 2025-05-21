import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from "@vercel/analytics/react"
import './index.css'

import WowClassic from "./components/WowClassicHC.tsx"
import Navbar from "./components/Navbar.tsx"
import Home from "./components/Home.tsx"
import WoWRetail from "./components/WoWRetail.tsx";
import BG3 from "./components/BG3.tsx";
import Fallout from "./components/Fallout.tsx";
import ElderScrolls from "./components/ElderScrolls.tsx";
import About from "./components/About.tsx";


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/wow-classic" element={<WowClassic />} />
                <Route path="/wow-retail" element={<WoWRetail />} />
                <Route path="/bg3" element={<BG3 />} />
                <Route path="/fo" element={<Fallout />} />
                <Route path="/elderScrolls" element={<ElderScrolls />} />
                <Route path="/about" element={<About />} />
                <Analytics />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
