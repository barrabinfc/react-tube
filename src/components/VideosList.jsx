import React from 'react';
import PropTypes from 'prop-types';

import update from 'immutability-helper';

import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Divider from '@material-ui/core/Divider';

import VideoCard from './VideoCard.jsx';
import VideoPropType from './proptypes/Video.js';

import { MockVideoData } from '../mock/index.js';

const styles = (theme) => ({
    container: {
    },
})


/**
 *  video list
 */
class VideosList extends React.Component {
    cardClick = (videoId) => {
        this.props.onSelect( videoId )
    }
    
    list() {
        return (
            <div>
                <ListItem>
                    <VideoCard onClick={() => this.cardClick(MockVideoData.videoId)} video={MockVideoData} />
                </ListItem>
                <ListItem>
                    <VideoCard onClick={() => this.cardClick(MockVideoData.videoId)} video={MockVideoData} />
                </ListItem>
                <ListItem>
                    <VideoCard onClick={() => this.cardClick(MockVideoData.videoId)} video={MockVideoData} />
                </ListItem>

            </div>      
        )
    }

    render() {
        const { classes } = this.props

        return (
            <List className={classes.container}>
                {this.list()}
            </List>
        )
    }
}

VideosList.propTypes = {
    classes: PropTypes.object.isRequired,
    videoId: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(
        VideoPropType
    ),
    onSelect: PropTypes.func.isRequired
};

export default withStyles(styles)(VideosList);
