import React, { Component } from 'react';
import { apiCalls } from '../../apiCalls'

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ingredients: []
    };
  }

  handleNameChange = e => this.setState({ name: e.target.value })

  handleIngredientChange = e => {
    e.preventDefault()
    if (!this.state.ingredients.includes(e.target.name)) { 
      const newIngredients = [...this.state.ingredients, e.target.name]
      this.setState({ingredients: newIngredients})
    }
  }

  handleSubmit = async(e) => {
    e.preventDefault();
    if (this.state.name && this.state.ingredients.length) {
    const incomingOrder = {
      name: this.state.name,
      ingredients: this.state.ingredients
    }
    let newOrder = await apiCalls.postOrder(incomingOrder)
    this.props.addOrder(newOrder)
    }
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button className='ingredient-buttons' key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button className='submit-user-order-button' onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
