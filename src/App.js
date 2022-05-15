import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./screens/Home";
import AddAlbum from "./screens/AddAlbum";
import AddFaixa from "./screens/AddFaixa";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/AddAlbum" element={<AddAlbum />} />
      <Route path="/AddFaixa" element={<AddFaixa />} />
    </Routes>
  );
}
export default App;
