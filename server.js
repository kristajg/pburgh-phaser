require('dotenv').config();

// 3rd party libraries
import open from 'open';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port, () => {
  console.log(`Express server listening on port: ${port}`);
  open(`http://localhost:8080/`, { app: { name: 'google chrome' } });
});
