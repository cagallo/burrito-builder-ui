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

  render() {
    console.log(this.state.orders)
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm />
        </header>
        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
