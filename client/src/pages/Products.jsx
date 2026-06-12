import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Products() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:8000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err))
  }, [])

  const addToCart = async (product) => {
    const userId = localStorage.getItem('userId')
    if (!userId) {
      alert('Please login first!')
      navigate('/login')
      return
    }
    try {
      await axios.post('http://localhost:8000/api/cart', {
        userId,
        productId: product._id,
        productName: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
      })
      alert('Added to cart successfully!')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div style={{ padding: '30px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '30px', color: '#1a1a2e' }}>
        Our Products
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', maxWidth: '1100px', margin: '0 auto' }}>
        {products.map(product => (
          <div key={product._id} style={{
            backgroundColor: 'white',
            borderRadius: '15px',
            overflow: 'hidden',
            boxShadow: '0 3px 15px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s'
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '220px', objectFit: 'cover' }}
            />
            <div style={{ padding: '20px' }}>
              <h3 style={{ marginBottom: '8px', color: '#1a1a2e' }}>{product.name}</h3>
              <p style={{ color: '#666', fontSize: '13px', marginBottom: '12px' }}>{product.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#e94560' }}>₹{product.price}</span>
                <span style={{ fontSize: '12px', color: '#888', backgroundColor: '#f0f0f0', padding: '4px 10px', borderRadius: '20px' }}>
                  {product.category}
                </span>
              </div>
              <button
                onClick={() => addToCart(product)}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#1a1a2e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '15px'
                }}>
                🛒 Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products