import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import PlayIcon from '@material-ui/icons/PlayCircleOutline';

import VideoPropType from './proptypes/Video.js';

const styles = (theme) => ({
    card: {
        display: 'flex',
        cursor: 'pointer',
        transform: 'translate3d(0,0,0px)',
        transition: theme.transitions.create(['box-shadow','transform'], {
            easing: theme.transitions.easing.sharp,
            duration: '0.15s',
        }),          
        '&:hover': {
            transform: 'translate3d(0,0,20px)',
        }
    },
    'content': {
        flex: '1 0.25 auto',
        'flex-wrap': 'wrap',
    },
    cover: {
        flex: '1 0 auto',
        width: 155,
        height: 'calc(155px * 3/4)'
    }
})

/**
 * Video Card, display title, channel and thumbnail
 */
class VideoCard extends React.Component {
    state = {
        hover: false,
    }

    mouseOver = (ev) => {  this.setState({hover: true})  }
    mouseLeave = (ev) => { this.setState({hover: false}) }

    render() {
        const { video , classes , onClick} = this.props
        
        return (
            <Card onMouseEnter={this.mouseOver} 
                  onMouseLeave={this.mouseLeave}
                  onClick={onClick} 
                  className={classes.card} 
                  raised={this.state.hover}>
                <CardMedia 
                            className={classes.cover}
                            image={video.thumbnails.high.url} 
                            title={video.title} />
                <CardContent className={classes.content}>
                    <Typography variant="body2">{video.title}</Typography>
                    <Typography variant="caption" color="textSecondary">
                        {video.channelTitle}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

VideoCard.propTypes = {
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    video: VideoPropType.isRequired,
};

export default withStyles(styles)(VideoCard);
