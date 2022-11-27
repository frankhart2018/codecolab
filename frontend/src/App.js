import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CodeSharer from "./CodeSharer";
import Landing from "./Landing";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} index />
        <Route path="/view-code/*" element={<CodeSharer />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
