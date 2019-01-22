import React, {Component} from 'react';
import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            inputHidden: true,
            data: require('./data/items.json')
        };
        this._handleUpdate = this._handleUpdate.bind(this);
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

    removeItem(id) {
        let url = 'http://localhost:8080/items/' + id;

        fetch(url, {
            method: 'DELETE'
        })
            .then(function (response) {
                    if (response.ok) {
                        console.log('success!');
                        window.location.reload();
                    } else {
                        console.log(response);
                    }
                }
            );


    }

    addItem() {
        let url = 'http://localhost:8080/items/';

        fetch(url, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "itemName": this.refs.itemName.value,
                "quantity": this.refs.qty.value,
                "unitPrice": this.refs.unitprice.value
            })
        })
            .then(function (response) {
                    if (response.ok) {
                        console.log('success!');
                        window.location.reload();
                    } else {
                        console.log(response);
                    }
                }
            );

    }

    submit = (id) => {
        confirmAlert({
            title: 'Remove Item',
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

    enableInput = () => {
        this.setState({
            inputHidden: !this.state.inputHidden
        })
    };

    getUnitPrice(itemName) {
        let price = 0;
        this.state.data.map(item => (item.name === itemName) ? price = item.unitPrice : null);
        return price;
    }

    setUnitPrice(e) {
        e.preventDefault();
        const price = this.getUnitPrice(e.target.value);
        const quantity = parseInt(this.refs.qty.value);
        this.refs.unitprice.value = price;

        const totalPrice = price * quantity;
        this.refs.totalprice.value = totalPrice;
    }

    _handleUpdate(e) {
        if (e.target.validity.valid) {
            this.setState({inputValue: e.target.value});
        }
        const quantity = parseInt(this.refs.qty.value);
        const price = parseInt(this.refs.unitprice.value);
        const totalPrice = price * quantity;
        this.refs.totalprice.value = totalPrice;

    }

    render() {
        const {error, isLoaded, items} = this.state;
        const inputClass = this.state.inputHidden ? 'hide' : '';
        const sign = this.state.inputHidden ? 'glyphicon glyphicon-plus' : 'glyphicon glyphicon-minus';
        const buttonLabel = this.state.inputHidden ? 'Add New' : 'Remove';
        const key = 'name';
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
                            <th scope="col" className="add-col"></th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Unit Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total Price</th>
                            <th scope="col" className="edit-col"></th>
                            <th scope="col" className="remove-col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map(item => (
                            <tr align="center" key={item.id}>
                                <td></td>
                                <td>{item.itemName}</td>
                                <td>{item.unitPrice}</td>
                                <td>{item.quantity}</td>
                                <td>{item.unitPrice * item.quantity}</td>
                                <td>
                                    <button className="btn btn-primary a-btn-slide-text">
                                        <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
                                        <span><strong>Edit</strong></span>
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-danger a-btn-slide-text"
                                            onClick={() => this.submit(item.id)}>
                                        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                        <span><strong> Remove</strong></span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td>
                                <button className="btn btn-primary a-btn-slide-text btn-add" onClick={this.enableInput}>
                                    <span className={sign} aria-hidden="true"></span> {buttonLabel}</button>
                            </td>
                            <td>
                                <select key={key} className={inputClass} onChange={this.setUnitPrice.bind(this)} ref="itemName">
                                    <option defaultValue="">Select Item</option>
                                    {this.state.data.map(({[key]: value}) => <option key={value}>{value}</option>)}
                                </select>

                            </td>
                            <td>
                            <span className={inputClass}>
                            <input type="text" readOnly="" className="form-control-plaintext"
                                   ref="unitprice" defaultValue="0.00"/></span></td>
                            <td><input type="number" className={inputClass} defaultValue="0"
                                       onChange={this._handleUpdate} ref="qty"/></td>
                            <td><span className={inputClass}><input type="text" readOnly=""
                                                                    className="form-control-plaintext"
                                                                    defaultValue="0.00" ref="totalprice"/></span></td>
                            <td></td>
                            <td>
                                <span className={inputClass}>
                                <button type="button"
                                        className="btn btn-primary btn-save" onClick={() => this.addItem()}><strong>Save</strong></button>
                                </span></td>
                        </tr>
                        </tbody>
                    </table>

                </div>

            );
        }
    }

}

export default OrderDetails;





