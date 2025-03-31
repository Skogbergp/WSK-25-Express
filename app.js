import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
app.get('/api/v1/cat', (req, res) => {
  const cat = {
    id: 1,
    name: 'Fluffy',
    birthdate: '2020-01-01',
    weight: 4.5,
    owner: 'John Doe',
    Image: 'https://loremflickr.com/320/240/cat',
  };
  res.send(cat);
});

app.use('/public', express.static('public'));
