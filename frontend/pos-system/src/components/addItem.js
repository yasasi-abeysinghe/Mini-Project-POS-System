import React, {Component} from 'react';


// Add item table row component
class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputHidden: true,
            data: require('./data/items.json')
        };
        this._handleUpdateOfItemList = this._handleUpdateOfItemList.bind(this);
        this._handleUpdateOfQuantityInput = this._handleUpdateOfQuantityInput.bind(this);
    }

    enableInput = () => {
        this.setState({
            inputHidden: !this.state.inputHidden
        })
    };

    // return the unit price of the selected item
    getUnitPrice(itemName) {
        let price = 0;
        this.state.data.map(item => (item.name === itemName) ? price = item.unitPrice : null);
        return price;
    }

    // handle the changes in item list
    _handleUpdateOfItemList(e) {
        e.preventDefault();
        const price = this.getUnitPrice(e.target.value);
        const quantity = parseInt(this.refs.qty.value);
        const totalPrice = price * quantity;

        this.refs.unitprice.value = price;   // set the unit price in the input box when an item is selected from the dropdown
        this.refs.totalprice.value = totalPrice; // modify the total price as the unit price changes
    }

    // handle the changes in quantity input
    _handleUpdateOfQuantityInput(e) {
        if (e.target.validity.valid) {
            this.setState({inputValue: e.target.value});
        }
        const quantity = parseInt(this.refs.qty.value);
        const price = parseInt(this.refs.unitprice.value);
        const totalPrice = price * quantity;
        this.refs.totalprice.value = totalPrice;

    }

    // add the item to the database when the save button is clicked
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
                "unitPrice": this.refs.unitprice.value,
                "orderNo": this.props.additemorderno
            })
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


    render() {
        const inputClass = this.state.inputHidden ? 'hide' : '';
        const sign = this.state.inputHidden ? 'glyphicon glyphicon-plus' : 'glyphicon glyphicon-minus';
        const buttonLabel = this.state.inputHidden ? 'Add New' : 'Remove';
        const key = 'name';
        return (
            <tr>
                <td>
                    <button className="btn btn-primary a-btn-slide-text btn-add" onClick={this.enableInput}>
                        <span className={sign} aria-hidden="true"> </span> {buttonLabel}
                    </button>
                </td>
                <td>
                    <select key={key} className={inputClass} onChange={this._handleUpdateOfItemList} ref="itemName">
                        <option defaultValue="">Select Item</option>
                        {this.state.data.map(({[key]: value}) => <option key={value}>{value}</option>)}
                    </select>
                </td>
                <td>
                    <span className={inputClass}>
                        <input type="text" readOnly="" className="form-control-plaintext" ref="unitprice" defaultValue="0.00"/>
                    </span>
                </td>
                <td>
                    <input type="number" className={inputClass} defaultValue="0" min={0} onChange={this._handleUpdateOfQuantityInput} ref="qty"/>
                </td>
                <td>
                    <span className={inputClass}>
                        <input type="text" readOnly="" className="form-control-plaintext" defaultValue="0.00" ref="totalprice"/>
                    </span>
                </td>
                <td> </td>
                <td>
                    <span className={inputClass}>
                        <button type="button" className="btn btn-primary btn-save" onClick={() => this.addItem()}>
                            <strong>Save</strong>
                        </button>
                    </span>
                </td>
            </tr>
        );
    }

}

export default AddItem;