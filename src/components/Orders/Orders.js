import React from 'react';
import './Orders.css';

const Orders = ( props ) => {
  if(!props.orders) {
    return ''
  }
  console.log(typeof props.orders.orders)
  const index = props.orders.index
  const orderEls = props.orders.map(order => {
    return (
      <div className="order" id={order.id} key={index}>
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map(ingredient => {
            return <li key={`${ingredient}_${Date.now()}`}>{ingredient}</li>
          })}
        </ul>
        <button id={order.id} onClick ={(e) => props.deleteUserOrder(e.target.id)}>DELETE</button>
      </div>
    )
  });

  return (
    <section>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;