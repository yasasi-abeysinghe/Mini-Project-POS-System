import React, { Component } from 'react';
// import Login from './components/login';
// import OrderList from './components/orderList';
import OrderDetails from './components/orderDetails';
import './App.css';


class App extends Component {
  render() {
    return (
        <div className="App">
         {/*<OrderList/>*/}
          {/*<Login/>*/}
          <OrderDetails/>
        </div>
    );
  }
}

export default App;
