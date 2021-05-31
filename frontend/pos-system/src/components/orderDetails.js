import React, {Component} from 'react';
import AddItem from './addItem';
import ItemRow from './itemRow';
import Logout from './logout';


class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    refreshPage() {
        let url = 'http://localhost:8080/api/auth/items?orderNo=' + this.props.orderNo;

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

    goBack(){
        window.location.reload();
    }

    render() {
        this.refreshPage();
        const {error, isLoaded, items} = this.state;
        if (error) {
            return  <div className="alert alert-dismissible alert-danger">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        <strong>Oops!</strong> <b>Unable to load!</b> please try again.
                    </div>;
        } else if (!isLoaded) {
            return  <div className="alert alert-dismissible alert-light">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        <strong>Loading...</strong>
                    </div>;
        } else {
            return (
                <div className="container item-list-container">
                    <span className="container btn-container">
                        <button type="button" className="btn btn-primary" onClick={this.goBack}>Back</button>
                        <span> </span>
                        <Logout/>
                    </span>
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
                            <ItemRow itemrow={item}/>
                        ))}
                        <AddItem additemorderno={this.props.orderNo}/>
                        </tbody>
                    </table>

                </div>

            );
        }
    }

}

export default OrderDetails;





