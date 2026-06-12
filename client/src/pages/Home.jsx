import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to ShopEZ</h1>
      <p>Your one-stop destination for effortless online shopping</p>
      <button 
        onClick={() => navigate('/products')}
        style={{ padding: '10px 30px', margin: '10px', cursor: 'pointer', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>
        Shop Now
      </button>
      <button 
        onClick={() => navigate('/login')}
        style={{ padding: '10px 30px', margin: '10px', cursor: 'pointer', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px' }}>
        Login
      </button>
      <button 
        onClick={() => navigate('/register')}
        style={{ padding: '10px 30px', margin: '10px', cursor: 'pointer', backgroundColor: 'orange', color: 'white', border: 'none', borderRadius: '5px' }}>
        Register
      </button>
    </div>
  )
}

export default Home