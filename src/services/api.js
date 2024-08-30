// src/services/api.js

import axios from 'axios'

// Set the base URL for all axios requests
axios.defaults.baseURL = 'http://localhost:3000/' // Replace with your actual backend URL

export default axios
