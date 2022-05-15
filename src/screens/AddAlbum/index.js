import React, { useState, useEffect } from "react";
import "../../components/content/content.css";
import logo from "../../assets/logo (2).png";
import "./AddAlbum.css";
import api from "../../services/api";
import NavBar from "../../components/navbar";

function AddAlbum() {
  const [album, setAlbum] = useState("");
  const [year, setYear] = useState("");

  async function handleAlbum(e) {
    e.preventDefault();

    try {
      await api.post("/album", {
        name: album,
        year: year,
      });
      setYear("");
      setAlbum("");
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="container">
      <NavBar />
      <div className="content">
        <div className="header">
          <img src={logo} alt="logo" />
          <h1>Discografia</h1>
        </div>
        <div className="form">
          <form onSubmit={handleAlbum}>
            <p>O nome do album</p>
            <input
              type="text"
              className="input-form"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              placeholder="Album"
            />
            <p>O ano do album</p>
            <input
              type="text"
              className="input-form"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="2022"
            />

            <input type="submit" value="Enviar" className="btn" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddAlbum;
