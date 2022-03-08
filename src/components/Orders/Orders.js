import React from 'react';
import './Orders.css';

const Orders = ( props ) => {
  if(!props.orders) {
    return ''
  }
  const orderEls = props.orders.map(order => {
    return (
      <div className="order" id={order.id} key={order.id}>
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map(ingredient => {
            return <li key={`${ingredient}_${Date.now()}`}>{ingredient}</li>
          })}
        </ul>
        <button className='delete-button' id={order.id} onClick ={(e) => props.deleteUserOrder(e.target.id)}>DELETE</button>
      </div>
    )
  });

  return (
    <section className='order-container'>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;