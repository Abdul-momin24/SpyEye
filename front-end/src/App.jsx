import "./App.css";

import React from "react";

import Landing from "./Pages/Landing/Landing";
import Upload from "./Pages/Upload/Upload";
import Report from "./Pages/Report/Report";

import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import ErrorPage from "./Pages/Errors/ErrorPage";

export const ReportContext = React.createContext();

function App() {
  const [data, setData] = useState("");

  return (
    <ReportContext.Provider value={{ data, setData }}>
      <Routes>
        <Route path="/" element={<Landing></Landing>}></Route>
        <Route path="/upload" element={<Upload></Upload>}></Route>
        <Route path="/report" element={<Report></Report>}></Route>
        <Route path="/Error" element={<ErrorPage />}></Route>
      </Routes>
    </ReportContext.Provider>
  );
}

export default App;
