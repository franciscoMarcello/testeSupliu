import React, { useState, useEffect } from "react";
import "./content.css";
import logo from "../../assets/logo (2).png";
import { FaTrash } from "react-icons/fa";

import api from "../../services/api";
function Content() {
  const [pesquisa, setPesquisa] = useState("");
  const [albums, setAlbums] = useState([]);

  async function handleDeleteAlbum(id) {
    console.log(id);
    try {
      await api.delete(`/album/${id}`, {
        id: id,
      });
    } catch (e) {
      console.log(e);
    }
  }
  async function handleDeleteFaixa(id) {
    try {
      await api.delete(`/track/${id}`, {
        id: id,
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    async function getAlbuns() {
      const response = await api.get("/album");
      setAlbums(response.data.data);
    }
    getAlbuns();
  }, []);

  async function teste(e) {
    e.preventDefault();

    try {
      const response = await api.get(`/album?keyword=${pesquisa}`);

      setAlbums(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="content">
      <div className="header">
        <img src={logo} alt="logo" />
        <h1>Discografia</h1>
      </div>
      <div className="form">
        <form onSubmit={teste}>
          <p>Digite um palavra chave</p>
          <input
            type="text"
            className="input"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            placeholder="Min"
          />

          <input type="submit" value="Procurar" className="btn" />
        </form>
      </div>

      <div className="list">
        {albums.length === 0 && <h1> Sem musicas cadastradas</h1>}
        {albums.map((album) => (
          <div key={album.id}>
            <h1>
              Álbum: {album.name}, {album.year}{" "}
              <button onClick={() => handleDeleteAlbum(album.id)}>
                <FaTrash size="20" color="red" className="icon" />
              </button>
            </h1>
            <div className="row">
              <div className="indice">
                <label>N</label>
                <label>Faixa</label>
                <button onClick={() => handleDeleteFaixa(album.tracks[0].id)}>
                  <FaTrash size="20" color="red" className="icon" />
                </button>
              </div>

              <label>Duração</label>
            </div>
            {album.tracks.length > 0 && (
              <div className="row">
                <div className="indice">
                  <label>{album.tracks[0].number}</label>
                  <label>{album.tracks[0].title}</label>
                </div>
                <label>{(album.tracks[0].duration / 60).toFixed(2)}</label>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
