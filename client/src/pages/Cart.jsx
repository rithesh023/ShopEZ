import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Cart() {
  const [cart, setCart] = useState(null)
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    if (!userId) {
      navigate('/login')
      return
    }
    axios.get(`http://localhost:8000/api/cart/${userId}`)
      .then(res => setCart(res.data))
      .catch(err => console.log(err))
  }, [])

  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete('http://localhost:8000/api/cart', {
        data: { userId, productId }
      })
      setCart(res.data.cart)
    } catch (err) {
      console.log(err)
    }
  }

  const placeOrder = (product) => {
    navigate('/checkout', { state: { product } })
  }

  const total = cart?.products?.reduce((sum, p) => sum + p.price * p.quantity, 0)

  return (
    <div style={{ padding: '30px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: '#1a1a2e' }}>🛒 My Cart</h2>
          <button
            onClick={() => navigate('/products')}
            style={{ padding: '8px 20px', backgroundColor: '#1a1a2e', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Continue Shopping
          </button>
        </div>

        {!cart || cart.products?.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px', backgroundColor: 'white', borderRadius: '12px' }}>
            <div style={{ fontSize: '50px', marginBottom: '15px' }}>🛒</div>
            <h3 style={{ color: '#666' }}>Your cart is empty!</h3>
            <button
              onClick={() => navigate('/products')}
              style={{ marginTop: '15px', padding: '10px 30px', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Shop Now
            </button>
          </div>
        ) : (
          <>
            {cart.products.map(product => (
              <div key={product._id} style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '15px',
                marginBottom: '15px',
                gap: '15px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
              }}>
                <img
                  src={product.image}
                  alt={product.productName}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '5px', color: '#1a1a2e' }}>{product.productName}</h3>
                  <p style={{ color: '#e94560', fontWeight: 'bold', fontSize: '18px', marginBottom: '4px' }}>₹{product.price}</p>
                  <p style={{ color: '#888', fontSize: '13px' }}>Quantity: {product.quantity}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button
                    onClick={() => placeOrder(product)}
                    style={{ padding: '10px 20px', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>
                    Buy Now
                  </button>
                  <button
                    onClick={() => removeFromCart(product.productId)}
                    style={{ padding: '10px 20px', backgroundColor: '#f5f5f5', color: '#333', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
              textAlign: 'right'
            }}>
              <p style={{ color: '#888', fontSize: '14px', marginBottom: '5px' }}>Total Amount</p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a2e' }}>₹{total}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart