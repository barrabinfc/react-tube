import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import theme from '../styles/theme.js';

import VideoPropType from './proptypes/Video.js'
import MenuBar from './MenuBar.jsx';
import Player from './Player.jsx';
import RelatedVideosList from './RelatedVideosList.jsx'

const drawerWidth = 320;

const styles = theme => ({
  root: {
      display: 'flex',
      zIndex: 1,
      overflow: 'hidden',
      position: 'relative',
      width: '100%',
  },
  content: {
      flexGrow: 1,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),      
  },
  'content-right': {
    'margin-right': -drawerWidth
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    height: '100%'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },  
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-right': {
    'margin-right': 0
  }  
})

class App extends React.Component {
  state = {
    drawerOpen: true
  }

  handleDrawerOpen  = () => { this.setState({drawerOpen: true})  }
  handleDrawerClose = () => { this.setState({drawerOpen: false}) }
  handleDrawerToggle = () => {
    this.setState({drawerOpen: !this.state.drawerOpen})
  }

  /** Drawer */
  drawer(){
    const { classes } = this.props
    
    return (
      <Drawer
        variant="persistent"
        anchor='right'
        open={this.state.drawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Typography variant="title" color="inherit" noWrap>Related: </Typography>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <Divider />
        <RelatedVideosList />
      </Drawer>
    );
  }


  render() {
    const { drawerOpen } = this.state
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />

          <MenuBar onHamburguerClick={this.handleDrawerToggle} />
          
          <section className={classes.root}>

            <article className={classNames(classes.content, classes[`content-right`], {
              [classes['contentShift']]: drawerOpen,
              [classes['contentShift-right']]: drawerOpen
            })}>
                <Player videoId={this.props.active.videoId} />
            </article>

            {this.drawer()}

          </section>

        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    active:  VideoPropType.isRequired
};

export default withStyles(styles)(App);