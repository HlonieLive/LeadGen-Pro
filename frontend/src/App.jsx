import LeadCaptureForm from './components/LeadCaptureForm';

function App() {
  return (
    <div className="min-h-screen w-full bg-[#0f172a] overflow-hidden relative flex items-center justify-center p-4">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-[128px] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-12 text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
            LeadGen <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Pro</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-lg mx-auto">
            The next generation of customer onboarding. Seamlessly integrated with Salesforce.
          </p>
        </div>

        <LeadCaptureForm />
      </div>
    </div>
  );
}

export default App;
