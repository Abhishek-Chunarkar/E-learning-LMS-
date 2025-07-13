import { FaFileContract } from "react-icons/fa";

export default function TermsAndConditions() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 px-6">
      <div className="max-w-5xl mx-auto bg-white/90 dark:bg-gray-900/90 shadow-xl rounded-2xl p-10 backdrop-blur-md border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex items-center mb-8 space-x-4">
          <FaFileContract className="text-4xl text-blue-600 dark:text-blue-400" />
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Terms & Conditions</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: June 2025
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-10 text-gray-700 dark:text-gray-300 leading-relaxed">
          <section>
            <p>
              Welcome to <span className="font-semibold text-blue-600 dark:text-blue-400">CodeMate</span>. By accessing or using our platform, you agree to the following terms and conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">1. Acceptance of Terms</h2>
            <p>
              By using our services, you agree to be bound by these terms. If you do not agree, please refrain from using the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">2. Use of the Platform</h2>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>You must be at least 13 years old to create an account.</li>
              <li>You are responsible for any activity that occurs under your account.</li>
              <li>Do not share your account credentials with others.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">3. User Conduct</h2>
            <p>
              Users must not post illegal, harmful, or offensive content, nor disrupt the learning experience of others.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">4. Intellectual Property</h2>
            <p>
              All content including courses, videos, quizzes, and branding belongs to CodeMate or its contributors and is protected by copyright.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">5. Payments and Refunds</h2>
            <p>
              Some content is paid. All purchases are final unless otherwise stated in our refund policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">6. Termination</h2>
            <p>
              Accounts may be suspended or removed for violating these terms or engaging in suspicious behavior.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">7. Modifications</h2>
            <p>
              We may update these terms occasionally. Continued use of the platform implies acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">8. Contact Us</h2>
            <p>
              For any questions, contact us at{" "}
              <a href="mailto:support@codemate.com" className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300">
                support@codemate.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
