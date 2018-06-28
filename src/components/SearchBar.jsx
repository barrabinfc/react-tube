import React from 'react';
import PropTypes from 'prop-types';

import update from 'immutability-helper';
import Downshift from 'downshift';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';

import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Fade from '@material-ui/core/Fade';

import SearchIcon from '@material-ui/icons/Search';

import {search} from '../api/youtube.js'
import VideoPropType from './proptypes/Video.js'


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        flexGrow: 1,
        position: 'relative',
        width: '50%',
        margin: '0px auto'
    },
    formControl: {
        display: 'flex',
    },
    paper: {
        position: 'absolute',
        zIndex: 100,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    input: {
        margin: theme.spacing.unit,
        flexWrap: 'wrap'
    },
    avatar: {
        'border-radius': 'none'
    },
    menuItem: {
        margin: `${theme.spacing.unit}px 0`
    }
})

/**
 * Single Video Suggestion item
 */
function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem , classes}) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.title) > -1;
    return (
        <MenuItem className={classes.menuItem} {...itemProps}
            key={suggestion.videoId}
            selected={isHighlighted}
            component="div">
                <Avatar className={classes.avatar} src={suggestion.thumbnails.default.url} />
                <ListItemText primary={suggestion.title} style={{
                    fontWeight: isSelected ? 500 : 400 
                }}/>
        </MenuItem>
    );
}
renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.string,
    suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
    classes: PropTypes.object.isRequired,
};


/**
 * Searchbar with autocomplete
 */
class SearchBar extends React.Component {
    state = {
        subject: '',
        items: [],
        selected: undefined
    };

    searchIconClick = event => {
        event.preventDefault()

        if(this.state.selected) this.props.onVideoSelect(this.state.selected)
    }

    /** Search for video name */
    searchForVideo = (subject) => {
        search(subject).then( (response) => {
            let cleanItems = response.items.map( (item) => ({
                    videoId: item.id.videoId,
                    ...item.snippet
            }) )
            this.setState({ items: cleanItems })
        })
    }

    /** Update search suggestion while you type */
    onChange = (event) => {
        let subject = event.target.value.trim()
        
        if(!subject) return
        this.setState( {subject: event.target.value})
        this.searchForVideo(subject)
    }
    
    onSelectedSuggestion = ( videoId ) => {        
        this.setState({selected: videoId})
        this.props.onVideoSelect(this.state.selected)
    }

    /** Filter top 5 suggestions */
    filterSuggestions = (inputValue) => {
        let count = 0;
      
        return this.state.items.filter(suggestion => {
          const shouldKeep = (!inputValue || 
                            suggestion.title.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) 
                            && count < 5;
      
          if (shouldKeep)
            count += 1;
      
          return shouldKeep;
        });
        console.log("Items length: ", this.state.items.length)
    }
      

    /**
     * Input bar
     */
    renderInput(inputProps){
        const { InputProps, classes, ref, ...other } = inputProps;

        return (
                <TextField
                    InputProps={{
                        inputRef: ref,
                        type: 'search',
                        classes: {
                            root: classes.input,
                        },
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={this.onSelectedSuggestion}><SearchIcon /></IconButton>
                            </InputAdornment>
                        ),
                        ...InputProps,
                    }}
                    {...other}
                />
        );
    }

    render() {
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <Downshift onChange={this.onSelectedSuggestion}>
                    {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex }) => (
                        <div className={classes.container}>
                            {this.renderInput({classes, 
                                               fullWidth: true,
                                               InputProps: getInputProps({
                                                    onChange:       this.onChange,
                                                    placeholder:    'Search a country (start with a)',
                                                    id:             'integration-downshift-simple',
                                               })
                            })}                            
                            {isOpen ? (
                                <Fade in>
                                    <Paper className={classes.paper} square>
                                        {this.filterSuggestions(inputValue).map((suggestion, index) =>
                                            renderSuggestion({
                                                suggestion,
                                                index,
                                                itemProps: getItemProps({ item: suggestion.title }),
                                                highlightedIndex,
                                                selectedItem,
                                                classes
                                            }),
                                        )}
                                    </Paper>
                                </Fade>
                            ) : null}
                        </div>
                    )}
                </Downshift>
            </div>
        )
    }
}


SearchBar.propTypes = {
    classes:        PropTypes.object.isRequired,
    onVideoSelect:  PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchBar);