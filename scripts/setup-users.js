const fetch = require('node-fetch');

async function setupUsers() {
  try {
    console.log('Setting up users...');
    
    const response = await fetch('http://localhost:3004/api/auth/setup-users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        setupKey: 'kdsms-setup-2024'
      })
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('Users setup successfully!');
      console.log(`Created ${data.count} users`);
    } else {
      console.error('Failed to setup users:', data.error);
    }
  } catch (error) {
    console.error('Error running setup:', error);
  }
}

setupUsers(); 