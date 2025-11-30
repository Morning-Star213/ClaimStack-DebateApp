export default function PrivacyPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Your privacy is important to us. This Privacy Policy explains how we collect,
            use, and protect your personal information.
          </p>
          {/* Add more privacy policy content here */}
        </div>
      </div>
    </div>
  )
}

