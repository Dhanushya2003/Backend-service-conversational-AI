// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // use your API key here
});

// Chat endpoint
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: userMessage }],
      model: 'gpt-3.5-turbo', // or 'gpt-4' if available
    });

    const reply = completion.choices[0].message.content.trim();
    res.json({ reply });
  } catch (error) {
    console.error("Error with OpenAI:", error.message);
    res.json({ reply: "Sorry, I'm having trouble responding right now." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🤖 Server running at http://localhost:${PORT}`);
});
