import React, {Component} from 'react';
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'


// Remove item button component
class RemoveItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // Remove the selected item from the database
    removeItem(id) {
        let url = 'http://localhost:8080/items/' + id;

        fetch(url, {
            method: 'DELETE'
        })
            .then(function (response) {
                    if (response.ok) {
                        console.log('success!');
                    } else {
                        console.log(response);
                    }
                }
            );
    }

    //Confirm the remove action
    confirmRemove = (id) => {
        confirmAlert({
            title: 'Remove Item',
            message: 'Are you sure to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.removeItem(id) //remove the item when the 'Yes' button is clicked
                },
                {
                    label: 'No'
                }
            ]
        })
    };


    render() {
        return (
            <button className="btn btn-danger a-btn-slide-text"
                    onClick={() => this.confirmRemove(this.props.removeitemid)}>
                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                <span><strong> Remove</strong></span>
            </button>
        );
    }

}

export default RemoveItem;