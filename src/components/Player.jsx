import React from 'react';
import PropTypes from 'prop-types';

import update from 'immutability-helper';

import { withStyles } from '@material-ui/core/styles';

import Youtube from 'react-youtube';
import Typography from '@material-ui/core/Typography';

const styleCenterMixin = (opts) => ({...opts, ...{
    'display': 'flex',
    'align-items': 'center',
    'width': '50%',
    'height': '100%',
    'margin': '0px auto',
    'color': '#fff',
    'text-align': 'center'
}})

const styles = {
    container: {
        position: 'relative',
        'width': '100%',
        'height': 'calc((9 / 16) * 100vw)',
        'max-height': 'calc(100vh - 185px)',
        'min-height': '480px',
        'background': '#000',
        'display': 'block',
        'justify-content': 'center',
        'align-items': 'center'
    },
    player: {
        'width': '100%',
        'height': '100%'
    },
    empty: styleCenterMixin(),
    notfound: styleCenterMixin()
}

/**
 * A full width player
 */
class Player extends React.Component {
    empty = () => {
        const {classes} = this.props 
        
        return (
        <div className={classes.empty}>
            <Typography variant="display2" color="inherit">
                Use the search box above to find your video
            </Typography>
        </div>)
    }

    notfound = () => {
        const {classes} = this.props 

        return (
        <div className={classes.notfound}>
             <Typography variant="display2" color="inherit">
                 Video requested was not found... sorry about that.
            </Typography>
        </div>)
    }


    player = () => {
        const {classes} = this.props

        return (<Youtube className={classes.player} videoId={this.props.videoId} />)
    }

    render() {
        const { classes } = this.props

        return (
            <div className={classes.container}>
                { this.props.videoId === undefined ? this.empty() 
                    : (this.props.videoId === '' ? this.notfound() : this.player()) }
            </div>
        )
    }
}

Player.propTypes = {
    classes: PropTypes.object.isRequired,
    videoId: PropTypes.string.isRequired
};

export default withStyles(styles)(Player);
