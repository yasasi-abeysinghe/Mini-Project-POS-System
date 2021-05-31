import React, {Component} from 'react';
import OrderList from './orderList';
import OrderDetails from './orderDetails';


class Orders extends Component {
    state = {
        orderNo: null
    }

    handleOrderSelect = (orderNo) => {
        this.setState({orderNo: orderNo});
        console.log(this.state.orderNo);
    }

    render() {
        if (this.state.orderNo == null) {
            return (
                <div>
                    <OrderList onSelectOrder={this.handleOrderSelect}/>
                </div>);
        }
        else{
            return(
                <OrderDetails orderNo={this.state.orderNo}/>
            );
        }


    }

}

export default Orders;