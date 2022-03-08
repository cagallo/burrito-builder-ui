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
    // console.log(deleteIndex)
    const currentOrders = [...this.state.orders]
    console.log(currentOrders)
    const deleteIndex = currentOrders.findIndex(order => order.id === id)
    currentOrders.splice(deleteIndex, 1)
    console.log(currentOrders.splice(deleteIndex, 1))
    try {
      let data = await apiCalls.deleteOrder(id)
      this.setState({ orders: data.orders })
    }
    catch(error) {
      this.setState({ error: error.message })
    }
  }

  render() {
    const orderInfo = this.state.orders.length > 0 && <Orders orders={this.state.orders} deleteUserOrder={this.deleteUserOrder} />
    console.log(this.state.orders)
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={this.addOrder} />
        </header>
        {orderInfo}
      </main>
    );
  }
}


export default App;
