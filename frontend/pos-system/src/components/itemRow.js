import React, {Component} from 'react';
import RemoveItem from './removeItem';
import EditItem from './editItem';


class ItemRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            inputHidden: true,
            newQty: 0
        };
    }

    enableQuantityEdit = () => {
        this.setState({
            inputHidden: !this.state.inputHidden
        })
    }

    _handleUpdateOfNewQuantityInput(unitprice) {
        this.setState({
            newQty : this.refs.quantity.value});
        const quantity = parseInt(this.refs.quantity.value);
        const price = parseInt(unitprice);
        const totalPrice = price * quantity;
        this.refs.totalprice.value = totalPrice;
    }


    render() {
        const labelClass = this.state.inputHidden ? '' : 'hide';
        const inputClass = this.state.inputHidden ? 'hide' : '';
        let item = this.props.itemrow;
        return (
            <tr align="center" key={item.id}>
                <td></td>
                <td>{item.itemName}</td>
                <td>{item.unitPrice}</td>
                <td>
                    <span className={labelClass}>{item.quantity}</span>
                    <input type="number" className={inputClass} min={0} defaultValue={item.quantity} onChange={() => this._handleUpdateOfNewQuantityInput(item.unitPrice)} ref="quantity"/>
                </td>
                <td><span className={labelClass}>{item.unitPrice * item.quantity}</span>

                <span className={inputClass}>
                        <input type="text" readOnly="" className="form-control-plaintext" defaultValue={item.unitPrice * item.quantity} ref="totalprice"/>
                    </span>
                </td>
                <td><EditItem onEditEnable={this.enableQuantityEdit} edititem={item} newqty={this.state.newQty}/></td>
                <td><RemoveItem removeitem={item}/></td>
            </tr>
        );
    }

}

export default ItemRow;