import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000';

async function testEndpoints() {
  console.log('🧪 Testing API Endpoints...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);

    // Test auth register
    console.log('\n2. Testing user registration...');
    const registerResponse = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      })
    });
    
    if (registerResponse.ok) {
      const registerData = await registerResponse.json();
      console.log('✅ Registration successful:', registerData);
      
      // Test login
      console.log('\n3. Testing login...');
      const loginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123'
        })
      });
      
      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        console.log('✅ Login successful:', loginData);
        
        const token = loginData.token;
        
        // Test get blogs
        console.log('\n4. Testing get blogs...');
        const blogsResponse = await fetch(`${BASE_URL}/api/blogs`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (blogsResponse.ok) {
          const blogsData = await blogsResponse.json();
          console.log('✅ Get blogs successful:', blogsData);
        } else {
          console.log('❌ Get blogs failed:', blogsResponse.status);
        }
        
        // Test create blog
        console.log('\n5. Testing create blog...');
        const createBlogResponse = await fetch(`${BASE_URL}/api/blogs`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            title: 'Test Blog Post',
            content: 'This is a test blog post content',
            tags: ['test', 'blog']
          })
        });
        
        if (createBlogResponse.ok) {
          const blogData = await createBlogResponse.json();
          console.log('✅ Create blog successful:', blogData);
        } else {
          console.log('❌ Create blog failed:', createBlogResponse.status);
        }
        
      } else {
        console.log('❌ Login failed:', loginResponse.status);
      }
    } else {
      console.log('❌ Registration failed:', registerResponse.status);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testEndpoints(); 