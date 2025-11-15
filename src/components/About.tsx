import React from 'react';
import { Briefcase, Award, Code, Github, ExternalLink, Download, Smartphone } from 'lucide-react';

function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-bg-secondary rounded-2xl p-6 md:p-8 shadow-xl border border-primary/10">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Prabal Jaat</h1>
            <div className="flex items-center gap-2 text-text-secondary mb-4">
              <Award className="w-5 h-5" />
              <span>Past Ex-Google Threads AI Group Core Member</span>
            </div>
            <p className="text-text-secondary leading-relaxed mb-6">
              A passionate technologist and AI enthusiast with extensive experience in artificial intelligence
              and machine learning. As a former core member of the Google Threads AI Group, I've contributed
              to groundbreaking developments in conversational AI and natural language processing.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://github.com/rockyjaat47/roxone.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-material btn-material-primary flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                <span>Documentation</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="https://drive.google.com/file/d/your-apk-file-id/view"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-material btn-material-secondary flex items-center gap-2 bg-green-500 text-white hover:bg-green-600"
              >
                <Smartphone className="w-5 h-5" />
                <span>Download Android App</span>
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <Code className="w-6 h-6" />
            Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-bg-primary rounded-xl p-6 border border-primary/10 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-primary mb-3">AI & Machine Learning</h3>
              <p className="text-text-secondary">
                Specialized in developing and implementing advanced AI solutions, with a focus on
                natural language processing and conversational AI systems.
              </p>
            </div>
            <div className="bg-bg-primary rounded-xl p-6 border border-primary/10 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-primary mb-3">Digital Marketing</h3>
              <p className="text-text-secondary">
                Expert in leveraging AI for digital marketing optimization, including Meta Ads
                strategy and campaign performance enhancement.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <Award className="w-6 h-6" />
            About the Developer
          </h2>
          <div className="bg-bg-primary rounded-xl p-6 border border-primary/10 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-primary mb-2">Prabal Jaat</h3>
            <p className="text-text-secondary text-sm mb-2">Founder & Lead Developer</p>
            <p className="text-text-secondary">
              Core development, AI integration, system architecture, and digital marketing automation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;