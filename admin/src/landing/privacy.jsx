export default function PrivacyPolicy() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12 bg-gradient-to-tr from-green-50 via-white to-green-50 rounded-lg shadow-lg text-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-gray-100">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold mb-2 tracking-wide text-green-700 dark:text-green-400">
          Privacy Policy
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Your privacy is important to us. Please read how we collect, use, and protect your data.
        </p>
      </header>

      <article className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-3 border-b-2 border-green-300 pb-2 dark:border-green-600">
            1. Information We Collect
          </h2>
          <p>
            We collect personal information that you provide during registration or when you use our platform, such as your name, email address, and payment details.
          </p>
          <p>
            We may also collect non-personal data like browser type, device information, and usage logs to improve our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 border-b-2 border-green-300 pb-2 dark:border-green-600">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>To provide and personalize our services.</li>
            <li>To process payments and manage subscriptions.</li>
            <li>To communicate important updates and promotions.</li>
            <li>To improve platform security and prevent fraud.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 border-b-2 border-green-300 pb-2 dark:border-green-600">
            3. Cookies and Tracking
          </h2>
          <p>
            We use cookies and similar technologies to enhance your experience, analyze usage, and support advertising efforts.
          </p>
          <p>
            You can control cookie preferences through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 border-b-2 border-green-300 pb-2 dark:border-green-600">
            4. Data Sharing and Security
          </h2>
          <p>
            We do not sell your personal data. We may share information with trusted service providers who assist in operating our platform under strict confidentiality agreements.
          </p>
          <p>
            We implement industry-standard security measures to protect your information from unauthorized access.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 border-b-2 border-green-300 pb-2 dark:border-green-600">
            5. Your Rights
          </h2>
          <p>
            You have the right to access, update, or delete your personal information. You can also opt out of marketing communications at any time.
          </p>
          <p>
            Contact us if you want to exercise these rights or have questions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 border-b-2 border-green-300 pb-2 dark:border-green-600">
            6. Children’s Privacy
          </h2>
          <p>
            Our platform is not intended for children under 13 years of age. We do not knowingly collect personal data from children.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 border-b-2 border-green-300 pb-2 dark:border-green-600">
            7. Changes to This Policy
          </h2>
          <p>
            We may update this privacy policy occasionally. Continued use of the platform means you accept the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 border-b-2 border-green-300 pb-2 dark:border-green-600">
            8. Contact Information
          </h2>
          <p>
            For any privacy-related questions or requests, please contact us at{" "}
            <a
              href="mailto:support@codemate.com"
              className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-600 font-semibold underline"
            >
              support@codemate.com
            </a>.
          </p>
        </section>
      </article>

      <footer className="mt-14 text-center text-sm text-gray-500 dark:text-gray-400">
        Last updated: June 2025
      </footer>
    </section>
  );
}
