import React from 'react';
import PropTypes from 'prop-types';

import update from 'immutability-helper';

import { withStyles } from '@material-ui/core/styles';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';

import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
    container: {
        display: 'flex',
        flex: 0.5,
    },
    input: {
        margin: theme.spacing.unit,
        flex: 1
    },
})

class SearchBar extends React.Component {
    state = {
        search: {
            subject: '',
            selected: -1
        }
    };

    handleSearch = event => {
        event.preventDefault()

        const subject = this.state.search.subject.trim()
        if(subject !== '')
            this.props.onSearch( subject )
    }

    updateSearch = event => {
        this.setState( update(this.state, 
            {search: 
                {subject: 
                    {$set: event.target.value }
            }}))
    }

    render() {
        const { classes } = this.props;

        return (
            <FormControl className={classes.container}>
                <Input
                    type="search"
                    value={this.state.search.subject}
                    className={classes.input}
                    onChange={this.updateSearch}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton onClick={this.handleSearch}><SearchIcon /></IconButton>
                        </InputAdornment>
                    }
                    inputProps={{
                        'aria-label': 'Search',
                    }}
                />
            </FormControl >
        );
    }
}

SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
    searchItems: PropTypes.arrayOf( 
        PropTypes.shape({
            id:          PropTypes.string.isRequired,
            title:       PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            author:      PropTypes.string.isRequired,
            thumbnail:   PropTypes.string.isRequired
        })
    ),
    onSearch: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchBar);