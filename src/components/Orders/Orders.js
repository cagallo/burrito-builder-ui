import React from 'react';
import './Orders.css';

const Orders = ( props ) => {
  if(!props.orders) {
    return ''
  }
  console.log(typeof props.orders.orders)
  let orderEls = props.orders.map(order => {
    return (
      <div className="order" id={order.id} key={order.id}>
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map(ingredient => {
            return <li key={`${ingredient}_${Date.now()}`}>{ingredient}</li>
          })}
        </ul>
        {/* <button id={order.id} onClick ={(e) => props.deleteOrder(e.target.id)}>DELETE</button> */}
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