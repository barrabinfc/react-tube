import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import AccountIcon from '@material-ui/icons/AccountCircle';
import NotificationIcon from '@material-ui/icons/Notifications';

import SearchBar from '../containers/SearchBar.js';
import logo from '../assets/logo.svg';

const styles = {
    root: {
        flexGrow: 1,
    },
    toolbar: {
        justifyContent: 'space-between'
    },

    /** Hamburguer and Logo */
    start: {
        display: 'flex',
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    logo: {
        height: 48,
        justifySelf: 'flex-start'
    },

    /** End buttons */
    end: {

    },
};

class MenuBar extends React.Component {
    
    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Toolbar className={classes.toolbar}>
                        <div className={classes.start}>
                            <IconButton className={classes.menuButton} aria-label="Menu">
                                <MenuIcon />
                            </IconButton>
                            <img src={logo} className={classes.logo} alt="logo" />
                        </div>
                        <SearchBar />
                        <div className={classes.end}>
                            <IconButton ><NotificationIcon /></IconButton>
                            <IconButton ><AccountIcon /></IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

MenuBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuBar);