import React from 'react';
    import { Github, Twitter, Linkedin } from 'lucide-react';

    const Footer = () => {
      return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6">
                <a 
                  href="#" 
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-roboto transition-colors"
                >
                  Privacy Policy
                </a>
                <a 
                  href="#" 
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-roboto transition-colors"
                >
                  Terms of Service
                </a>
                <a 
                  href="#" 
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-roboto transition-colors"
                >
                  Support
                </a>
              </div>
              
              <div className="flex items-center space-x-4">
                <a 
                  href="#" 
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 text-center">
              <p className="text-slate-600 dark:text-slate-400 text-sm font-roboto">
                © 2025 Analytics Hub. All rights reserved. Built with ❤️ by{' '}
                <a 
                  rel="nofollow" 
                  target="_blank" 
                  href="https://meku.dev"
                  className="text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
                >
                  Meku.dev
                </a>
              </p>
            </div>
          </div>
        </footer>
      );
    };

    export default Footer;