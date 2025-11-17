export default function TermsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            By using ClaimStack, you agree to these Terms of Service. Please read them carefully.
          </p>
          {/* Add more terms content here */}
        </div>
      </div>
    </div>
  )
}

