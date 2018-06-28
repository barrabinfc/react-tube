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
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import theme from '../styles/theme.js';

import VideoPropType from './proptypes/Video.js'
import MenuBar from './MenuBar.jsx';

import Player from './Player.jsx';
import VideoDetail from './VideoDetail.jsx';

import VideosList from '../containers/VideosList.js'

const drawerWidth = 420;
const menuHeight = 64;

const styles = theme => ({
  root: {
      display: 'flex',
      overflow: 'hidden',
      position: 'relative',
      width: '100%',
      'margin-top': menuHeight,
      'z-index': 0,
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
    'min-height': `calc(100vh - ${menuHeight}px)`,
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
  },

  /** Loading indicator */
  'loadIndicator': {
    position: 'absolute',
    top: '0px',
    width: '100%',
    display: 'block',
    height: theme.spacing.unit,

    'z-index': 10000,
    'opacity': 0,
    'background': 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 80%, #FE6B8B 100%) repeat' ,
    'background-size': '50% 100%',
    'animation': 'moving-gradient 2s linear infinite', 

    'transition': theme.transitions.create('opacity', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),    
    
  },
  'isLoading': {
    'opacity': 1
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
          <Typography variant="title" color="inherit" noWrap>Suggestions: </Typography>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </div>

        <Divider />
        <VideosList />
      </Drawer>
    );
  }


  render() {
    const { drawerOpen } = this.state
    const { classes , isLoading } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />

          <MenuBar onHamburguerClick={this.handleDrawerToggle} 
                   onNotificationClick={this.props.onDefaultAction}
                   onLogoClick={this.props.onDefaultAction} 
                   onVideoSelect={this.props.onVideoSelect} />
          
          <section className={classes.root}>

            <div className={classNames(classes.loadIndicator, {
              [classes['isLoading']]: isLoading
            })} ></div>

            <article className={classNames(classes.content, classes[`content-right`], {
              [classes['contentShift']]: drawerOpen,
              [classes['contentShift-right']]: drawerOpen
            })}>
                <Player onSampleClick={this.props.onDefaultAction} videoId={this.props.player.videoId} />
                <VideoDetail video={this.props.player} />
            </article>

            {this.drawer()}

          </section>

        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
    classes:          PropTypes.object.isRequired,
    isLoading:        PropTypes.bool.isRequired,
    player:           VideoPropType.isRequired,
    onDefaultAction:  PropTypes.func.isRequired,
    onVideoSelect:    PropTypes.func.isRequired
};

export default withStyles(styles)(App);