export default function AboutPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">About ClaimStack</h1>
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            ClaimStack is a platform designed to bring structure and evidence to online debates.
            We believe that the best way to understand complex issues is through thoughtful,
            evidence-based discussion.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Our mission is to create a space where users can submit claims, provide evidence,
            and engage in meaningful discourse that helps everyone understand different
            perspectives.
          </p>
        </div>
      </div>
    </div>
  )
}

