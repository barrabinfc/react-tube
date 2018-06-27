import React from 'react';
import PropTypes from 'prop-types';

import update from 'immutability-helper';

import { withStyles } from '@material-ui/core/styles';

import VideoPropType from './proptypes/Video.js'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';

const styles = (theme) => ({
    container: {
    },
})

export const otherMailFolderListItems = (
    <div>
      <ListItem button>
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <ListItemText primary="All mail" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary="Trash" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ReportIcon />
        </ListItemIcon>
        <ListItemText primary="Spam" />
      </ListItem>
    </div>
  );

/**
 * Related video list
 */
class RelatedVideosList extends React.Component {
    render() {
        const { classes } = this.props

        return (
            <List className={classes.container}>
                {otherMailFolderListItems}
            </List>
        )
    }
}

RelatedVideosList.propTypes = {
    classes: PropTypes.object.isRequired,
    videoId: PropTypes.string.isRequired,
    related: PropTypes.arrayOf(
        VideoPropType
    )
};

export default withStyles(styles)(RelatedVideosList);
