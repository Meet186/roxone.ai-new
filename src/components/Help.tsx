import React from 'react';
import { MessageCircle, Shield, HelpCircle } from 'lucide-react';

function Help() {
  const handleWhatsAppSupport = () => {
    window.open('https://wa.me/+916261302023', '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="space-y-12">
        {/* Support Section */}
        <section className="bg-bg-secondary rounded-2xl p-6 md:p-8 shadow-xl border border-primary/10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 flex items-center gap-2">
            <MessageCircle className="w-8 h-8" />
            24/7 Support
          </h2>
          <p className="text-text-secondary mb-6">
            Need help? Our support team is available 24/7 to assist you with any questions or concerns.
          </p>
          <button
            onClick={handleWhatsAppSupport}
            className="btn-material btn-material-primary w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Contact Support on WhatsApp
          </button>
        </section>

        {/* Privacy Policy Section */}
        <section className="bg-bg-secondary rounded-2xl p-6 md:p-8 shadow-xl border border-primary/10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 flex items-center gap-2">
            <Shield className="w-8 h-8" />
            Privacy Policy
          </h2>
          <div className="space-y-6 text-text-secondary">
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">Data Collection</h3>
              <p>
                We collect only essential information needed to provide our services. This includes chat messages and basic usage data to improve your experience.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">Data Usage</h3>
              <p>
                Your data is used solely for providing and improving our AI services. We never share or sell your personal information to third parties.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">Security</h3>
              <p>
                We employ industry-standard security measures to protect your data. All communications are encrypted using state-of-the-art protocols.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">Your Rights</h3>
              <p>
                You have the right to access, modify, or delete your data at any time. Contact our support team for assistance with data-related requests.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-bg-secondary rounded-2xl p-6 md:p-8 shadow-xl border border-primary/10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 flex items-center gap-2">
            <HelpCircle className="w-8 h-8" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">How does Roxone AI work?</h3>
              <p className="text-text-secondary">
                Roxone AI uses advanced machine learning algorithms to understand and respond to your digital marketing queries in a natural, conversational way.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">What can I ask Roxone AI?</h3>
              <p className="text-text-secondary">
                You can ask about digital marketing strategies, Meta Ads optimization, campaign performance, and social media marketing best practices.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Is my data secure?</h3>
              <p className="text-text-secondary">
                Yes, we use enterprise-grade encryption and security measures to protect your data and conversations.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Help;