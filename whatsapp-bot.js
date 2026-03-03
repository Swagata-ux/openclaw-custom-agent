import express from 'express';
import { run } from './openclaw-agent.js';

const app = express();
app.use(express.urlencoded({ extended: false }));

// Test endpoint to verify it works
app.get('/test', async (req, res) => {
  const query = req.query.q || "Get latest AI news";
  const result = await handleQuery(query);
  res.json({ query, response: result });
});

// Twilio WhatsApp webhook
app.post('/whatsapp', async (req, res) => {
  const { Body, From } = req.body;
  
  if (Body) {
    console.log(`📱 WhatsApp message from ${From}: ${Body}`);
    
    const response = await handleQuery(Body);
    
    // Send response back to WhatsApp
    res.set('Content-Type', 'text/xml');
    res.send(`
      <Response>
        <Message>${response}</Message>
      </Response>
    `);
  } else {
    res.set('Content-Type', 'text/xml');
    res.send(`
      <Response>
        <Message>Hi! I'm your OpenClaw assistant. Ask me anything - news, system commands, or any questions! 🤖</Message>
      </Response>
    `);
  }
});

async function handleQuery(userMessage) {
  try {
    // Let OpenClaw agent handle any query
    const result = await run(userMessage);
    
    // Format response for WhatsApp (max 1600 chars)
    if (result && result.length > 1500) {
      return result.substring(0, 1500) + "...\n\n📱 Response truncated for WhatsApp";
    }
    
    return result || "I couldn't process that request right now. Please try again.";
    
  } catch (error) {
    console.error('Error handling query:', error);
    return "Sorry, I encountered an error. Please try again later.";
  }
}

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🤖 OpenClaw WhatsApp Interface running on port ${PORT}`);
  console.log(`📱 Test: http://localhost:${PORT}/test?q=latest AI news`);
  console.log(`🔗 WhatsApp webhook: http://localhost:${PORT}/whatsapp`);
  console.log(`\n💬 You can now ask anything via WhatsApp:`);
  console.log(`   - "Latest AI news today"`);
  console.log(`   - "What's happening with the war?"`);
  console.log(`   - "List files in my home directory"`);
  console.log(`   - "Check my system memory"`);
});