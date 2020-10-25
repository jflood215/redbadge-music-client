import { Rating } from '@material-ui/lab';
import { Button, Card, CardActions, CardContent, Collapse, createStyles, Grid, IconButton, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import * as React from 'react';
import { TrackList } from './MusicInterface';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import clsx from 'clsx';

export interface MusicCardsProps {
    token : string;
    trackList : TrackList;
    index : number;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 275,
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
        fetch(`http://localhost:3001/music/create`, {
        method: 'POST',
        body: JSON.stringify({
            song: props.trackList.track.track_name,
            artist: props.trackList.track.artist_name,
            album: props.trackList.track.album_name,
            text: textField,
            rating: starRating,
        }),
        headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: props.token !== null ? props.token : '',
        }),
    })
    .then((res) => res.json())
    .then((music) => {
        console.log(music);
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
        <Grid item xs={12} sm={12} className={classes.cardspacing} key={index}>
        <Card className={classes.root} style={{backgroundColor: 'darksalmon'}}>
          <CardContent>
            <Typography variant="body2" color='textPrimary' component="p">
            {trackList.track.artist_name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {trackList.track.album_name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {trackList.track.track_name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            <a href ={trackList.track.track_edit_url} target='blank'>Click here for Lyrics</a>
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" style={{color: 'red'}}>
              <FavoriteIcon />
            </IconButton>
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
              <Typography>Ratings/Review:</Typography>
              <form className={classes.root} >
              <Rating  name={`${Math.random()*10}`} value={starRating} onChange={(e, newValue) => setstarRating(newValue)} precision={0.5} />
              </form>
              <form className={classes.root} noValidate autoComplete="off">
              <TextField id="outlined-basic" label="Write a Review" variant="outlined" value={textField} onChange={(e) => setTextField(e.target.value) } />
              </form>
              <Button onClick={(e) => handleSubmit()}>Click to Submit!</Button>
            </CardContent>
          </Collapse>
        </Card>
        </Grid>
     );
}
export default MusicCards;