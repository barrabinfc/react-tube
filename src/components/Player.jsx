import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Youtube from 'react-youtube';

const MiddleMixin = (opts) => ({...opts, ...{
    'display': 'flex',
    'align-items': 'center',
    'width': '70%',
    'height': '100%',
    'margin': '0px auto',
    'text-align': 'center',
    'justify-content': 'center'
}})

const styles = (theme) => ({
    container: {
        position: 'relative',
        'width': '100%',
        'height': 'calc((9 / 16) * 100vw)',
        'max-height': 'calc(100vh - 185px)',
        'min-height': '480px',
        'background': theme.palette.primary.dark,
        'display': 'block',
        'justify-content': 'center',
        'align-items': 'center'
    },
    player: {
        'width': '100%',
        'height': '100%'
    },
    empty: MiddleMixin({'color': theme.palette.primary.contrastText}),
    notfound: MiddleMixin({'color': theme.palette.primary.contrastText}),
    sample: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
})

/**
 * A full width player
 */
class Player extends React.Component {
    empty = () => {
        const {classes} = this.props 
        
        return (
        <div className={classes.empty}>
            <Typography variant="display2" color="inherit">
                Start by selecting a <Button onClick={this.props.onSampleClick} className={classes.sample}>example</Button><br/>
                or use the search box above.
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
                { this.props.videoId === false ? this.empty() 
                    : (this.props.videoId === '' ? this.notfound() : this.player()) }
            </div>
        )
    }
}

Player.propTypes = {
    classes: PropTypes.object.isRequired,
    videoId: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
    ]),
    onSampleClick: PropTypes.func
};

export default withStyles(styles)(Player);
