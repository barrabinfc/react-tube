import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';

import VideoPropType from './proptypes/Video.js';

/** Humanly readable numbers */
const humanUnit = ( number, precision=2) => {
    const abbrev = ['', 'k', 'm', 'b', 't'];
    const unrangifiedOrder = Math.floor(Math.log10(Math.abs(number)) / 3)
    const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ))
    const suffix = abbrev[order];
  
    return (number / Math.pow(10, order * 3)).toFixed(precision) + suffix;
}

const styles = (theme) => ({
    container: {
        position: 'relative',
        'width': '100%',
        'display': 'block',
        'justify-content': 'center',
        'align-items': 'center',
        'padding': theme.spacing.unit * 2,        
    },
    top: {
        'padding': theme.spacing.unit * 2,        
    },
    actionbar: {
        'display': 'flex',
        'align-items': 'flex-end',
        'justify-content': 'space-between'
    },
    'info': {
        'padding': theme.spacing.unit * 2,    
    },
    empty: {},
    chip: {
        margin: theme.spacing.unit
    },
    description: {
        'white-space': 'pre-wrap',
    }
})

/**
 * Display video information in more details
 */
class VideoDetail extends React.Component {
    empty = () => {
        const {classes} = this.props 
        
        return (
        <div className={classes.empty}>
            <Typography variant="title" color="inherit">&nbsp;</Typography>
        </div>)
    }

    render() {
        const { classes , video } = this.props
        const stats = video.statistics || {viewCount: 0, likeCount: 0, dislikeCount: 0}

        return (
            <div className={classes.container}>
                <div className={classes.top}>
                    
                    {//this.props.video.videoId === false ? this.empty() : 
                        (<Typography variant="title" color="inherit">{video.title}</Typography>)}

                    <div className={classes.actionbar}>
                        <Typography variant="subheading" color="inherit">{humanUnit(stats.viewCount)} views</Typography>
                        <div>
                            <Chip label={`${humanUnit(stats.likeCount)} Likes`} className={classes.chip} 
                                                avatar={<Avatar><ThumbUp/></Avatar>} clickable />
                            <Chip label={`${humanUnit(stats.dislikeCount)} Dislikes`} className={classes.chip} 
                                                avatar={<Avatar><ThumbDown/></Avatar>} clickable />
                        </div>
                    </div>
                </div>
                <Divider/>
                <div className={classes.info}>
                    <Typography variant="button">{video.channelTitle}</Typography>
                    <Typography className={classes.description}>{video.description}</Typography>
                </div>
            </div>
        )
    }
}

VideoDetail.propTypes = {
    classes: PropTypes.object.isRequired,
    video:   VideoPropType    
};

export default withStyles(styles)(VideoDetail);
