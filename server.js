const app = require('./app');

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;

app.listen(port); 

console.log(`Listening on port ${port}`);