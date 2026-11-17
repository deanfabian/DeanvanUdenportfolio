import React, { useState } from 'react';
import { Mail, Copy, Check, Send, MapPin, GraduationCap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();
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
      // Reset form after short delay
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: 'film', message: '' });
      }, 500);
    }, 700);
  };

  return (
    <section
      id="contact"
      aria-label="Contact Dean van Uden"
      className="relative min-h-screen w-full bg-[#070b14] flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 py-28 border-t border-slate-900"
    >
      {/* Subtle separator thread */}
      <div className="w-12 h-px bg-slate-700/80 mb-12" aria-hidden="true" />

      <div className="w-full max-w-5xl mx-auto space-y-16 select-text">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs tracking-[0.3em] uppercase font-mono text-amber-400 font-medium">
            {t.contact.badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-100 font-light tracking-tight">
            {t.contact.title}
          </h2>
          <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Contact Info & Quick Actions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Email Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-950/70 border border-slate-800 shadow-xl space-y-4">
              <span className="text-xs font-mono tracking-widest uppercase text-slate-400 block">
                {t.contact.emailLabel}
              </span>
              <a
                href={`mailto:${email}`}
                className="font-serif text-lg sm:text-xl text-amber-200 hover:text-amber-100 transition-colors block break-all focus:outline-none focus:underline"
              >
                {email}
              </a>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-400/50 text-xs font-mono tracking-wider text-slate-200 transition-all focus:outline-none focus:ring-1 focus:ring-amber-400"
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
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/40 hover:bg-amber-500/20 text-xs font-mono tracking-wider text-amber-200 transition-all focus:outline-none focus:ring-1 focus:ring-amber-400"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open Mail</span>
                </a>
              </div>
            </div>

            {/* Location & Study Information */}
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-950/50 border border-slate-800/80 shadow-xl space-y-5">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-amber-400/80 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono tracking-widest uppercase text-slate-400 block mb-0.5">
                    {t.contact.locationLabel}
                  </span>
                  <p className="font-serif text-slate-200 text-sm sm:text-base">
                    {t.contact.locationVal}
                  </p>
                </div>
              </div>

              <div className="w-full h-px bg-slate-800/60" />

              <div className="flex items-start gap-3.5">
                <GraduationCap className="w-5 h-5 text-amber-400/80 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono tracking-widest uppercase text-slate-400 block mb-0.5">
                    {t.contact.studyLabel}
                  </span>
                  <p className="font-serif text-slate-200 text-sm sm:text-base">
                    {t.contact.studyVal}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Collaboration Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-2xl">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl text-slate-100 font-light">
                    {t.contact.form.successTitle}
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    {t.contact.form.successDesc}
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-5 py-2 rounded-full border border-slate-700 text-xs font-mono uppercase tracking-widest text-slate-300 hover:text-amber-200 hover:border-amber-400/50 transition-colors"
                  >
                    Nog een bericht sturen
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono tracking-wider uppercase text-slate-300 block">
                        {t.contact.form.name} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t.contact.form.namePlaceholder}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono tracking-wider uppercase text-slate-300 block">
                        {t.contact.form.email} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t.contact.form.emailPlaceholder}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject / Category */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono tracking-wider uppercase text-slate-300 block">
                      {t.contact.form.subject}
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                    >
                      <option value="film">{t.contact.form.typeFilm}</option>
                      <option value="social">{t.contact.form.typeSocial}</option>
                      <option value="other">{t.contact.form.typeOther}</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono tracking-wider uppercase text-slate-300 block">
                      {t.contact.form.message} *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.contact.form.messagePlaceholder}
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-[0_4px_20px_rgba(245,158,11,0.3)] disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    {isSubmitting ? (
                      <span>{t.contact.form.sending}</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
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
