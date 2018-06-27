import React from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from '../styles/theme.js';
import MenuBar from '../components/MenuBar.jsx';
import Player from '../components/Player.jsx';

const styles = theme => ({
  main: {
      display: 'block',
  },
})

class App extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
          
          <section className="app">

            <MenuBar />

            <article className={classes.main}>
              <Player videoId={this.props.active.id} />
            </article>

          </section>

        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    active: PropTypes.shape({
        id:          PropTypes.string.isRequired,
        title:       PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        author:      PropTypes.string.isRequired,
        thumbnail:   PropTypes.string.isRequired
    }).isRequired
};

export default withStyles(styles)(App);