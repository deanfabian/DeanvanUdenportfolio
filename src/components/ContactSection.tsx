import React, { useState } from 'react';
import { Mail, Copy, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const email = 'deanfabianvanuden@gmail.com';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative min-h-[60vh] w-full bg-[#070b14] px-6 sm:px-8 md:px-12 py-24 sm:py-32 border-t border-white/10 flex items-center justify-center"
    >
      <div className="w-full max-w-[60ch] mx-auto select-text text-center space-y-8">
        {/* Heading: "Mail me." & Subtext */}
        <div className="space-y-3">
          <h2 className="font-serif text-3xl sm:text-5xl text-slate-100 font-light tracking-tight">
            {t.contact.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-serif font-light">
            {t.contact.subtext}
          </p>
        </div>

        {/* Email display and actions */}
        <div className="pt-4 space-y-6">
          <div>
            <a
              href={`mailto:${email}`}
              className="inline-block font-serif text-lg sm:text-2xl text-slate-100 hover:text-amber-200 transition-colors whitespace-nowrap focus:outline-none focus:underline"
            >
              {email}
            </a>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 hover:border-amber-400 bg-transparent text-xs font-mono tracking-wider uppercase text-slate-200 hover:text-amber-200 transition-colors focus:outline-none focus:border-amber-400"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">{t.contact.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.contact.copyEmail}</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 hover:border-amber-400 bg-transparent text-xs font-mono tracking-wider uppercase text-slate-200 hover:text-amber-200 transition-colors focus:outline-none focus:border-amber-400"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{t.contact.openMail}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
