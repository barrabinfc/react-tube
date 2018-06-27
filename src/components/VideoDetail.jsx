import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import VideoPropType from './proptypes/Video.js';

const styles = (theme) => ({
    container: {
        position: 'relative',
        'width': '100%',
        'height': 'calc((9 / 16) * 100vw)',
        'max-height': 'calc(100vh - 185px)',
        'min-height': '480px',
        'display': 'block',
        'justify-content': 'center',
        'align-items': 'center',
        padding: theme.spacing.unit * 3,
    },
    actionbar: {},
    info: {},
    empty: {}
})

/**
 * Display video information in more details
 */
class VideoDetail extends React.Component {
    empty = () => {
        const {classes} = this.props 
        
        return (
        <div className={classes.empty}>
            <Typography variant="title" color="inherit">
                ...
            </Typography>
        </div>)
    }

    render() {
        const { classes , video } = this.props

        return (
            <div className={classes.container}>
                { 
                    this.props.video.videoId === false ? this.empty() : 
                    (<div className={classes.actionbar}>
                        <Typography variant="display1" color="inherit">{video.title}</Typography>
                        <Typography variant="subheading" color="inherit">{video.publishedAt}</Typography>
                    </div>)
                }
                <Divider/>
                <div className="info">
                    <p>{video.description}</p>
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
