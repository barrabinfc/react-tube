import React from 'react';
import PropTypes from 'prop-types';

import Downshift from 'downshift';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar';
import Fade from '@material-ui/core/Fade';

import SearchIcon from '@material-ui/icons/Search';

import {search} from '../api/youtube.js'


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
        <MenuItem {...itemProps}
            key={suggestion.videoId}
            selected={isHighlighted}
            component="div">
                <Avatar src={suggestion.thumbnails.default.url} />
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

    /** Get videoId of `subject` stored in items */
    getVideoIdOf = ( subject ) => {
        
        let videosMatching = this.state.items.filter( (item) => 
            (item.title.toLowerCase() === subject.toLowerCase())
        ).map(item => item.videoId)

        if(videosMatching) return videosMatching[0]
    }

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

        this.setState( {subject: subject})
        this.searchForVideo(subject)
    }
    
    onSelectedSuggestion = ( selection , what ) => { 
        console.log("Selected Suggestion", selection)
        let suggestedVideoId = this.getVideoIdOf(selection)
        console.log("Suggestion id: ", suggestedVideoId)

        this.setState({selected: suggestedVideoId})
        this.props.onVideoSelect( suggestedVideoId )
    }

    /** Filter top 5 suggestions */
    filterSuggestions = (inputValue) => {
        let count = 0;

        console.log("Search length: ", this.state.items.length)
        return this.state.items.filter(suggestion => {
          const shouldKeep = (count < 5);
                            //suggestion.title.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) 
                            //&& count < 5;
      
          if (shouldKeep)
            count += 1;
      
          return shouldKeep;
        });
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
                                <IconButton onClick={this.searchIconClick}><SearchIcon /></IconButton>
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
                                                    placeholder:    'Search a album',
                                                    id:             'integration-downshift',
                                               })
                            })}                            
                            {isOpen ? (
                                <Fade in>
                                    <Paper className={classes.paper} square>
                                        {this.filterSuggestions(inputValue).map((suggestion, index) =>
                                            renderSuggestion({
                                                suggestion,
                                                index,
                                                itemProps: getItemProps(
                                                    { item: suggestion.title ,
                                                      key:  suggestion.videoId
                                                    }),
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