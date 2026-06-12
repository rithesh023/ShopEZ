import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')
  const username = localStorage.getItem('username')

  useEffect(() => {
    if (!userId) {
      navigate('/login')
      return
    }
    axios.get(`http://localhost:8000/api/orders/${userId}`)
      .then(res => setOrders(res.data))
      .catch(err => console.log(err))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
    navigate('/login')
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Welcome, {username}!</h2>
        <div>
          <button onClick={() => navigate('/products')} style={{ padding: '8px 20px', marginRight: '10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Shop More
          </button>
          <button onClick={handleLogout} style={{ padding: '8px 20px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </div>
      <h3>My Orders</h3>
      {orders.length === 0 ? (
        <p>No orders yet!</p>
      ) : (
        orders.map(order => (
          <div key={order._id} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '15px', marginBottom: '15px' }}>
            <h4>{order.productName}</h4>
            <p>Price: ₹{order.price}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Address: {order.address}</p>
            <p>Payment: {order.paymentMethod}</p>
            <p>Status: <span style={{ color: 'orange', fontWeight: 'bold' }}>{order.status}</span></p>
            <p style={{ color: '#666', fontSize: '12px' }}>Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default Profile