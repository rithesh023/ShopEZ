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
      alert('Error adding to cart')
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>All Products</h2>
        <div>
          <button onClick={() => navigate('/cart')} style={{ padding: '8px 20px', marginRight: '10px', backgroundColor: 'orange', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Cart
          </button>
          <button onClick={() => navigate('/profile')} style={{ padding: '8px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Profile
          </button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {products.map(product => (
          <div key={product._id} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '15px', textAlign: 'center' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
            <h3>{product.name}</h3>
            <p style={{ color: '#666' }}>{product.description}</p>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'green' }}>₹{product.price}</p>
            <button
              onClick={() => addToCart(product)}
              style={{ width: '100%', padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products