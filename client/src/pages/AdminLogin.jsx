import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleAdminLogin = () => {
    if (email === 'admin@shopez.com' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true')
      localStorage.setItem('adminName', 'Admin')
      navigate('/admin')
    } else {
      setMessage('Invalid admin credentials!')
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '30px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: 'white', boxShadow: '0 2px 15px rgba(0,0,0,0.1)' }}>
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <h2 style={{ color: '#1a1a2e' }}>🔐 Admin Login</h2>
        <p style={{ color: '#888', fontSize: '13px' }}>Only authorized admins can access this</p>
      </div>
      <input
        type="email"
        placeholder="Admin Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' }}
      />
      <input
        type="password"
        placeholder="Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' }}
      />
      <button
        onClick={handleAdminLogin}
        style={{ width: '100%', padding: '12px', backgroundColor: '#1a1a2e', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '500' }}>
        Login as Admin
      </button>
      {message && <p style={{ textAlign: 'center', color: 'red', marginTop: '10px' }}>{message}</p>}
      <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '13px', color: '#888' }}>
        Not an admin? <span onClick={() => navigate('/login')} style={{ color: '#e94560', cursor: 'pointer' }}>User Login</span>
      </p>
    </div>
  )
}

export default AdminLogin