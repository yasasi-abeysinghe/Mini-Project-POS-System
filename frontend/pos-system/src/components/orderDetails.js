import React, {Component} from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        let url = 'http://localhost:8080/items';

        fetch(url, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    removeItem(id){
        let url = 'http://localhost:8080/items/'+id;

        fetch(url, {
            method: 'DELETE'
        })
            .then(function(response) {
                    if (response.ok) {
                        console.log('success!');
                        window.location.reload();
                    }
                    else{
                        console.log(response);
                    }
                }
            );



    }

    submit = (id) => {
        confirmAlert({
            title: 'Remove item from the order',
            message: 'Are you sure to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.removeItem(id)
                },
                {
                    label: 'No'
                }
            ]
        })
    };

    render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="container item-list-container">
                    <table className="table table-hover">
                        <thead>
                        <tr className="table-active" align="center">
                            <th scope="col">Item Name</th>
                            <th scope="col">Unit Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total Price</th>
                            <th scope="col" className="remove-col"> </th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map(item => (
                            <tr align="center" key={item.id}>
                                <td>{item.itemName}</td>
                                <td>{item.unitPrice}</td>
                                <td>{item.quantity}</td>
                                <td>{item.unitPrice * item.quantity}</td>
                                <td><button className="btn btn-danger a-btn-slide-text" onClick={() => this.submit(item.id)}>
                                    <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                    <span><strong> Remove</strong></span>
                                </button> </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            );
        }
    }

}

export default OrderDetails;





