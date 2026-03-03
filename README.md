# 🤖 OpenClaw Custom Agent

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-blue.svg)](https://openai.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/Docker-Supported-blue.svg)](https://docker.com/)

A powerful AI assistant that bridges the gap between natural language and system control. Execute system commands, manage Docker containers, and get real-time information through an intuitive chat interface or WhatsApp integration.

## ✨ Features

- 🖥️ **System Control**: Execute macOS/Linux commands through natural language
- 🐳 **Docker Management**: Start Docker, run containers, manage images seamlessly  
- 🌐 **Web Interface**: Clean, responsive chat UI for testing and interaction
- 📱 **WhatsApp Integration**: Control your system remotely via WhatsApp messages
- 🍕 **Smart Responses**: Get food suggestions, AI news, weather, and more
- 🔒 **Secure**: Environment-based API key management
- ⚡ **Fast**: Optimized command execution with proper error handling

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- OpenAI API key
- Docker Desktop (optional, for container management)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/openclaw-custom-agent.git
   cd openclaw-custom-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   # Add your OpenAI API key to .env
   ```

4. **Start the application**
   ```bash
   npm start
   ```
   
   Open http://localhost:3002 in your browser

## 💬 Example Interactions

### System Commands
```
You: "How much disk space is left on my Mac?"
Bot: Shows detailed disk usage with df -h command

You: "List folders in my Documents directory"  
Bot: Executes ls -la ~/Documents and shows results

You: "Show system memory usage"
Bot: Displays vm_stat output with memory statistics
```

### Docker Operations
```
You: "Start Docker and show containers"
Bot: Launches Docker Desktop and lists all containers

You: "Run nginx container on port 8080"
Bot: Executes docker run -d -p 8080:80 nginx

You: "Show running Docker containers"
Bot: Displays docker ps output
```

### General Queries
```
You: "Latest AI news today"
Bot: Provides current AI industry trends and updates

You: "What should I eat for dinner?"
Bot: Suggests food options and delivery platforms
```

## 🏗️ Architecture

```
openclaw-custom-agent/
├── 📁 public/
│   └── index.html          # Web chat interface
├── 🤖 openclaw-agent.js    # Core AI agent logic
├── 🌐 server.js           # Express web server
├── 📱 whatsapp-bot.js     # WhatsApp integration
├── 📦 package.json        # Dependencies & scripts
├── 🔐 .env               # Environment variables
└── 📖 README.md          # Documentation
```

## 🔧 Configuration

### Environment Variables
```env
OPENAI_API_KEY=your_openai_api_key_here
WHATSAPP_TOKEN=your_whatsapp_access_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id  
WHATSAPP_VERIFY_TOKEN=your_verify_token
```

### WhatsApp Setup (Optional)
1. Create Meta Developer account at developers.facebook.com
2. Set up WhatsApp Business API
3. Configure webhook URL: `https://your-domain.com/webhook`
4. Add credentials to `.env` file

## 🛠️ Available Scripts

```bash
npm start          # Start web interface
npm run whatsapp   # Start WhatsApp bot
npm run dev        # Development mode with nodemon
```

## 🔒 Security Features

- ✅ Environment-based API key management
- ✅ Command timeout protection (30s limit)
- ✅ Error handling and sanitization
- ✅ No hardcoded credentials
- ✅ Webhook verification for WhatsApp

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenAI](https://openai.com/) for GPT-4 API
- [Express.js](https://expressjs.com/) for web framework
- [WhatsApp Business API](https://developers.facebook.com/docs/whatsapp) for messaging
- [Docker](https://docker.com/) for containerization support

## 📞 Support

- 🐛 [Report Issues](https://github.com/yourusername/openclaw-custom-agent/issues)
- 💡 [Feature Requests](https://github.com/yourusername/openclaw-custom-agent/discussions)
- 📧 Contact: your.email@example.com

---

⭐ **Star this repo if you find it useful!** ⭐