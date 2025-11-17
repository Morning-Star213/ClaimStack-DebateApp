export default function PrivacyPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Your privacy is important to us. This Privacy Policy explains how we collect,
            use, and protect your personal information.
          </p>
          {/* Add more privacy policy content here */}
        </div>
      </div>
    </div>
  )
}

