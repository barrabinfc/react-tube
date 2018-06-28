import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Grow from '@material-ui/core/Grow';

import Typography from '@material-ui/core/Typography';

import VideoCard from './VideoCard.jsx';
import VideoPropType from './proptypes/Video.js';

const styles = (theme) => ({
    container: {
        'perspective': '800px'
    },
    notfound: {
        padding: '1em',
        'text-align': 'center'
    }
})


/**
 *  video list
 */
class VideosList extends React.Component {
    cardClick = (videoId) => {
        this.props.onSelect( videoId )
    }

    empty = () => {
        const {classes} = this.props

        return <Typography className={classes.notfound} variant="display1">No suggestions :(</Typography>
    }
    
    item( data , i ) {
        return (
            <Grow in={true} key={i} timeout={i*333}>
                <ListItem key={i}>
                        <VideoCard onClick={() => this.cardClick(data.videoId)} video={data} />
                </ListItem>
            </Grow> 
        )
    }

    render() {
        const { classes } = this.props

        return (
            (this.props.items.length === 0 ? this.empty() : 
                <List className={classes.container}>
                    {this.props.items.map( (videoData,i)  => this.item(videoData,i) )} 
                </List>
            )
        )
    }
}

VideosList.propTypes = {
    classes: PropTypes.object.isRequired,
    items: PropTypes.arrayOf(
        VideoPropType
    ),
    onSelect: PropTypes.func.isRequired
};

export default withStyles(styles)(VideosList);
