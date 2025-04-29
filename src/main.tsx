import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import Navbar from "./components/Navbar.tsx"
import Home from "./components/Home.tsx"
import WoW from "./components/WoW.tsx"
import BG3 from "./components/BG3.tsx"
import Fallout from "./components/Fallout.tsx"
import ElderScrolls from "./components/ElderScrolls.tsx"

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/wow" element={<WoW />} />
                <Route path="/bg3" element={<BG3 />} />
                <Route path="/fo" element={<Fallout />} />
                <Route path="/elderScrolls" element={<ElderScrolls />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
