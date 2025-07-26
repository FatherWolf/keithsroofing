const https = require('https');
const { exec } = require('child_process');

// Get access token
exec('gcloud auth print-access-token', (error, stdout, stderr) => {
  if (error) {
    console.error('Error getting access token:', error);
    return;
  }
  
  const token = stdout.trim();
  const corsConfig = [{
    "origin": ["*"],
    "method": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    "maxAgeSeconds": 3600,
    "responseHeader": ["Content-Type", "Authorization", "Content-Length", "User-Agent", "X-Requested-With"]
  }];
  
  const data = JSON.stringify(corsConfig);
  
  const options = {
    hostname: 'storage.googleapis.com',
    path: '/storage/v1/b/keithroofing-41fdb.firebasestorage.app?fields=cors',
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };
  
  const req = https.request(options, (res) => {
    console.log('Status:', res.statusCode);
    res.on('data', (chunk) => {
      console.log('Response:', chunk.toString());
    });
  });
  
  req.on('error', (error) => {
    console.error('Error:', error);
  });
  
  req.write(data);
  req.end();
});