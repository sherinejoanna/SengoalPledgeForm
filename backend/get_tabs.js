const http = require('http');

http.get('http://127.0.0.1:9222/json', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('Tabs:', JSON.stringify(json, null, 2));
    } catch (e) {
      console.error('Failed to parse JSON:', e.message);
      console.log('Raw data:', data);
    }
  });
}).on('error', (err) => {
  console.error('Error fetching tabs:', err.message);
});
