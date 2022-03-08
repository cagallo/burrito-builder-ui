import React, { Component } from 'react';
import { apiCalls } from '../../apiCalls'

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
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
    const newOrder = {
      name: this.state.name,
      ingredients: this.state.ingredients
    }
    await apiCalls.postOrder(newOrder)
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
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

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
