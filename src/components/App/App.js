import React, { Component } from 'react';
import './App.css';
import {apiCalls} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      orders: [],
      error: ''
    }
  }

  componentDidMount = async() => {
    try {
      let orderInfo = await apiCalls.getOrders();
      this.setState({orders: orderInfo.orders})
    }
    catch(error) {
      this.setState({error: error.message})
    }
  }

  addOrder = userOrder => this.setState({orders: [...this.state.orders, userOrder]})

  deleteUserOrder = async(id) =>  {
    try {
      await apiCalls.deleteOrder(id)
      let orderData = await apiCalls.getOrders()
      this.setState({ orders: orderData.orders })
    }
    catch(error) {
      this.setState({ error: error.message })
    }
  }

  render() {
    const orderInfo = this.state.orders.length > 0 && <Orders orders={this.state.orders} deleteUserOrder={this.deleteUserOrder} />
    return (
      <main className="App">
        <header>
          <h1 className='header'>Burrito Builder</h1>
          <OrderForm addOrder={this.addOrder} />
        </header>
        {orderInfo}
      </main>
    );
  }
}


export default App;
