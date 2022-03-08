import React, { Component } from 'react';
import './App.css';
import {apiCalls} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: [],
      error: ''
    }
  }

  componentDidMount = async() => {
    try {
      let orderInfo = await apiCalls.getorders();
      this.setState({orders: orderInfo})
    }
    catch(error) {
      this.setState({error: error.message})
    }
  }

  render() {
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
