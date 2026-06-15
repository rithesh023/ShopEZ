import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const username = localStorage.getItem('username')
  const isAdmin = localStorage.getItem('isAdmin')

  return (
    <nav style={{
      backgroundColor: '#1a1a2e',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
    }}>
      <h1
        onClick={() => navigate('/')}
        style={{ color: '#e94560', margin: 0, cursor: 'pointer', fontSize: '24px' }}
      >
        🛍️ ShopEZ
      </h1>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <button onClick={() => navigate('/products')}
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '15px' }}>
          Products
        </button>
        <button onClick={() => navigate('/cart')}
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '15px' }}>
          🛒 Cart
        </button>
        {username ? (
          <>
            <button onClick={() => navigate('/profile')}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '15px' }}>
              👤 {username}
            </button>
            <button onClick={() => navigate('/admin-login')}
              style={{ backgroundColor: '#e94560', border: 'none', color: 'white', cursor: 'pointer', fontSize: '13px', padding: '6px 14px', borderRadius: '5px' }}>
              Admin
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')}
              style={{ backgroundColor: '#e94560', border: 'none', color: 'white', cursor: 'pointer', fontSize: '14px', padding: '8px 20px', borderRadius: '5px' }}>
              Login
            </button>
            <button onClick={() => navigate('/register')}
              style={{ backgroundColor: 'white', border: 'none', color: '#1a1a2e', cursor: 'pointer', fontSize: '14px', padding: '8px 20px', borderRadius: '5px' }}>
              Register
            </button>
          </>
        )}
        {isAdmin === 'true' && (
          <button onClick={() => navigate('/admin')}
            style={{ backgroundColor: 'green', border: 'none', color: 'white', cursor: 'pointer', fontSize: '13px', padding: '6px 14px', borderRadius: '5px' }}>
            Dashboard
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar