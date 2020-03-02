import React, { Component } from 'react';
import { graphql } from 'react-apollo';

// Queries
import {getAuthorsQuery} from '../queries/queries';

class AddBook extends Component {
    displayAuthors() {
        let data = this.props.data;
        console.log(data);
        
        if(data.loading) {
            return (
                <option disabled>Loading Authors...</option>
            );
        } else {
            return data.authors.map(author => {
                return (
                    <option key={author._id} value={author._id}>{author.name}</option>
                );
            });
        }
    }

    render() {
        return(
            <form id="add-book">
                <div className="field">
                    <label>Book Name:</label>
                    <input type="text"/>
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text"/>
                </div>
                <div className="field">
                    <label>Author</label>
                    <select>
                        <option>Select Author</option>
                        {this.displayAuthors()}
                    </select>
                </div>

                <button>Add</button>
            </form>
        );
    }
}

export default graphql(getAuthorsQuery)(AddBook);
