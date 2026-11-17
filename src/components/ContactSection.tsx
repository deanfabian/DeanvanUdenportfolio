import React, { useState } from 'react';
import { Mail, Copy, Check, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ContactSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'film',
    message: '',
  });

  const email = 'deanfabianvanuden@gmail.com';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate send or open mailto fallback
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: 'film', message: '' });
      }, 500);
    }, 700);
  };

  return (
    <section
      id="contact"
      aria-label="Contact Dean van Uden"
      className="relative min-h-screen w-full bg-[#070b14] px-4 sm:px-8 md:px-12 py-24 sm:py-32 border-t border-white/10"
    >
      <div className="w-full max-w-7xl mx-auto select-text space-y-16">
        {/* Asymmetrical Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end border-b border-white/10 pb-10">
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-amber-400 block font-medium">
              {t.contact.badge}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-slate-100 font-light tracking-tight leading-tight">
              {t.contact.title}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              {t.contact.subtitle}
            </p>
          </div>
        </div>

        {/* Editorial Contact Sheet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Direct Colophon */}
          <div className="lg:col-span-5 space-y-8">
            <div className="border-t border-b border-white/15 divide-y divide-white/10">
              {/* Direct Email Entry */}
              <div className="py-5 space-y-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 block">
                  {t.contact.emailLabel}
                </span>
                <a
                  href={`mailto:${email}`}
                  className="font-serif text-xl sm:text-2xl text-amber-200 hover:text-amber-100 transition-colors block break-all focus:outline-none focus:underline"
                >
                  {email}
                </a>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex items-center gap-2 px-3 py-1.5 border border-white/15 hover:border-amber-400/60 bg-[#0a0f1d] text-xs font-mono tracking-wider text-slate-200 transition-colors focus:outline-none focus:border-amber-400"
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
                    className="flex items-center gap-2 px-3 py-1.5 border border-white/15 hover:border-amber-400/60 bg-[#0a0f1d] text-xs font-mono tracking-wider text-amber-200 transition-colors focus:outline-none focus:border-amber-400"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Open Mail</span>
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="py-4">
                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 block mb-1">
                  {t.contact.locationLabel}
                </span>
                <p className="font-serif text-slate-200 text-base">
                  {t.contact.locationVal}
                </p>
              </div>

              {/* Education */}
              <div className="py-4">
                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 block mb-1">
                  {t.contact.studyLabel}
                </span>
                <p className="font-serif text-slate-200 text-base">
                  {t.contact.studyVal}
                </p>
              </div>

              {/* Scope */}
              <div className="py-4">
                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 block mb-1">
                  {language === 'nl' ? 'Diensten & Rollen' : 'Scope & Roles'}
                </span>
                <p className="font-serif text-slate-300 text-sm sm:text-base leading-snug">
                  {language === 'nl'
                    ? 'Fictiefilm productie · Draaidag-planning · Casting & crew-coördinatie · Sport & club visual content'
                    : 'Fiction production · Set logistics · Casting & crew coordination · Sports & club visual content'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Dispatch Form */}
          <div className="lg:col-span-7">
            <div className="border border-white/15 bg-[#0a0f1d] p-6 sm:p-10">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto border border-emerald-400 flex items-center justify-center text-emerald-400">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl text-slate-100 font-light tracking-tight">
                    {t.contact.form.successTitle}
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    {t.contact.form.successDesc}
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-5 py-2 border border-white/20 text-xs font-mono uppercase tracking-widest text-slate-300 hover:text-amber-200 hover:border-amber-400 transition-colors"
                  >
                    {language === 'nl' ? 'Nieuw bericht versturen' : 'Send another inquiry'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono tracking-wider uppercase text-slate-400 block">
                        {t.contact.form.name} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t.contact.form.namePlaceholder}
                        className="w-full px-4 py-3 bg-[#070b14] border border-white/15 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono tracking-wider uppercase text-slate-400 block">
                        {t.contact.form.email} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t.contact.form.emailPlaceholder}
                        className="w-full px-4 py-3 bg-[#070b14] border border-white/15 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject / Category */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono tracking-wider uppercase text-slate-400 block">
                      {t.contact.form.subject}
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-[#070b14] border border-white/15 text-sm text-slate-100 focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      <option value="film">{t.contact.form.typeFilm}</option>
                      <option value="social">{t.contact.form.typeSocial}</option>
                      <option value="other">{t.contact.form.typeOther}</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono tracking-wider uppercase text-slate-400 block">
                      {t.contact.form.message} *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.contact.form.messagePlaceholder}
                      className="w-full px-4 py-3 bg-[#070b14] border border-white/15 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-[#070b14] font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-colors disabled:opacity-50 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  >
                    {isSubmitting ? (
                      <span>{t.contact.form.sending}</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>{t.contact.form.send}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
