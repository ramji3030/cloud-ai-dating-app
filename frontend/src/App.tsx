import React from 'react';
import './App.css';

interface User {
  id: string;
  name: string;
  age: number;
  profileImage: string;
}

const App: React.FC = () => {
  const [users] = React.useState<User[]>([
    {
      id: '1',
      name: 'Alex',
      age: 26,
      profileImage: '👤'
    },
    {
      id: '2', 
      name: 'Jordan',
      age: 24,
      profileImage: '👤'
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-pink-600 flex items-center gap-2">
                💕 CloudAI Dating
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium">
                Discover
              </a>
              <a href="#" className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium">
                Messages
              </a>
              <a href="#" className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium">
                Profile
              </a>
            </nav>
            <button className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Perfect Match with
            <span className="text-pink-600"> AI Power</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Experience intelligent matchmaking powered by advanced machine learning.
            Connect with people who truly understand you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-pink-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-pink-700 transition-colors">
              Get Started Free
            </button>
            <button className="bg-white text-pink-600 border-2 border-pink-600 px-8 py-3 rounded-full text-lg font-medium hover:bg-pink-50 transition-colors">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">🧠</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Matching</h3>
            <p className="text-gray-600">
              Our advanced algorithms analyze compatibility factors to suggest your ideal matches.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Chat</h3>
            <p className="text-gray-600">
              Connect instantly with secure messaging, multimedia sharing, and typing indicators.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">🔐</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
            <p className="text-gray-600">
              Your privacy matters. End-to-end encryption and advanced content moderation.
            </p>
          </div>
        </div>

        {/* Sample Profiles */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Meet Amazing People</h3>
          <div className="flex justify-center gap-6">
            {users.map((user) => (
              <div key={user.id} className="bg-white p-4 rounded-xl shadow-sm w-32">
                <div className="text-4xl mb-2">{user.profileImage}</div>
                <h4 className="font-semibold">{user.name}</h4>
                <p className="text-sm text-gray-600">{user.age} years old</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl p-8 text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-pink-600 mb-2">10K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600 mb-2">95%</div>
              <div className="text-gray-600">Match Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600 mb-2">1M+</div>
              <div className="text-gray-600">Messages Sent</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">CloudAI Dating</h4>
              <p className="text-gray-400">
                Connecting hearts through intelligent technology.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CloudAI Dating. Made with ❤️ by the Cloud AI Dating Team.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
