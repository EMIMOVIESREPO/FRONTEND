const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 80;
const HOST = process.env.HOST || 'localhost';

const app = express();

app.use('/', express.static(path.join(__dirname, 'angular/browser')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'angular', 'browser', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
