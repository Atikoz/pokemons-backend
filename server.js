import 'dotenv/config'
import express from 'express';
import http from 'http';
import cors from 'cors'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import routes from './routes/apiRoutes.js'
import initializeData from './function/initializeData.js';
import soketHandler from './handler/soketHandler.js';
import { WebSocketServer } from 'ws';
import { getLocalIP } from './function/getLokalIP.js';


const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());
app.use(bodyParser.json());

soketHandler(wss)

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');
    await initializeData()
  }
  )
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api', routes);


server.listen(PORT, async () => {
  const localIP = getLocalIP();
  console.log(`Server running on http://${localIP}:${PORT}`);
});