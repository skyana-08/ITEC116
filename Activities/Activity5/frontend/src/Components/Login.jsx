import { useState } from 'react'
import { apiPost } from "../api"

const Login = ({ onLogin, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear specific field error as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) newErrors.email = "Email required"
    if (!formData.password) newErrors.password = "Password required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError("")

    if (!validateForm()) return

    try {
      const result = await apiPost("/auth/login", formData)

      // Save JWT token in localStorage
      localStorage.setItem("token", result.access_token)

      // Call parent to set currentUser
      onLogin(result.user)

    } catch (err) {
      // If backend sends 401 Unauthorized or other error
      setServerError(err.response?.data?.message || err.message || "Login failed")
    }
  }

  return (
    <div className="form-container">
      <h2>Welcome!</h2>

      {serverError && <div className="error">{serverError}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>

        <button className="btn btn-primary" style={{ width: '100%' }}>Login</button>
      </form>

      <div className="auth-switch">
        Don’t have an account? <a onClick={onSwitchToRegister}>Create one</a>
      </div>
    </div>
  )
}

export default Login
