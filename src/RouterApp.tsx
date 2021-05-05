import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Navbar/Navbar';
import { Route, Switch } from 'react-router-dom';
import Login from "./Auth/Login";
import Footer from './Navbar/Footer';
import Signup from "./Auth/Signup";
import "./App.css";
import AdminLogin from "./Admin/AdminLogin";
import EventMain from "./Events/EventMain";
import MusicMain from "./Music/MusicMain";
import AdminHome from "./Admin/AdminHome";
import MusicTable from './Music/MusicTable';


interface Props {

}

export const RouterApp = (props: Props) => {
  const [artist, setArtist] = useState('');
    const URL = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?format=json&q_artist=${artist}&page_size=24&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_API_KEY}`
  const [token, setToken] = useState<string | null>('');


  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const updateToken = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const clearToken = () => {
    localStorage.clear();
    setToken("");
  };

      const protectedViews = () => {
      return (!token ? <Login setToken={updateToken} />  : <MusicMain URL={URL} token={token} />) 
    }

    const protectedViewsEvents = () => {
      return (!token ? <Login setToken={updateToken} />  : <EventMain token={token } />) 
    }

    const protectedViewsTables = () => {
      return (!token ? <Login setToken={updateToken} />  : <MusicTable token={token } />) 

    }
  
    const protectedViewsAdmin = () => {
      return (!token ? <AdminLogin setToken={updateToken} />  : <AdminHome token={token} />) 
    }

    const protectedViewsSignup = () => {
      return (!token ? <Signup setToken={updateToken} />  : <MusicMain URL={URL} token={token} />) 
    }

    const userNavbar = (showSearch: any) =>{
      return (<Navbar token={token}  clickLogout={clearToken} showSearch={showSearch}/>) 
    }
  
    return ( 
        <div>
            
        <Switch>
            <Route exact path="/">
            {userNavbar(false)}
            {protectedViews()}
            </Route>

            <Route exact path="/music">

            {userNavbar(true)}
                {protectedViews()}

            </Route>

            <Route exact path="/events">
            {userNavbar(false)}
            {protectedViewsEvents()}
            </Route>

            <Route exact path="/tables">
            {userNavbar(false)}
            {protectedViewsTables()}
            </Route>

            <Route exact path="/signup">
            {userNavbar(false)}
              {protectedViewsSignup()}
            </Route>

            <Route exact path="/login">
            {userNavbar(false)}
              <Login setToken={setToken} />
            </Route>

            <Route exact path="/admin">
            {userNavbar(false)}
            {protectedViewsAdmin()}
              </Route>
        </Switch>
        <Footer/>
        </div>
     );
}

export default RouterApp;
