const axios = require('axios');

async function testRegister() {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('Registration successful:', response.data);
  } catch (error) {
    console.log('Registration failed:', error.response?.data || error.message);
  }
}

testRegister();