import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        color: 'white',
        padding: '100px 30px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
          Welcome to <span style={{ color: '#e94560' }}>ShopEZ</span>
        </h1>
        <p style={{ fontSize: '20px', marginBottom: '40px', color: '#ccc' }}>
          Your one-stop destination for effortless online shopping
        </p>
        <button
          onClick={() => navigate('/products')}
          style={{
            padding: '15px 40px',
            backgroundColor: '#e94560',
            color: 'white',
            border: 'none',
            borderRadius: '30px',
            fontSize: '18px',
            cursor: 'pointer',
            marginRight: '15px'
          }}>
          Shop Now 🛍️
        </button>
        <button
          onClick={() => navigate('/register')}
          style={{
            padding: '15px 40px',
            backgroundColor: 'transparent',
            color: 'white',
            border: '2px solid white',
            borderRadius: '30px',
            fontSize: '18px',
            cursor: 'pointer'
          }}>
          Get Started
        </button>
      </div>

      <div style={{ padding: '60px 30px', textAlign: 'center', backgroundColor: 'white' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '40px' }}>Why ShopEZ?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', maxWidth: '900px', margin: '0 auto' }}>
          {[
            { icon: '🛒', title: 'Easy Shopping', desc: 'Browse thousands of products easily' },
            { icon: '🔒', title: 'Secure Checkout', desc: 'Your payments are always safe' },
            { icon: '🚚', title: 'Fast Delivery', desc: 'Get your orders delivered quickly' }
          ].map((item, i) => (
            <div key={i} style={{ padding: '30px', borderRadius: '10px', boxShadow: '0 2px 15px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>{item.icon}</div>
              <h3 style={{ marginBottom: '10px' }}>{item.title}</h3>
              <p style={{ color: '#666' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home