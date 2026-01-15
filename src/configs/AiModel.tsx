import { GoogleGenerativeAI } from "@google/generative-ai";

// AI Model Configuration
export interface AIModel {
  id: string;
  name: string;
  provider: 'gemini' | 'openrouter';
  description: string;
  maxTokens?: number;
  cost?: string;
}

// Available AI Models
export const AI_MODELS: AIModel[] = [
  // Google Gemini Models
  {
    id: 'gemini-2.0-flash',
    name: 'Gemini 2.0 Flash',
    provider: 'gemini',
    description: 'Google\'s latest multimodal AI model',
    maxTokens: 8192,
    cost: 'Free'
  },
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'gemini',
    description: 'Google\'s advanced reasoning model',
    maxTokens: 8192,
    cost: 'Free'
  },
  
  // OpenRouter Models
  {
    id: 'openai/gpt-4o',
    name: 'GPT-4o',
    provider: 'openrouter',
    description: 'OpenAI\'s most capable model',
    maxTokens: 128000,
    cost: '$5.00/1M tokens'
  },
  {
    id: 'openai/gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'openrouter',
    description: 'Fast and efficient GPT-4 model',
    maxTokens: 128000,
    cost: '$0.15/1M tokens'
  },
  {
    id: 'anthropic/claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'openrouter',
    description: 'Anthropic\'s most capable model',
    maxTokens: 200000,
    cost: '$3.00/1M tokens'
  },
  {
    id: 'anthropic/claude-3-haiku',
    name: 'Claude 3 Haiku',
    provider: 'openrouter',
    description: 'Fast and efficient Claude model',
    maxTokens: 200000,
    cost: '$0.25/1M tokens'
  },
  {
    id: 'meta-llama/llama-3.1-405b-instruct',
    name: 'Llama 3.1 405B',
    provider: 'openrouter',
    description: 'Meta\'s largest open-source model',
    maxTokens: 128000,
    cost: '$2.70/1M tokens'
  },
  {
    id: 'meta-llama/llama-3.1-70b-instruct',
    name: 'Llama 3.1 70B',
    provider: 'openrouter',
    description: 'Meta\'s high-performance model',
    maxTokens: 128000,
    cost: '$0.90/1M tokens'
  },
  {
    id: 'google/gemini-pro-1.5',
    name: 'Gemini Pro 1.5',
    provider: 'openrouter',
    description: 'Google\'s advanced model via OpenRouter',
    maxTokens: 2000000,
    cost: '$1.25/1M tokens'
  },
  {
    id: 'mistralai/mistral-7b-instruct',
    name: 'Mistral 7B',
    provider: 'openrouter',
    description: 'Efficient and fast Mistral model',
    maxTokens: 32000,
    cost: '$0.20/1M tokens'
  },
  {
    id: 'qwen/qwen2-72b-instruct',
    name: 'Qwen 2 72B',
    provider: 'openrouter',
    description: 'Qwen\'s powerful instruction-tuned model',
    maxTokens: 128000,
    cost: '$0.90/1M tokens'
  },
  {
    id: 'deepseek/deepseek-v2-chat',
    name: 'DeepSeek V2',
    provider: 'openrouter',
    description: 'DeepSeek\'s advanced chat model',
    maxTokens: 128000,
    cost: '$0.14/1M tokens'
  },
  {
    id: 'z.ai/glm-4-9b-chat',
    name: 'GLM-4 9B',
    provider: 'openrouter',
    description: 'A powerful and efficient chat model by Z.AI',
    maxTokens: 128000,
    cost: '$0.10/1M tokens'
  }
];

// Default model selection
export const DEFAULT_MODEL = AI_MODELS[0]; // Gemini 2.0 Flash

// Gemini Configuration
const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(geminiApiKey);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const codeGenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// Gemini Chat Session
export const getGeminiChatSession = (modelId: string = 'gemini-2.0-flash') => {
  const model = genAI.getGenerativeModel({ model: modelId });
  return model.startChat({
    generationConfig,
    history: [],
  });
};

// Gemini Code Generation Session
export const getGeminiCodeSession = (modelId: string = 'gemini-2.0-flash') => {
  const model = genAI.getGenerativeModel({ model: modelId });
  return model.startChat({
    generationConfig: codeGenerationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate a Project in React app. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, \nwithout any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from \"lucide-react\" and use it in JSX as <Heart className=\"\" />.\nalso you can use date-fns for date format and react-chartjs-2 chart, graph library\n\nReturn the response in JSON format with the following schema:\n{\n  \"projectTitle\": \"\",\n  \"explanation\": \"\",\n  \"files\": {\n    \"/App.js\": {\n      \"code\": \"\"\n    },\n    ...\n  },\n  \"generatedFiles\": []\n}\n\nHere's the reformatted and improved version of your prompt:\n\nGenerate a programming code structure for a React project using Vite. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from \"lucide-react\" and use it in JSX as <Heart className=\"\" />.\n\nReturn the response in JSON format with the following schema:\n\njson\nCopy code\n{\n  \"projectTitle\": \"\",\n  \"explanation\": \"\",\n  \"files\": {\n    \"/App.js\": {\n      \"code\": \"\"\n    },\n    ...\n  },\n  \"generatedFiles\": []\n}\nEnsure the files field contains all created files, and the generatedFiles field lists all the filenames. Each file's code should be included in the code field, following this example:\nfiles:{\n  \"/App.js\": {\n    \"code\": \"import React from 'react';\\nimport './styles.css';\\nexport default function App() {\\n  return (\\n    <div className='p-4 bg-gray-100 text-center'>\\n      <h1 className='text-2xl font-bold text-blue-500'>Hello, Tailwind CSS with Sandpack!</h1>\\n      <p className='mt-2 text-gray-700'>This is a live code editor.</p>\\n    </div>\\n  );\\n}\"\n  }\n}\n  Additionally, include an explanation of the project's structure, purpose, and functionality in the explanation field. Make the response concise and clear in one paragraph.\n  - When asked then only use this package to import, here are some packages available to import and use (date-fns,react-chartjs-2) only when it required\n  \n  - For placeholder images, please use a https://archive.org/download/placeholder-image/placeholder-image.jpg\n  -Add Emoji icons whenever needed to give good user experinence\n  - all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\n- By default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\n- Use icons from lucide-react for logos only when needed.\n- use shadows and cards\n- proper spacing between elements and padding\n\n- Use stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.\n   "},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"projectTitle\": \"Dashboard App\",\n  \"explanation\": \"This React project creates a basic dashboard application with several key features. It includes a header with navigation, a sidebar for main menu options, a main content area showcasing various widgets and charts, and a footer. The application is styled using Tailwind CSS for a modern and responsive design. The lucide-react library is used to provide necessary icons for navigation and user interface elements. date-fns is used for date and time formatting and react-chartjs-2 used to display charts.\",\n  \"files\": {\n    \"/App.js\": {\n      \"code\": \"import React from 'react';\\nimport Header from './components/Header';\\nimport Sidebar from './components/Sidebar';\\nimport MainContent from './components/MainContent';\\nimport Footer from './components/Footer';\\n\\nfunction App() {\\n  return (\\n    <div className=\\\"flex flex-col h-screen\\\">\\n      <Header />\\n      <div className=\\\"flex flex-1\\\">\\n        <Sidebar />\\n        <MainContent />\\n      </div>\\n      <Footer />\\n    </div>\\n  );\\n}\\n\\nexport default App;\"\n    },\n    \"/components/Header.js\": {\n      \"code\": \"import React from 'react';\\nimport { Search, Menu } from 'lucide-react';\\n\\nfunction Header() {\\n  return (\\n    <header className=\\\"bg-white shadow-md py-4 px-6 flex items-center justify-between\\\">\\n      <div className=\\\"flex items-center\\\">\\n        <button className=\\\"mr-4 text-gray-600 hover:text-gray-800\\\">\\n          <Menu className=\\\"h-6 w-6\\\" />\\n        </button>\\n        <h1 className=\\\"text-2xl font-semibold text-gray-800\\\">Dashboard 📊</h1>\\n      </div>\\n      <div className=\\\"flex items-center\\\">\\n        <div className=\\\"relative mr-4\\\">\\n          <input\\n            type=\\\"text\\\"\\n            placeholder=\\\"Search...\\\" //Added placeholder\\n            className=\\\"border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500\\\"\\n          />\\n          <div className=\\\"absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400\\\">\\n            <Search className=\\\"h-5 w-5\\\" />\\n          </div>\\n        </div>\\n        <img\\n          src=\\\"https://archive.org/download/placeholder-image/placeholder-image.jpg\\\"\\n          alt=\\\"User Avatar\\\"\\n          className=\\\"w-8 h-8 rounded-full object-cover\\\"\\n        />\\n      </div>\\n    </header>\\n  );\\n}\\n\\nexport default Header;\"\n    },\n    \"/components/Sidebar.js\": {\n      \"code\": \"import React from 'react';\\nimport { Home, Users, Settings, Mail, Bell, Calendar } from 'lucide-react';\\n\\nconst Sidebar = () => {\\n  return (\\n    <aside className=\\\"bg-gray-100 w-64 p-4\\\">\\n      <nav>\\n        <ul className=\\\"space-y-2\\\">\\n          <li>\\n            <a href=\\\"#\\\" className=\\\"flex items-center space-x-2 text-gray-700 hover:text-blue-500\\\">\\n              <Home className=\\\"h-5 w-5\\\" />\\n              <span>Home</span>\\n            </a>\\n          </li>\\n          <li>\\n            <a href=\\\"#\\\" className=\\\"flex items-center space-x-2 text-gray-700 hover:text-blue-500\\\">\\n              <Users className=\\\"h-5 w-5\\\" />\\n              <span>Users</span>\\n            </a>\\n          </li>\\n          <li>\\n            <a href=\\\"#\\\" className=\\\"flex items-center space-x-2 text-gray-700 hover:text-blue-500\\\">\\n              <Settings className=\\\"h-5 w-5\\\" />\\n              <span>Settings</span>\\n            </a>\\n          </li>\\n          <li>\\n            <a href=\\\"#\\\" className=\\\"flex items-center space-x-2 text-gray-700 hover:text-blue-500\\\">\\n              <Mail className=\\\"h-5 w-5\\\" />\\n              <span>Messages</span>\\n            </a>\\n          </li>\\n          <li>\\n            <a href=\\\"#\\\" className=\\\"flex items-center space-x-2 text-gray-700 hover:text-blue-500\\\">\\n              <Bell className=\\\"h-5 w-5\\\" />\\n              <span>Notifications</span>\\n            </a>\\n          </li>\\n          <li>\\n            <a href=\\\"#\\\" className=\\\"flex items-center space-x-2 text-gray-700 hover:text-blue-500\\\">\\n              <Calendar className=\\\"h-5 w-5\\\" />\\n              <span>Calendar</span>\\n            </a>\\n          </li>\\n        </ul>\\n      </nav>\\n    </aside>\\n  );\\n};\\n\\nexport default Sidebar;\"\n    },\n    \"/components/MainContent.js\": {\n      \"code\": \"import React from 'react';\\nimport OverviewCard from './widgets/OverviewCard';\\nimport RecentActivity from './widgets/RecentActivity';\\nimport SalesChart from './widgets/SalesChart';\\n\\nfunction MainContent() {\\n  return (\\n    <main className=\\\"flex-1 p-6\\\">\\n      <div className=\\\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6\\\">\\n        <OverviewCard title=\\\"Total Revenue\\\" value=\\\"$50,000\\\" icon=\\\"Heart\\\"/>\\n        <OverviewCard title=\\\"New Users\\\" value=\\\"1,200\\\" icon=\\\"Users\\\"/>\\n        <OverviewCard title=\\\"Orders\\\" value=\\\"350\\\" icon=\\\"ShoppingCart\\\"/>\\n      </div>\\n      <div className=\\\"mb-6\\\">\\n        <SalesChart />\\n      </div>\\n      <div>\\n        <RecentActivity />\\n      </div>\\n    </main>\\n  );\\n}\\n\\nexport default MainContent;\"\n    },\n    \"/components/Footer.js\": {\n      \"code\": \"import React from 'react';\\n\\nfunction Footer() {\\n  return (\\n    <footer className=\\\"bg-gray-200 py-2 px-6 text-center\\\">\\n      <p className=\\\"text-gray-600\\\">© 2024 Dashboard App</p>\\n    </footer>\\n  );\\n}\\n\\nexport default Footer;\"\n    },\n    \"/components/widgets/OverviewCard.js\": {\n      \"code\": \"import React from 'react';\\nimport { Heart, Users, ShoppingCart } from 'lucide-react';\\n\\nconst iconMap = {\\n    Heart: Heart,\\n    Users: Users,\\n    ShoppingCart: ShoppingCart\\n};\\n\\nfunction OverviewCard({ title, value, icon }) {\\n    const IconComponent = iconMap[icon] || Heart; // Default to Heart if icon is not found\\n\\n  return (\\n    <div className=\\\"bg-white shadow-md rounded-md p-4\\\">\\n      <div className=\\\"flex items-center justify-between\\\">\\n        <div>\\n          <h3 className=\\\"text-lg font-semibold text-gray-800\\\">{title}</h3>\\n          <p className=\\\"text-2xl font-bold text-blue-500\\\">{value}</p>\\n        </div>\\n        <div className=\\\"text-blue-500\\\">\\n          <IconComponent className=\\\"h-8 w-8\\\" />\\n        </div>\\n      </div>\\n    </div>\\n  );\\n}\\n\\nexport default OverviewCard;\"\n    },\n    \"/components/widgets/RecentActivity.js\": {\n      \"code\": \"import React from 'react';\\nimport { Clock, ArrowRight } from 'lucide-react';\\nimport { formatDistanceToNow } from 'date-fns';\\n\\nconst activities = [\\n  {\\n    id: 1,\\n    user: 'John Doe',\\n    action: 'created a new project',\\n    time: new Date(Date.now() - 3600000), // 1 hour ago\\n  },\\n  {\\n    id: 2,\\n    user: 'Jane Smith',\\n    action: 'updated the design',\\n    time: new Date(Date.now() - 7200000), // 2 hours ago\\n  },\\n  {\\n    id: 3,\\n    user: 'David Lee',\\n    action: 'commented on the blog post',\\n    time: new Date(Date.now() - 10800000), // 3 hours ago\\n  },\\n];\\n\\nfunction RecentActivity() {\\n  return (\\n    <div className=\\\"bg-white shadow-md rounded-md p-4\\\">\\n      <h2 className=\\\"text-xl font-semibold text-gray-800 mb-4\\\">Recent Activity ⏳</h2>\\n      <ul>\\n        {activities.map((activity) => (\\n          <li key={activity.id} className=\\\"flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0\\\">\\n            <div>\\n              <p className=\\\"text-gray-700\\\">{activity.user} {activity.action}</p>\\n              <p className=\\\"text-sm text-gray-500\\\">\\n                <Clock className=\\\"h-4 w-4 inline-block mr-1\\\" />\\n                {formatDistanceToNow(activity.time, { addSuffix: true })}\\n              </p>\\n            </div>\\n            <a href=\\\"#\\\" className=\\\"text-blue-500 hover:text-blue-700\\\">\\n              <ArrowRight className=\\\"h-5 w-5\\\" />\\n            </a>\\n          </li>\\n        ))}\\n      </ul>\\n    </div>\\n  );\\n}\\n\\nexport default RecentActivity;\"\n    },\n    \"/components/widgets/SalesChart.js\": {\n      \"code\": \"import React from 'react';\\nimport { Bar } from 'react-chartjs-2';\\nimport { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';\\n\\nChartJS.register(\\n    CategoryScale,\\n    LinearScale,\\n    BarElement,\\n    Title,\\n    Tooltip,\\n    Legend\\n);\\n\\nconst options = {\\n    responsive: true,\\n    plugins: {\\n        legend: {\\n            position: 'top',\\n        },\\n        title: {\\n            display: true,\\n            text: 'Monthly Sales',\\n        },\\n    },\\n};\\n\\nconst labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];\\n\\nconst data = {\\n    labels,\\n    datasets: [\\n        {\\n            label: 'Sales (USD)',\\n            data: [65, 59, 80, 81, 56, 55, 40],\\n            backgroundColor: 'rgba(255, 99, 132, 0.5)',\\n        },\\n    ],\\n};\\n\\nfunction SalesChart() {\\n    return (\\n        <div className=\\\"bg-white shadow-md rounded-md p-4\\\">\\n            <Bar options={options} data={data} />\\n        </div>\\n    );\\n}\\n\\nexport default SalesChart;\"\n    }\n  },\n  \"generatedFiles\": [\n    \"/App.js\",\n    \"/components/Header.js\",\n    \"/components/Sidebar.js\",\n    \"/components/MainContent.js\",\n    \"/components/Footer.js\",\n    \"/components/widgets/OverviewCard.js\",\n    \"/components/widgets/RecentActivity.js\",\n    \"/components/widgets/SalesChart.js\"\n  ]\n}\n```"},
        ],
      },
    ],
  });
};

// Legacy exports for backward compatibility
export const chatSession = getGeminiChatSession();
export const GenAICode = getGeminiCodeSession();