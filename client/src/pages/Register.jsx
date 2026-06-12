import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:8000/api/users/register', {
        username, email, password
      })
      setMessage(res.data.message)
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      setMessage(err.response.data.message)
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '30px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center' }}>Create Account</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
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
        onClick={handleRegister}
        style={{ width: '100%', padding: '10px', backgroundColor: 'orange', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Register
      </button>
      {message && <p style={{ textAlign: 'center', color: 'green', marginTop: '10px' }}>{message}</p>}
      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        Already have an account? <span onClick={() => navigate('/login')} style={{ color: 'blue', cursor: 'pointer' }}>Login</span>
      </p>
    </div>
  )
}

export default Register