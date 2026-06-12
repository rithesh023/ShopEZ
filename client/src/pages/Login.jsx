import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8000/api/users/login', {
        email, password
      })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('userId', res.data.userId)
      localStorage.setItem('username', res.data.username)
      setMessage('Login successful!')
      setTimeout(() => navigate('/products'), 1500)
    } catch (err) {
      setMessage(err.response.data.message)
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '30px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center' }}>Login to ShopEZ</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <button
        onClick={handleLogin}
        style={{ width: '100%', padding: '10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Login
      </button>
      {message && <p style={{ textAlign: 'center', color: 'green', marginTop: '10px' }}>{message}</p>}
      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        No account? <span onClick={() => navigate('/register')} style={{ color: 'blue', cursor: 'pointer' }}>Register</span>
      </p>
    </div>
  )
}

export default Login