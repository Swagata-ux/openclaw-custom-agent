import OpenAI from "openai";
import { exec } from "child_process";
import { promisify } from "util";
import dotenv from "dotenv";

dotenv.config();

const execPromise = promisify(exec);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function executeCommand(cmd = "") {
  try {
    const { stdout, stderr } = await execPromise(cmd, { timeout: 15000 });
    return stderr ? stderr : stdout;
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

const SYSTEM_PROMPT = `You are an expert AI assistant that can execute system commands and provide information.

For LOCAL SYSTEM queries, respond with ONLY the command:
- Disk space: "df -h /"
- List Documents: "ls -la ~/Documents"
- Memory: "vm_stat"
- Time: "date"
- Processes: "ps aux | head -10"

For DOCKER queries, use simple commands:
- Check Docker: "docker --version"
- List containers: "docker ps -a"
- Running containers: "docker ps"
- List images: "docker images"
- Start Docker: "open -a Docker"
- Run hello-world: "docker run hello-world"
- Run nginx: "docker run -d -p 8080:80 --name nginx-test nginx"
- Stop container: "docker stop nginx-test"
- Remove container: "docker rm nginx-test"
- Pull image: "docker pull nginx"

For NEWS/INFO queries, provide helpful responses:
- AI news: "echo 'Latest AI trends: ChatGPT updates, Google Gemini, Microsoft Copilot, OpenAI developments, AI regulation discussions, and new AI startups getting funding.'"
- Food: "echo 'Food suggestions: Order from Zomato/Swiggy - try Pizza, Burger, Sushi, Indian curry, Chinese, Thai, or Italian food!'"

Respond with ONLY the command, nothing else.`;

export async function run(query = "") {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: query },
      ],
      max_tokens: 100,
      temperature: 0.1,
    });

    const command = response.choices[0].message.content.trim();
    console.log(`🤖 AI suggests command: ${command}`);
    
    const result = await executeCommand(command);
    return result;
  } catch (error) {
    console.error("API Error:", error.message);
    return "Sorry, I couldn't process that request.";
  }
}