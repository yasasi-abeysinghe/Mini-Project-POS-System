import React, {Component} from 'react';


class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            orders: []
        };
    }

    componentDidMount() {
        let url = 'http://localhost:8080/orders';

        fetch(url, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        orders: result
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

    render() {
        const {error, isLoaded, orders} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="container order-list-container">
                    <table className="table table-hover">
                        <thead>
                        <tr className="table-active" align="center">
                            <th scope="col">Order Number</th>
                            <th scope="col">Created Date</th>
                            <th scope="col">Completed Date</th>
                            <th scope="col">Total Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map(order => (
                            <tr align="center" key={order.orderNo}>
                                <th scope="row">{order.orderNo}</th>
                                <td>{order.createdDate}</td>
                                <td>{order.completedDate}</td>
                                <td>{order.subTotal}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            );
        }
    }

}

export default OrderList;





