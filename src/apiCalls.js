export const apiCalls = {

  async getOrders() {
  let response = await fetch('http://localhost:3001/api/v1/orders')
    return await response.json();
  }
  
}