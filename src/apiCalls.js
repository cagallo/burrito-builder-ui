export const apiCalls = {

  async getOrders() {
  let response = await fetch('http://localhost:3001/api/v1/orders')
    return await response.json();
  },

  async postOrder(order) {
    let response = await fetch('http://localhost:3001/api/v1/orders', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return await response.json();
    }
}

export default apiCalls;