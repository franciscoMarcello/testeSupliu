import React, { useState, useEffect } from "react";
import "../../components/content/content.css";
import logo from "../../assets/logo (2).png";
import "../AddAlbum/AddAlbum.css";
import api from "../../services/api";
import NavBar from "../../components/navbar";

function AddFaixa() {
  const [albums, setAlbums] = useState([]);
  const [albumId, setAlbumId] = useState("");
  const [number, setNumber] = useState("");
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    async function getAlbuns() {
      const response = await api.get("/album");
      setAlbums(response.data.data);
    }
    getAlbuns();
  }, []);

  async function handleAlbum(e) {
    e.preventDefault();
    console.log(albumId);
    try {
      await api.post("/track", {
        album_id: albumId,
        number: number,
        title: title,
        duration: duration,
      });
      setAlbumId("");
      setTitle("");
      setDuration("");
      setNumber("");
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
            <p>Album</p>
            <select
              className="input-form"
              onChange={(e) => setAlbumId(e.target.value)}
            >
              {albums.map((album) => (
                <option seleted key={album.id} value={album.id}>
                  {album.name}
                </option>
              ))}
            </select>
            <p>Numero da faixa</p>
            <input
              type="text"
              className="input-form"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="1"
            />
            <p>O nome da Faixa</p>
            <input
              type="text"
              className="input-form"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Something in the Way"
            />
            <p>A duração da faixa(Em segundos)</p>
            <input
              type="text"
              className="input-form"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="218"
            />

            <input type="submit" value="Enviar" className="btn" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddFaixa;
