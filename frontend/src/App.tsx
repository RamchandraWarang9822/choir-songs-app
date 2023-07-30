// frontend/src/App.tsx
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [songs, setSongs] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [ppt, setPpt] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handlePptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPpt(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('lyrics', lyrics);
    if (image) formData.append('image', image);
    if (ppt) formData.append('ppt', ppt);

    try {
      const response = await axios.post('/api/upload', formData);
      const songData = {
        title,
        lyrics,
        image: response.data.path,
        ppt: response.data.path,
      };

      setSongs([...songs, songData]);
      setTitle('');
      setLyrics('');
      setImage(null);
      setPpt(null);
    } catch (error) {
      console.error('Error uploading song:', error);
    }
  };

  return (
    <div>
      <h1>Church Choir Songs</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lyrics">Lyrics:</label>
          <textarea
            id="lyrics"
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" onChange={handleImageChange} />
        </div>
        <div>
          <label htmlFor="ppt">PPT:</label>
          <input type="file" id="ppt" onChange={handlePptChange} />
        </div>
        <button type="submit">Add Song</button>
      </form>
      <div>
        <h2>Songs List</h2>
        {songs.map((song, index) => (
          <div key={index}>
            <h3>{song.title}</h3>
            <p>{song.lyrics}</p>
            <img src={song.image} alt="Song Image" />
            <embed src={song.ppt} type="application/vnd.ms-powerpoint" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
