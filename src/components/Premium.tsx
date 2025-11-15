import React, { useState } from 'react';
import { Crown, Check, Zap, Star, X, Instagram, Facebook, Twitter, Linkedin, Bot, Sparkles, Rocket, Brain, Target, Gauge } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: string;
}

function PaymentModal({ isOpen, onClose, selectedPlan }: PaymentModalProps) {
  if (!isOpen) return null;

  const price = selectedPlan === 'Facebook Automation' ? '₹5,999' : '₹999';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative z-50 w-full max-w-md bg-bg-primary rounded-2xl shadow-2xl border border-primary/20 p-6 transform transition-all duration-200 ease-out">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6" />
          Complete Payment for {selectedPlan}
        </h2>
        <div className="space-y-4">
          <p className="text-base font-medium text-text-primary">
            Please send the payment of {price} to the following GPay number:
          </p>
          <div className="bg-bg-secondary p-4 rounded-lg text-center border border-primary/20">
            <p className="text-2xl font-bold text-primary tracking-wide">+91 6261302023</p>
          </div>
          <p className="text-sm font-medium text-text-primary">
            After payment, please contact our support team on WhatsApp for account activation.
          </p>
          <button
            onClick={() => window.open('https://wa.me/+916261302023', '_blank')}
            className="btn-material btn-material-primary w-full text-base font-semibold"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}

function Premium() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>();

  const handlePlanSelection = (planName: string) => {
    setSelectedPlan(planName);
    setIsPaymentModalOpen(true);
  };

  const plans = [
    {
      name: 'Facebook Automation',
      price: '₹5,999',
      period: 'month',
      features: [
        'Automated Facebook Ad Creation',
        'AI-Powered Ad Copy Generation',
        'Campaign Performance Analytics',
        'Audience Targeting Optimization',
        'Creative Asset Generation',
        'A/B Testing Automation',
        'ROI Tracking & Reports',
        'Priority Support',
        'Custom Ad Strategy Development'
      ],
      icon: <Facebook className="w-6 h-6" />,
      highlighted: true
    },
    {
      name: 'Basic AI Marketing',
      price: '₹999',
      period: 'month',
      features: [
        'AI Marketing Assistant',
        'Basic Marketing Templates',
        'Campaign Suggestions',
        'Performance Tracking',
        'Email Support'
      ],
      icon: <Bot className="w-6 h-6" />,
      highlighted: false
    }
  ];

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      secondaryIcon: <Sparkles className="w-5 h-5" />,
      title: 'AI-Powered Automation',
      description: 'Let our AI handle your Facebook ad campaigns while you focus on growing your business.'
    },
    {
      icon: <Target className="w-8 h-8" />,
      secondaryIcon: <Rocket className="w-5 h-5" />,
      title: 'Advanced Targeting',
      description: 'Reach the right audience with AI-optimized targeting strategies.'
    },
    {
      icon: <Gauge className="w-8 h-8" />,
      secondaryIcon: <Bot className="w-5 h-5" />,
      title: 'Smart Optimization',
      description: 'Continuous campaign optimization using machine learning algorithms.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 bg-bg-primary">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 flex items-center justify-center gap-2">
          <Crown className="w-10 h-10" />
          Premium Features
        </h1>
        <p className="text-xl font-medium text-text-primary max-w-2xl mx-auto">
          Unlock the power of AI-driven Facebook ad automation and advanced marketing tools.
        </p>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {features.map((feature) => (
          <div key={feature.title} className="bg-bg-secondary rounded-xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 group">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-3 transition-transform duration-300">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md transform group-hover:scale-110 transition-transform duration-300">
                  {feature.secondaryIcon}
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-primary">{feature.title}</h3>
                <p className="text-base font-medium text-text-primary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative bg-bg-secondary rounded-2xl p-6 md:p-8 shadow-xl border transition-all duration-200 hover:shadow-2xl ${
              plan.highlighted ? 'border-primary' : 'border-primary/20'
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                  <Star className="w-4 h-4" />
                  Most Popular
                </span>
              </div>
            )}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-2 bg-primary rounded-full">
                  {React.cloneElement(plan.icon, { className: 'w-8 h-8 text-white' })}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary">{plan.name}</h2>
              </div>
              <div className="flex items-center justify-center gap-1">
                <span className="text-4xl font-bold text-primary">{plan.price}</span>
                <span className="text-lg font-medium text-text-primary">/{plan.period}</span>
              </div>
            </div>
            <ul className="space-y-4 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-text-primary font-medium">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handlePlanSelection(plan.name)}
              className={`w-full btn-material ${
                plan.highlighted ? 'btn-material-primary' : 'btn-material-secondary'
              } text-base font-semibold py-3`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        selectedPlan={selectedPlan}
      />
    </div>
  );
}

export default Premium;