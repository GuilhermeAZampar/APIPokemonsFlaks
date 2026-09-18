import { useState,useEffect } from 'react'
import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home.jsx";
import Detalhes from "./pages/Detalhes.jsx";
import Cadastrar from "./pages/Cadastrar.jsx";

function App() {
  return (
    <>
        <Routes>
            <Route path ={"/"} element={<Home/>}></Route>
            <Route path={"/pokemon/:id"} element={<Detalhes/>}></Route>
            <Route path={"/cadastrar"} element={<Cadastrar/>}></Route>
        </Routes>


    </>
  )
}

export default App
