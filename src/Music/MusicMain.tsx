import React from 'react';
import MusicDisplay from './MusicDisplay';
import {  TrackResponse } from './MusicInterface';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import '../../src/App.css'

export interface MusicMainProps {
    URL: string;  
    token: string;
}
export interface MusicMainState {
    Message: TrackResponse  | undefined;
    artist: string;
}
class MusicMain extends React.Component<MusicMainProps, MusicMainState> {
    constructor(props: MusicMainProps) {
        super(props);
        this.state = {Message : undefined, artist: '' };
    }

    onSearch = (e:any) => {
        e.preventDefault();
        fetch(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?format=json&q_artist=${this.state.artist}&page_size=24&page=1&s_track_rating=desc&apikey=157843679a41620c9286f788772f29e0`)
        .then((res) => res.json())
        .then((json:TrackResponse) => {
            console.log(json)
            this.setState({Message:json})
        })
    }
    render() { 
        return ( 
            <div>
                 <h1 style={{display: 'flex', justifyContent: 'center'}}>Search for an Artist</h1>
                <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'}}>

        <form style={{width: '100%' // Fix IE 11 issue.
    }}>
          <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="search"
          label="Search"
          name="search"
          autoComplete="off"
          autoFocus
          type="text"
          onChange={(e) => this.setState({ artist: e.target.value })}
        />
        <Button
        style={{margin: '1em 40% 1em', textTransform: 'none'}}
            type="submit"
            variant="contained"
            color="secondary"
            onClick={(e) => this.onSearch(e)}
          >
            Search
          </Button>
          </form>
          </div>
</Container>
          
            {this.state.Message!== undefined ?  < MusicDisplay  token={this.props.token} message={this.state.Message}/> : <></>}
            </div>
         );
    }
}
export default MusicMain;
