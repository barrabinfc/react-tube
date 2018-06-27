import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import PlayIcon from '@material-ui/icons/PlayCircleOutline';

import VideoPropType from './proptypes/Video.js';

const styles = (theme) => ({
    card: {
        display: 'flex',
        cursor: 'pointer'
        //padding:  theme.spacing.unit,
    },
    'content': {
        flex: '1 0 auto',
    },
    cover: {
        width: 155,
        height: 155
    }
})

/**
 * Video Card, display title, channel and thumbnail
 */
export const VideoCard = (props) => {
    const { video , classes } = props
    return (
      <Card onClick={props.onClick} className={classes.card}>
        <CardMedia 
                    className={classes.cover}
                    image={video.thumbnail.default.url} 
                    title={video.title} />
        <CardContent className={classes.content}>
            <Typography variant="headline">Live From Space</Typography>
            <Typography variant="subheading" color="textSecondary">
                Mac Miller
            </Typography>
        </CardContent>
      </Card>
    );
}

VideoCard.propTypes = {
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    video: VideoPropType.isRequired,
};

export default withStyles(styles)(VideoCard);
