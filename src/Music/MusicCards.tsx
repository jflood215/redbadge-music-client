import { Rating } from '@material-ui/lab';
import { Button, Card, CardActions, CardContent, Collapse, createStyles, Grid, IconButton, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { TrackList } from './MusicInterface';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import clsx from 'clsx';
import APIURL from '../helpers/environment';

export interface MusicCardsProps {
    token : string;
    trackList : TrackList;
    index : number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 375,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    cardspacing: {
      padding: "1%"
  }
  }),
);
 
const MusicCards: React.SFC<MusicCardsProps> = (props: MusicCardsProps) => {
    const classes = useStyles();
    const {trackList, index} = props
    const [starRating, setstarRating] = React.useState<number | null >(2.5);
    const [expanded, setExpanded] = React.useState(false);
    const [textField, setTextField] = React.useState('');

    const handleSubmit = () => {
        fetch(`${APIURL}/music/create`, {
        method: 'POST',
        body: JSON.stringify({
            music: {
            song: props.trackList.track.track_name,
            artist: props.trackList.track.artist_name,
            album: props.trackList.track.album_name,
            text: textField,
            rating: starRating,
            }
        }),
        headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: props.token !== null ? props.token : '',
        }),
    })
    .then((res) => res.json())
    .then((music) => {
        console.log(music);
        handleExpandClick();
    //     this.setState({
    //         song: this.state.song,
    //         artist: this.state.artist,
    //         album: this.state.album,
    //         text: this.state.text,
    //         rating: this.state.rating,
    //     });
    //     this.props.fetchMusic(); 
    // });
    })}

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

    return ( 
      
         <Grid item xs={4} sm={4} className={classes.cardspacing} key={props.index}>
        <Card className={classes.root} style={{backgroundColor: '#F50057'}}>
          <CardContent>
            <Typography variant="body2" color='textPrimary' component="p" style={{color: 'white'}}>
            {trackList.track.artist_name}
            </Typography>
            {/* <Typography variant="body2" color="textSecondary" component="p" style={{color: 'white'}}>
            {trackList.track.album_name}
            </Typography> */}
            <Typography variant="body2" color="textSecondary" component="p" style={{color: 'white'}}>
            {trackList.track.track_name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            <a href ={trackList.track.track_edit_url} target='blank'>Click here for Lyrics</a>
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {/* <IconButton aria-label="add to favorites" style={{color: 'red'}}>
              <FavoriteIcon /> */}
            {/* </IconButton> */}
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography style={{color: 'white'}}>Ratings/Review:</Typography>
              <form className={classes.root} >
              <Rating  name={`${Math.random()*10}`} value={starRating} precision={1.0} onChange={(e, newValue) => setstarRating(newValue)} />
              </form>
              <form className={classes.root} noValidate autoComplete="off">
              <TextField style={{color: 'white'}} id="outlined-basic" label="Write a Review" variant="outlined" value={textField} onChange={(e) => setTextField(e.target.value) } />
              </form>
              <Button variant='outlined' color='default' onClick={(e) => handleSubmit()}>Click to Submit!</Button>
            </CardContent>
          </Collapse>
        </Card>
        </Grid>
        
       
     );
}
 
export default MusicCards;