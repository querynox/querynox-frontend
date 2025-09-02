const PrivacyPolicy = () => {
  return (
    <div className="px-6 py-16 max-w-4xl mx-auto text-left text-muted-foreground">
      <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>

      <p className="mb-6">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <p className="mb-6">
        QueryNox ("we", "our", "us") is committed to protecting your privacy. 
        This Privacy Policy explains how we collect, use, and protect your information 
        when you use our platform, which provides AI-powered chat, file analysis, and related features.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">1. Information We Collect</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Account Information:</strong> Email address, name, and authentication data when you sign in via Clerk.</li>
        <li><strong>Usage Data:</strong> Chat messages, prompts, and responses to improve service functionality.</li>
        <li><strong>Uploaded Files:</strong> PDFs, images, and other files you provide for AI analysis.</li>
        <li><strong>Technical Data:</strong> Browser type, device information, IP address, and analytics for security and performance monitoring.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">2. How We Use Your Information</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>To provide AI chat, web search, and document analysis features.</li>
        <li>To personalize and improve your experience.</li>
        <li>To process your files securely and return requested results.</li>
        <li>To maintain security, prevent misuse, and comply with legal requirements.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">3. How We Share Your Information</h2>
      <p className="mb-4">
        We do not sell your personal information. Your data may be shared only in the following circumstances:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>With AI model providers (e.g., OpenAI, Anthropic, Google) to process your prompts and files.</li>
        <li>With service providers (e.g., Clerk) for authentication and account management.</li>
        <li>When required by law or to protect the rights and safety of our users and platform.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">4. Data Retention</h2>
      <p className="mb-6">
        Uploaded files and chat history may be temporarily stored to provide services and improve context, but 
        we aim to delete them within a reasonable period unless legally required to retain them.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">5. Security</h2>
      <p className="mb-6">
        We use encryption, access controls, and secure APIs to protect your data. However, no method of 
        transmission or storage is 100% secure.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">6. Your Rights</h2>
      <p className="mb-6">
        You have the right to access, correct, or delete your personal data. You can request account deletion 
        by contacting us at <a href="mailto:support@querynox.xyz" className="text-foreground underline">support@querynox.xyz</a>.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">7. Third-Party Services</h2>
      <p className="mb-6">
        Our platform integrates with third-party AI and authentication providers. These providers may have their own privacy policies, 
        and we encourage you to review them.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">8. Changes to This Policy</h2>
      <p className="mb-6">
        We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the date at the top of this page.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">9. Contact Us</h2>
      <p className="mb-6">
        If you have any questions about this Privacy Policy, please contact us at 
        <a href="mailto:support@querynox.xyz" className="text-foreground underline"> support@querynox.xyz</a>.
      </p>
    </div>
  )
}

export default PrivacyPolicy
