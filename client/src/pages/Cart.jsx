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

  const placeOrder = async (product) => {
    const address = prompt('Enter your delivery address:')
    if (!address) return
    try {
      await axios.post('http://localhost:8000/api/orders', {
        userId,
        productId: product.productId,
        productName: product.productName,
        price: product.price,
        quantity: product.quantity,
        address,
        paymentMethod: 'UPI'
      })
      alert('Order placed successfully!')
      navigate('/profile')
    } catch (err) {
      console.log(err)
      alert('Error placing order')
    }
  }

  const total = cart?.products?.reduce((sum, p) => sum + p.price * p.quantity, 0)

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>My Cart</h2>
        <button onClick={() => navigate('/products')} style={{ padding: '8px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Continue Shopping
        </button>
      </div>
      {!cart || cart.products?.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '18px' }}>Your cart is empty!</p>
      ) : (
        <>
          {cart.products.map(product => (
            <div key={product._id} style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '10px', padding: '15px', marginBottom: '15px', gap: '15px' }}>
              <img src={product.image} alt={product.productName} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }} />
              <div style={{ flex: 1 }}>
                <h3>{product.productName}</h3>
                <p>Price: ₹{product.price}</p>
                <p>Quantity: {product.quantity}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={() => placeOrder(product)}
                  style={{ padding: '8px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                  Buy Now
                </button>
                <button
                  onClick={() => removeFromCart(product.productId)}
                  style={{ padding: '8px 20px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div style={{ textAlign: 'right', fontSize: '20px', fontWeight: 'bold' }}>
            Total: ₹{total}
          </div>
        </>
      )}
    </div>
  )
}

export default Cart