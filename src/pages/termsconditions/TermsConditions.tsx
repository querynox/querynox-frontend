const TermsConditions = () => {
  return (
    <div className="px-6 py-16 max-w-4xl mx-auto text-left text-muted-foreground">
      <h1 className="text-4xl font-bold text-foreground mb-8">Terms & Conditions</h1>

      <p className="mb-6">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <p className="mb-6">
        Welcome to QueryNox ("we", "our", "us"). These Terms & Conditions 
        ("Terms") govern your use of our AI-powered chat platform, 
        including any services, features, and content we provide (collectively, "Services"). 
        By accessing or using QueryNox, you agree to these Terms.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">1. Eligibility</h2>
      <p className="mb-6">
        You must be at least 13 years old (or the minimum legal age in your jurisdiction) to use QueryNox. 
        By using the Services, you confirm that you meet this requirement.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">2. Account Registration</h2>
      <p className="mb-6">
        You must create an account to access certain features. You agree to provide accurate 
        and up-to-date information during registration and keep your credentials secure. 
        You are responsible for all activity under your account.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">3. Acceptable Use</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Do not use the Services for unlawful, harmful, or abusive activities.</li>
        <li>Do not upload or share content that is illegal, obscene, discriminatory, or infringing on intellectual property rights.</li>
        <li>Do not attempt to disrupt, overload, or reverse-engineer the Services.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">4. AI-Generated Content</h2>
      <p className="mb-6">
        AI responses are generated automatically and may be inaccurate or incomplete. 
        You are responsible for verifying any information before relying on it. 
        We are not liable for actions taken based on AI-generated outputs.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">5. Uploaded Content</h2>
      <p className="mb-6">
        You retain ownership of files, text, or images you upload. By submitting content, 
        you grant us and our AI providers a temporary, limited license to process it for the purpose of providing Services.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">6. Third-Party Services</h2>
      <p className="mb-6">
        Our Services integrate with third-party AI providers (e.g., OpenAI, Anthropic, Google). 
        Your use of these features is also subject to their respective terms and privacy policies.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">7. Service Availability</h2>
      <p className="mb-6">
        We strive to keep the Services available at all times but do not guarantee uninterrupted or error-free operation. 
        We may modify, suspend, or discontinue Services at any time without notice.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">8. Limitation of Liability</h2>
      <p className="mb-6">
        To the maximum extent permitted by law, QueryNox is not liable for any direct, indirect, 
        incidental, or consequential damages arising from your use of the Services.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">9. Termination</h2>
      <p className="mb-6">
        We may suspend or terminate your account if you violate these Terms or engage in prohibited activities. 
        You may also stop using the Services at any time.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">10. Changes to These Terms</h2>
      <p className="mb-6">
        We may update these Terms occasionally. Continued use after changes means you accept the updated Terms.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">11. Contact Us</h2>
      <p className="mb-6">
        For questions about these Terms, contact us at 
        <a href="mailto:support@querynox.com" className="text-foreground underline"> support@querynox.com</a>.
      </p>
    </div>
  )
}

export default TermsConditions
