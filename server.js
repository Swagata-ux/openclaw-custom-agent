import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { run } from './openclaw-agent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Serve the chat UI
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle chat messages
app.post('/chat', async (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.json({ response: 'Please provide a message.' });
  }

  console.log(`💬 User: ${message}`);
  
  try {
    const response = await run(message);
    console.log(`🤖 Bot: ${response}`);
    
    res.json({ 
      response: response || 'I could not process that request right now.' 
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.json({ 
      response: 'Sorry, I encountered an error. Please try again.' 
    });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`🚀 OpenClaw Web Interface running at:`);
  console.log(`🌐 http://localhost:${PORT}`);
  console.log(`\n💬 Open your browser and start chatting!`);
});