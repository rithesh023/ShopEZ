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
    fetchOrders()
  }, [])

  const fetchOrders = () => {
    axios.get(`http://localhost:8000/api/orders/${userId}`)
      .then(res => setOrders(res.data))
      .catch(err => console.log(err))
  }

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return
    try {
      await axios.put(`http://localhost:8000/api/orders/cancel/${orderId}`)
      alert('Order cancelled successfully!')
      fetchOrders()
    } catch (err) {
      alert(err.response?.data?.message || 'Error cancelling order')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
    navigate('/login')
  }

  const getStatusColor = (status) => {
    if (status === 'Pending') return '#f59e0b'
    if (status === 'Cancelled') return '#e94560'
    if (status === 'Delivered') return '#10b981'
    return '#888'
  }

  return (
    <div style={{ padding: '30px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Profile header */}
        <div style={{
          backgroundColor: '#1a1a2e',
          borderRadius: '12px',
          padding: '25px',
          marginBottom: '25px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              width: '55px', height: '55px', borderRadius: '50%',
              backgroundColor: '#e94560',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '22px', fontWeight: 'bold', color: 'white'
            }}>
              {username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style={{ color: 'white', margin: 0 }}>Welcome, {username}!</h2>
              <p style={{ color: '#888', margin: '4px 0 0', fontSize: '13px' }}>Your orders and profile</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => navigate('/products')}
              style={{ padding: '8px 20px', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Shop More
            </button>
            <button
              onClick={handleLogout}
              style={{ padding: '8px 20px', backgroundColor: 'transparent', color: 'white', border: '1px solid #555', borderRadius: '8px', cursor: 'pointer' }}>
              Logout
            </button>
          </div>
        </div>

        {/* Orders section */}
        <h3 style={{ marginBottom: '15px', color: '#1a1a2e' }}>My Orders ({orders.length})</h3>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px', backgroundColor: 'white', borderRadius: '12px' }}>
            <div style={{ fontSize: '50px', marginBottom: '15px' }}>📦</div>
            <h3 style={{ color: '#666' }}>No orders yet!</h3>
            <button
              onClick={() => navigate('/products')}
              style={{ marginTop: '15px', padding: '10px 30px', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Start Shopping
            </button>
          </div>
        ) : (
          orders.map(order => (
            <div key={order._id} style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '15px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
              borderLeft: `4px solid ${getStatusColor(order.status)}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ color: '#1a1a2e', marginBottom: '8px' }}>{order.productName}</h4>
                  <p style={{ color: '#888', fontSize: '13px', marginBottom: '4px' }}>
                    💰 Price: <b style={{ color: '#1a1a2e' }}>₹{order.price}</b>
                  </p>
                  <p style={{ color: '#888', fontSize: '13px', marginBottom: '4px' }}>
                    📦 Quantity: <b style={{ color: '#1a1a2e' }}>{order.quantity}</b>
                  </p>
                  <p style={{ color: '#888', fontSize: '13px', marginBottom: '4px' }}>
                    📍 Address: <b style={{ color: '#1a1a2e' }}>{order.address}</b>
                  </p>
                  <p style={{ color: '#888', fontSize: '13px', marginBottom: '4px' }}>
                    💳 Payment: <b style={{ color: '#1a1a2e' }}>{order.paymentMethod}</b>
                  </p>
                  <p style={{ color: '#888', fontSize: '12px', marginTop: '8px' }}>
                    🕐 Ordered on: {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                  <span style={{
                    padding: '5px 14px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: `${getStatusColor(order.status)}20`,
                    color: getStatusColor(order.status)
                  }}>
                    {order.status}
                  </span>
                  {order.status === 'Pending' && (
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: 'white',
                        color: '#e94560',
                        border: '1px solid #e94560',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '13px'
                      }}>
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Profile