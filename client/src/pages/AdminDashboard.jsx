import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [activeTab, setActiveTab] = useState('orders')
  const [newProduct, setNewProduct] = useState({
    name: '', description: '', price: '', category: '', image: '', stock: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:8000/api/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.log(err))

    axios.get('http://localhost:8000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err))
  }, [])

  const handleAddProduct = async () => {
    try {
      await axios.post('http://localhost:8000/api/products', {
        ...newProduct,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock)
      })
      alert('Product added successfully!')
      setNewProduct({ name: '', description: '', price: '', category: '', image: '', stock: '' })
      const res = await axios.get('http://localhost:8000/api/products')
      setProducts(res.data)
    } catch (err) {
      console.log(err)
      alert('Error adding product')
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Admin Dashboard</h2>
        <button onClick={() => navigate('/')} style={{ padding: '8px 20px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('orders')}
          style={{ padding: '10px 30px', backgroundColor: activeTab === 'orders' ? 'blue' : '#ccc', color: activeTab === 'orders' ? 'white' : 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          All Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('products')}
          style={{ padding: '10px 30px', backgroundColor: activeTab === 'products' ? 'blue' : '#ccc', color: activeTab === 'products' ? 'white' : 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          All Products ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('addProduct')}
          style={{ padding: '10px 30px', backgroundColor: activeTab === 'addProduct' ? 'blue' : '#ccc', color: activeTab === 'addProduct' ? 'white' : 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Add Product
        </button>
      </div>

      {activeTab === 'orders' && (
        <div>
          <h3>All Orders</h3>
          {orders.length === 0 ? <p>No orders yet!</p> : (
            orders.map(order => (
              <div key={order._id} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '15px', marginBottom: '15px' }}>
                <h4>{order.productName}</h4>
                <p>User ID: {order.userId}</p>
                <p>Price: ₹{order.price}</p>
                <p>Quantity: {order.quantity}</p>
                <p>Address: {order.address}</p>
                <p>Payment: {order.paymentMethod}</p>
                <p>Status: <span style={{ color: 'orange', fontWeight: 'bold' }}>{order.status}</span></p>
                <p style={{ color: '#666', fontSize: '12px' }}>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'products' && (
        <div>
          <h3>All Products</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {products.map(product => (
              <div key={product._id} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '15px', textAlign: 'center' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }} />
                <h4>{product.name}</h4>
                <p>₹{product.price}</p>
                <p>Stock: {product.stock}</p>
                <p>Category: {product.category}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'addProduct' && (
        <div style={{ maxWidth: '500px' }}>
          <h3>Add New Product</h3>
          {['name', 'description', 'price', 'category', 'image', 'stock'].map(field => (
            <input
              key={field}
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={newProduct[field]}
              onChange={(e) => setNewProduct({ ...newProduct, [field]: e.target.value })}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          ))}
          <button
            onClick={handleAddProduct}
            style={{ width: '100%', padding: '10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Add Product
          </button>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard