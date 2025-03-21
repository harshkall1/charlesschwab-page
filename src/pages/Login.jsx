import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import header from '../assets/header.png';
import banner from '../assets/banner.png';
import body from '../assets/body.png';
import Loader from '../components/loader/Loader';
import { MdKeyboardArrowRight } from 'react-icons/md';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/user/login`, {
        username,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert('Login successful!');
      navigate('/account');
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response?.data?.message || error.message || 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-main">
      <img src={header} alt="Header" className="login-header-img" />
      <div className="login-hero">

        <div className="login-form-area">
          <div className="login-box">


            {/* Error Message */}
            {errorMessage && (
              <p
                className="login-error-message"
                style={{
                  color: '#d32f2f',
                  fontSize: '14px',
                  marginTop: '10px',
                  textAlign: 'center',
                  padding: '12px',
                  backgroundColor: '#ffebee',
                  border: '1px solid #ffcdd2',
                  borderRadius: '8px',
                  fontWeight: '500',
                  lineHeight: '1.5',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                {errorMessage}
              </p>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin}>


              <div className="login-input-group">

                <select className='login-input-field' name="summary" id="select">
                  <option value="0: Object"> Accounts Summary  </option>
                  <option value="1: Object"> Account Balances  </option>
                  <option value="2: Object"> Positions  </option>
                  <option value="3: Object"> Trade Ticket  </option>
                  <option value="4: Object"> History  </option>
                  <option value="5: Object"> Stock &amp; ETF Trading  </option>
                  <option value="6: Object"> Options Trading  </option>
                  <option value="7: Object"> Mutual Fund Trading  </option>
                  <option value="8: Object"> Bond Trading  </option>
                  <option value="9: Object"> Research  </option>
                  <option value="10: Object"> Order Status  </option>
                  <option value="11: Object"> Watchlist  </option>

                </select>


                <p href="#" style={{
                  fontSize: "12px",
                  width: "100%"
                }}> <a href="#">First time user</a> | <a href="#"> SchwabSafe </a></p>

              </div>



              <div className="login-input-group">
                <input
                  type="text"
                  className="login-input-field"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder='Username'
                />

                <div className="logincheckbox-area">

                  <input
                    type="checkbox"
                    className="login-input-checkbox"
                    id="rememberMe"
                  />
                  <label htmlFor="rememberMe" className="login-input-label">
                    Remember me
                  </label>
                </div>
              </div>






              <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}>

                <div className="row" style={{
                  display: "flex",
                  gap: "20px",
                }}>
                  <div className="login-input-group">
                    <input
                      type="password"
                      className="login-input-field"
                      value={password}
                      placeholder='Password'
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button style={{}} className="login-sign-in-btn" type="submit" disabled={loading}>
                    {loading ? <Loader /> : 'Sign in'}
                  </button>

                </div>

                <p href="#" style={{
                  fontSize: "12px",
                  padding: "5px",
                  textAlign: "right",
                  width: "100%"
                }}> Forgot <a href="#"> User ID</a> or <a href="#"> password </a>?</p>

              </div>
            </form>

          </div>
        </div>
      </div>
      <br />
      <img src={body} alt="Footer" className="login-body-img" />
    </main>
  );
}

export default Login;