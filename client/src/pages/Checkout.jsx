import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

function Checkout() {
  const navigate = useNavigate()
  const location = useLocation()
  const product = location.state?.product
  const userId = localStorage.getItem('userId')

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'UPI'
  })
  const [upiId, setUpiId] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleNext = () => {
    if (!form.fullName || !form.phone || !form.address || !form.city || !form.pincode) {
      alert('Please fill all address fields!')
      return
    }
    setStep(2)
  }

  const handlePlaceOrder = async () => {
    if (form.paymentMethod === 'UPI' && !upiId) {
      alert('Please enter UPI ID!')
      return
    }
    if (form.paymentMethod === 'Card' && (!cardNumber || !cardExpiry || !cardCvv)) {
      alert('Please enter card details!')
      return
    }
    setLoading(true)
    try {
      await axios.post('http://localhost:8000/api/orders', {
        userId,
        productId: product.productId,
        productName: product.productName,
        price: product.price,
        quantity: product.quantity,
        address: `${form.address}, ${form.city}, ${form.pincode}`,
        paymentMethod: form.paymentMethod
      })
      setStep(3)
    } catch (err) {
      alert('Error placing order!')
    }
    setLoading(false)
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>No product selected!</h2>
        <button onClick={() => navigate('/cart')} style={{ padding: '10px 30px', backgroundColor: '#1a1a2e', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Go to Cart
        </button>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '30px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Progress bar */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
          {['Delivery Address', 'Payment', 'Confirmed'].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                backgroundColor: step > i ? '#1a1a2e' : step === i + 1 ? '#e94560' : '#ddd',
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', fontWeight: 'bold', flexShrink: 0
              }}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span style={{ marginLeft: '8px', fontSize: '13px', color: step === i + 1 ? '#e94560' : '#888', fontWeight: step === i + 1 ? '500' : 'normal' }}>
                {s}
              </span>
              {i < 2 && <div style={{ flex: 1, height: '2px', backgroundColor: step > i + 1 ? '#1a1a2e' : '#ddd', margin: '0 10px' }}></div>}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '20px' }}>

          {/* Left side */}
          <div>
            {/* Step 1 - Address */}
            {step === 1 && (
              <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
                <h3 style={{ marginBottom: '20px', color: '#1a1a2e' }}>📦 Delivery Address</h3>
                {[
                  { name: 'fullName', placeholder: 'Full Name' },
                  { name: 'phone', placeholder: 'Phone Number' },
                  { name: 'address', placeholder: 'Street Address' },
                  { name: 'city', placeholder: 'City' },
                  { name: 'pincode', placeholder: 'Pincode' }
                ].map(field => (
                  <input
                    key={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                ))}
                <button
                  onClick={handleNext}
                  style={{ width: '100%', padding: '14px', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '500' }}>
                  Continue to Payment →
                </button>
              </div>
            )}

            {/* Step 2 - Payment */}
            {step === 2 && (
              <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
                <h3 style={{ marginBottom: '20px', color: '#1a1a2e' }}>💳 Payment Method</h3>

                {/* Payment options */}
                {['UPI', 'Card', 'Cash on Delivery'].map(method => (
                  <div
                    key={method}
                    onClick={() => setForm({ ...form, paymentMethod: method })}
                    style={{
                      border: `2px solid ${form.paymentMethod === method ? '#e94560' : '#ddd'}`,
                      borderRadius: '8px', padding: '14px', marginBottom: '12px',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px',
                      backgroundColor: form.paymentMethod === method ? '#fff5f7' : 'white'
                    }}>
                    <div style={{
                      width: '18px', height: '18px', borderRadius: '50%',
                      border: `2px solid ${form.paymentMethod === method ? '#e94560' : '#ddd'}`,
                      backgroundColor: form.paymentMethod === method ? '#e94560' : 'white',
                      flexShrink: 0
                    }}></div>
                    <span style={{ fontSize: '15px', fontWeight: '500' }}>
                      {method === 'UPI' ? '📱 UPI' : method === 'Card' ? '💳 Credit / Debit Card' : '💵 Cash on Delivery'}
                    </span>
                  </div>
                ))}

                {/* UPI input */}
                {form.paymentMethod === 'UPI' && (
                  <div style={{ marginTop: '15px' }}>
                    <input
                      placeholder="Enter UPI ID (e.g. rithesh@upi)"
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' }}
                    />
                  </div>
                )}

                {/* Card inputs */}
                {form.paymentMethod === 'Card' && (
                  <div style={{ marginTop: '15px' }}>
                    <input
                      placeholder="Card Number (16 digits)"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      maxLength={16}
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', marginBottom: '10px', boxSizing: 'border-box' }}
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <input
                        placeholder="Expiry (MM/YY)"
                        value={cardExpiry}
                        onChange={e => setCardExpiry(e.target.value)}
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }}
                      />
                      <input
                        placeholder="CVV"
                        value={cardCvv}
                        onChange={e => setCardCvv(e.target.value)}
                        maxLength={3}
                        type="password"
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }}
                      />
                    </div>
                  </div>
                )}

                {/* COD message */}
                {form.paymentMethod === 'Cash on Delivery' && (
                  <div style={{ marginTop: '15px', padding: '12px', backgroundColor: '#f0fff4', borderRadius: '8px', color: '#2d7a4f', fontSize: '13px' }}>
                    ✅ You will pay when the order is delivered to your address.
                  </div>
                )}

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                  <button
                    onClick={() => setStep(1)}
                    style={{ flex: 1, padding: '14px', backgroundColor: '#ddd', color: '#333', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>
                    ← Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    style={{ flex: 2, padding: '14px', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '500' }}>
                    {loading ? 'Placing Order...' : '🛒 Place Order'}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 - Success */}
            {step === 3 && (
              <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '40px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', textAlign: 'center' }}>
                <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎉</div>
                <h2 style={{ color: '#1a1a2e', marginBottom: '10px' }}>Order Placed Successfully!</h2>
                <p style={{ color: '#666', marginBottom: '5px' }}>Thank you for shopping with ShopEZ!</p>
                <p style={{ color: '#666', marginBottom: '25px' }}>Your order will be delivered to <b>{form.address}, {form.city}</b></p>
                <p style={{ color: '#888', fontSize: '13px', marginBottom: '25px' }}>Payment Method: <b>{form.paymentMethod}</b></p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <button
                    onClick={() => navigate('/profile')}
                    style={{ padding: '12px 30px', backgroundColor: '#1a1a2e', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                    View My Orders
                  </button>
                  <button
                    onClick={() => navigate('/products')}
                    style={{ padding: '12px 30px', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right side - Order summary */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', height: 'fit-content' }}>
            <h3 style={{ marginBottom: '15px', color: '#1a1a2e' }}>Order Summary</h3>
            <img src={product.image} alt={product.productName} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }} />
            <h4 style={{ marginBottom: '8px' }}>{product.productName}</h4>
            <p style={{ color: '#888', fontSize: '13px', marginBottom: '15px' }}>Quantity: {product.quantity}</p>
            <hr style={{ border: 'none', borderTop: '1px solid #eee', marginBottom: '15px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
              <span style={{ color: '#666' }}>Price</span>
              <span>₹{product.price}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
              <span style={{ color: '#666' }}>Delivery</span>
              <span style={{ color: 'green' }}>FREE</span>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '10px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px' }}>
              <span>Total</span>
              <span style={{ color: '#e94560' }}>₹{product.price * product.quantity}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Checkout