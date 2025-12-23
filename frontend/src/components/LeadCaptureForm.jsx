import { useState } from 'react';

export default function LeadCaptureForm() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting to Proxy/MC:', formData);
    // Simulate API call
    setTimeout(() => setSubmitted(true), 1000);
  };

  if (submitted) {
    return (
      <div className="text-center p-8 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl animate-fade-in">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-4">
          Welcome!
        </h2>
        <p className="text-gray-200">Check your inbox for the starter guide.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl space-y-6">
      <h2 className="text-2xl font-bold text-white mb-2 text-center">Get Early Access</h2>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Full Name</label>
        <input
          type="text"
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-500 transition-all"
          placeholder="Jane Doe"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Email Address</label>
        <input
          type="email"
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-500 transition-all"
          placeholder="jane@company.com"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Company</label>
        <input
          type="text"
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-500 transition-all"
          placeholder="Acme Inc."
          value={formData.company}
          onChange={(e) => setFormData({...formData, company: e.target.value})}
        />
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-lg transform hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-purple-500/25"
      >
        Start Your Journey
      </button>
    </form>
  );
}
