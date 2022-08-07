import React from "react";
import { Route, Routes } from "react-router-dom";
import Constraints from "./utils/routes/constraints";
import "./App.css";
import Chatpage from "./pages/Chatpage/Chatpage";
import Homepage from "./pages/Homepage/Homepage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={Constraints.Root} element={<Homepage />} />
        <Route path={Constraints.Chat} element={<Chatpage />} />
      </Routes>
    </div>
  );
}

export default App;
