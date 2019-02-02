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
        let url = 'http://localhost:8080/api/auth/items/' + id;

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

        let get_order = 'http://localhost:8080/api/auth/orders?orderNo=' + this.props.removeitem.orderNo;
        let order_id;

        fetch(get_order, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    order_id = result.id;
                    console.log(order_id);
                    let update_order = 'http://localhost:8080/api/auth/orders/' + order_id;
                    fetch(update_order, {
                        method: 'put',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            "orderNo": result.orderNo,
                            "createdDate": result.createdDate,
                            "completedDate": result.completedDate,
                            "status": result.status,
                            "subTotal": parseInt(result.subTotal) - (parseInt(parseInt(this.props.removeitem.quantity) * (parseInt(this.props.removeitem.unitPrice))))
                        })
                    })
                        .then(function (response) {
                                if (response.ok) {
                                    console.log('update success!');
                                } else {
                                    console.log(response);
                                }
                            }
                        );
                },
                (error) => {
                    console.log(error);
                }
            )
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
                    onClick={() => this.confirmRemove(this.props.removeitem.id)}>
                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                <span><strong> Remove</strong></span>
            </button>
        );
    }

}

export default RemoveItem;