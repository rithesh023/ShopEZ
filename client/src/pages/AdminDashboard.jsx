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
  const [editProduct, setEditProduct] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchOrders()
    fetchProducts()
  }, [])

  const fetchOrders = () => {
    axios.get('http://localhost:8000/api/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.log(err))
  }

  const fetchProducts = () => {
    axios.get('http://localhost:8000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err))
  }

  const handleAddProduct = async () => {
    try {
      await axios.post('http://localhost:8000/api/products', {
        ...newProduct,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock)
      })
      alert('Product added successfully!')
      setNewProduct({ name: '', description: '', price: '', category: '', image: '', stock: '' })
      fetchProducts()
    } catch (err) {
      alert('Error adding product')
    }
  }

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    try {
      await axios.delete(`http://localhost:8000/api/products/${productId}`)
      alert('Product deleted successfully!')
      fetchProducts()
    } catch (err) {
      alert('Error deleting product')
    }
  }

  const handleEditClick = (product) => {
    setEditProduct({ ...product })
    setActiveTab('editProduct')
  }

  const handleUpdateProduct = async () => {
    try {
      await axios.put(`http://localhost:8000/api/products/${editProduct._id}`, {
        name: editProduct.name,
        description: editProduct.description,
        price: Number(editProduct.price),
        category: editProduct.category,
        image: editProduct.image,
        stock: Number(editProduct.stock)
      })
      alert('Product updated successfully!')
      setEditProduct(null)
      setActiveTab('products')
      fetchProducts()
    } catch (err) {
      alert('Error updating product')
    }
  }

  const tabStyle = (tab) => ({
    padding: '10px 25px',
    backgroundColor: activeTab === tab ? '#1a1a2e' : '#e0e0e0',
    color: activeTab === tab ? 'white' : 'black',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '13px'
  })

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#1a1a2e' }}>Admin Dashboard</h2>
        <button onClick={() => navigate('/')} style={{ padding: '8px 20px', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', flexWrap: 'wrap' }}>
        <button style={tabStyle('orders')} onClick={() => setActiveTab('orders')}>All Orders ({orders.length})</button>
        <button style={tabStyle('products')} onClick={() => setActiveTab('products')}>All Products ({products.length})</button>
        <button style={tabStyle('addProduct')} onClick={() => setActiveTab('addProduct')}>Add Product</button>
        {editProduct && (
          <button style={tabStyle('editProduct')} onClick={() => setActiveTab('editProduct')}>Edit Product</button>
        )}
      </div>

      {activeTab === 'orders' && (
        <div>
          <h3 style={{ marginBottom: '15px' }}>All Orders</h3>
          {orders.length === 0 ? <p>No orders yet!</p> : (
            orders.map(order => (
              <div key={order._id} style={{ backgroundColor: 'white', border: '1px solid #eee', borderRadius: '10px', padding: '15px', marginBottom: '15px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <h4 style={{ color: '#1a1a2e' }}>{order.productName}</h4>
                <p>User ID: {order.userId}</p>
                <p>Price: ₹{order.price}</p>
                <p>Quantity: {order.quantity}</p>
                <p>Address: {order.address}</p>
                <p>Payment: {order.paymentMethod}</p>
                <p>Status: <span style={{ color: 'orange', fontWeight: 'bold' }}>{order.status}</span></p>
                <p style={{ color: '#999', fontSize: '12px' }}>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'products' && (
        <div>
          <h3 style={{ marginBottom: '15px' }}>All Products</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {products.map(product => (
              <div key={product._id} style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                <div style={{ padding: '15px' }}>
                  <h4 style={{ marginBottom: '5px' }}>{product.name}</h4>
                  <p style={{ color: '#e94560', fontWeight: 'bold', marginBottom: '5px' }}>₹{product.price}</p>
                  <p style={{ fontSize: '12px', color: '#888', marginBottom: '5px' }}>Stock: {product.stock}</p>
                  <p style={{ fontSize: '12px', color: '#888', marginBottom: '15px' }}>Category: {product.category}</p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleEditClick(product)}
                      style={{ flex: 1, padding: '8px', backgroundColor: '#1a1a2e', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      style={{ flex: 1, padding: '8px', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'addProduct' && (
        <div style={{ maxWidth: '500px', backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
          <h3 style={{ marginBottom: '20px' }}>Add New Product</h3>
          {['name', 'description', 'price', 'category', 'image', 'stock'].map(field => (
            <input
              key={field}
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={newProduct[field]}
              onChange={(e) => setNewProduct({ ...newProduct, [field]: e.target.value })}
              style={{ width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }}
            />
          ))}
          <button
            onClick={handleAddProduct}
            style={{ width: '100%', padding: '12px', backgroundColor: '#1a1a2e', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px' }}>
            Add Product
          </button>
        </div>
      )}

      {activeTab === 'editProduct' && editProduct && (
        <div style={{ maxWidth: '500px', backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
          <h3 style={{ marginBottom: '20px' }}>Edit Product</h3>
          {['name', 'description', 'price', 'category', 'image', 'stock'].map(field => (
            <input
              key={field}
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={editProduct[field]}
              onChange={(e) => setEditProduct({ ...editProduct, [field]: e.target.value })}
              style={{ width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }}
            />
          ))}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleUpdateProduct}
              style={{ flex: 1, padding: '12px', backgroundColor: '#1a1a2e', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px' }}>
              Update Product
            </button>
            <button
              onClick={() => { setEditProduct(null); setActiveTab('products') }}
              style={{ flex: 1, padding: '12px', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px' }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard