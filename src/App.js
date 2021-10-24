import "./App.css";
import {useEffect, useState} from "react";
import Slider from 'react-input-slider';
import logo from './Listr.png'


function App() {
  const [data, setData] = useState(0);
  const [albums, setAlbums] = useState(undefined);
  const [artists, setArtists] = useState(undefined);
  const [tracks, setTracks] = useState(undefined);
  const [search, setSearch] = useState("");
  const [formVal, setformVal] = useState("");
  const [userList, setUserList] = useState([]);
  const client_id = "e4f372bf9ebc4469bf6559b1e597095f";
  const client_secret = "a8c31466abb944bbb6be1381ff38bbbd";
  const [token, setToken] = useState("");
  const [state, setState] = useState([0, 0, 0, 0, 0]);
  let score = state;


  const code = window.location.href.slice(28, window.location.href.length);
  const redirect_uri = 'http://localhost:3000/';
  const grant_type = 'authorization_code';
  async function fetchDataAgain() {
    try {
      const response = await fetch(
        `https://accounts.spotify.com/api/token?code=${code}&redirect_uri=http://localhost:3000/&grant_type=authorization_code`,
        {
          method: "POST",
          headers: {
            "Authorization": "Basic " + btoa(client_id + ":" + client_secret),
            "Content-Type": "application/x-www-form-urlencoded",
          },
          json: true,
        }
      );
      let info2 = await response.json();
      return await info2;
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    fetchDataAgain().then((info) => {
    setToken(info.access_token);
  });
  }, [])
  
  const HandleResponse = (e) => {
    e.preventDefault();
    setSearch(formVal);
    setformVal("");
  };
  async function fetchData() {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${search}&type=album,track,artist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let info = await response.json();
      return await info;
    } catch (e) {
      console.log("error");
    }
  }

  useEffect(() => {
    fetchData()
      .then((info) => {
        if (
          info.albums !== undefined &&
          info.artists !== undefined &&
          info.tracks !== undefined
        ) {
          setData(info);
          setAlbums(info.albums.items.slice(0, 5));
          setArtists(info.artists.items.slice(0, 5));
          setTracks(info.tracks.items.slice(0, 5));
          if (albums !== undefined) {
            for (let i = 0; i < info.albums.items.slice(0, 5).length; i++) {
              if (
                document.getElementById(
                  info.albums.items.slice(0, 5)[i].name
                ) !== null
              ) {


                document.getElementById(
                  info.albums.items.slice(0, 5)[i].name
                ).style.display = "block";
              }
            }
            for (let i = 0; i < userList.length; i++) {


              if (document.getElementById(userList[i].name) !== null) {
                document.getElementById(userList[i].name).style.display =
                  "none";
              }
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search, token]);
  let albumDisplay = undefined;

  if (albums !== undefined && artists !== undefined && tracks !== undefined) {
    // display albums
    albumDisplay = albums.map((album, index) =>
        <div class="album" key={index}>
          <div class="album-content" id="cover">
            <div class="image">
              <img src={album.images[0].url}></img>
            </div>
          </div>
          <div class="album-content" id="text">
            <div class="text">
              <a href={album.external_urls.spotify}>{album.name}</a>
            </div>
          </div>
          <div class="album-content" id="button">
            <div class="button">
              <button
                class="btn-add"
                style={{display: "block"}}
                id={album.name}
                onClick={() => AddtoList(album)}
              >
                +
              </button>
            </div>
          </div>
        </div>
    );
  }

  const AddtoList = (value) => {
    setUserList((userList) => [...userList, value]);
    document.getElementById(value.name).style.display = "none";
  };

  return (
    <div className="App">
      <div className="wrapper">
              <img src={logo} className="image"/>

        <h1 className="header">Listr: Rate your favorite albums!</h1>
      <a className="search"
        href={
          "https://accounts.spotify.com/authorize?response_type=code&client_id=e4f372bf9ebc4469bf6559b1e597095f&redirect_uri=http://localhost:3000/"
        }
      >
        Login to Spotify
      </a>
      <div>
        <h1>Search for an album!</h1>
        <form onSubmit={(e) => HandleResponse(e)}>
          <input
            type="text"
            className="searchbar"
            value={formVal}
            onChange={(e) => {
              setformVal(e.target.value);
            }}
          ></input>
          <br />
          <button className="search-btn">Search</button>
        </form>
      </div>
      <div>
        <div class="results">
          <div class="result">
            <h1>Albums</h1>
            {albumDisplay}
          </div>
        </div>
      </div>
      <h1>My List</h1>
      <div class="results">
        <div class="result">
          {userList.map((album, index) => (
            <div class="album" key={index}>
              <div class="album-content" id="cover">
                <div class="image">
                  <img src={album.images[0].url}></img>
                </div>
              </div>
              <div class="album-content" id="text">
                <div class="text">
                  <a href={album.external_urls.spotify}>{album.name}</a>
                </div>
              </div>
              <div class="album-content" id="button">
                <Slider
        className="slider"
        axis="x"
        xmax={10}
        xmin={1}
        x={state[index]}
        onChange={({ x }) => {
          let newArr = [...state];
          newArr[index] = x;
          setState(newArr);
        }}
        styles={{
          track: {
            backgroundColor: 'gray'
          },
          active: {
            backgroundColor: 'blue'
          },
          thumb: {
            width: 10,
            height: 10
          },
          disabled: {
            opacity: 0.1
          }
        }}
      />
      <p id="slider-value">{state[index]}</p>
</div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
