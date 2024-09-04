import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styles from './LoginStyle.module.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  console.log('you have reached login screen')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/login',
        {
          email,
          password,
        }
      )
      localStorage.setItem('token', response.data.token)
      navigate('/')
    } catch (err) {
      setError('Invalid credentials')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screen__content}>
          <form className={styles.login} onSubmit={handleSubmit}>
            <div className={styles.login__field}>
              <i className={`fas fa-user ${styles.login__icon}`}></i>
              <input
                type='email'
                className={styles.login__input}
                placeholder='User name / Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.login__field}>
              <i className={`fas fa-lock ${styles.login__icon}`}></i>
              <input
                type='password'
                className={styles.login__input}
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type='submit' className={styles.button85}>
              <span className={styles.button__text}>Log In Now</span>
              <i className={`fas fa-chevron-right ${styles.button__icon}`}></i>
            </button>
          </form>
          <div className={styles.social_login}>
            <h3>log in via</h3>
            <div className={styles.social_icons}>
              <a
                href='#'
                className={`${styles.social_login__icon} fab fa-instagram`}
              ></a>
              <a
                href='#'
                className={`${styles.social_login__icon} fab fa-facebook`}
              ></a>
              <a
                href='#'
                className={`${styles.social_login__icon} fab fa-twitter`}
              ></a>
            </div>
          </div>
        </div>
        <div className={styles.screen__background}>
          <span
            className={`${styles.screen__background__shape} ${styles.screen__background__shape4}`}
          ></span>
          <span
            className={`${styles.screen__background__shape} ${styles.screen__background__shape3}`}
          ></span>
          <span
            className={`${styles.screen__background__shape} ${styles.screen__background__shape2}`}
          ></span>
          <span
            className={`${styles.screen__background__shape} ${styles.screen__background__shape1}`}
          ></span>
        </div>
      </div>
    </div>
  )
}

export default Login
