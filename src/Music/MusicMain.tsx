import React from 'react';
import MusicDisplay from './MusicDisplay';
import { TrackList, TrackResponse } from './MusicInterface';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

export interface MusicMainProps {
    URL: string;  
    token: string;
    trackList : TrackList
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
        fetch(`https://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/track.search?q_artist=${this.state.artist}&page_size=25&page=1&s_track_rating=desc&apikey=cb3a98f799d05dea32805bf9896932fe`)
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
    flexDirection: 'row',
    alignItems: 'center',}}>
        {/* <Typography component="h1" variant="h5">
          Sign In
        </Typography> */}
        <form style={{width: '100%' // Fix IE 11 issue.
    }}>
          <TextField
          variant="outlined"
          margin="normal"
          // required
          fullWidth
          id="search"
          label="Search"
          name="search"
          autoComplete="off"
          autoFocus
          type="text"
          // required
          onChange={(e) => this.setState({ artist: e.target.value })}
        />
        <Button
        style={{display: 'flex', justifyContent: 'center'}}
            type="submit"
            // fullWidth 
            variant="contained"
            color="secondary"
            // style={{marginBottom: '0.8em'}}
            onClick={(e) => this.onSearch(e)}
          >
            Search
          </Button>
          </form>
          </div>
</Container>
            {this.state.Message!==undefined ?  < MusicDisplay trackList={this.props.trackList} token={this.props.token} message={this.state.Message}/> : <></>}
            </div>
         );
    }
}
export default MusicMain;