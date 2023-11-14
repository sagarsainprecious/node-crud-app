const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;
const data = require('./data');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Render the index page
app.get('/', (req, res) => {
  res.render('index', { items: data });
});

// Create a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  data.push(newItem);
  res.json(newItem);
});

// Update an item
app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;

  for (let i = 0; i < data.length; i++) {
    if (data[i].id === itemId) {
      data[i] = { ...data[i], ...updatedItem };
      return res.json(data[i]);
    }
  }

  res.status(404).json({ message: 'Item not found' });
});

// Delete an item
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const index = data.findIndex((item) => item.id === itemId);

  if (index !== -1) {
    const deletedItem = data.splice(index, 1);
    res.json(deletedItem[0]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
