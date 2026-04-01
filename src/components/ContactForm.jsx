import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';

const baseInput =
  'w-full px-4 py-3.5 rounded-xl border bg-neutral-900/80 backdrop-blur-xl text-white text-sm placeholder-neutral-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500/40 resize-y';
const validInput = `${baseInput} border-neutral-800/50 focus:border-yellow-500`;
const errorInput = `${baseInput} border-red-500/60 focus:border-red-500 focus:ring-red-500/30`;

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', eventType: '', eventDate: '', message: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const minDate = useMemo(() => new Date().toISOString().split('T')[0], []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
    }
  };

  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'name':
        return !value.trim() ? 'Name is required' : '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email';
        return '';
      case 'eventType':
        return !value ? 'Please select an event type' : '';
      case 'message':
        return !value.trim() ? 'Message is required' : '';
      default:
        return '';
    }
  }, []);

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors((prev) => err ? { ...prev, [name]: err } : (() => { const n = { ...prev }; delete n[name]; return n; })());
  };

  const validate = useCallback(() => {
    const errs = {};
    ['name', 'email', 'eventType', 'message'].forEach((key) => {
      const err = validateField(key, form[key]);
      if (err) errs[key] = err;
    });
    return errs;
  }, [form, validateField]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setTouched({ name: true, email: true, eventType: true, message: true });
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    console.log('Form submitted:', form);
    setLoading(false);
    setSent(true);
    setForm({ name: '', email: '', phone: '', eventType: '', eventDate: '', message: '' });
    setTouched({});
    setErrors({});
    setTimeout(() => setSent(false), 4000);
  };

  const getClass = (name) => (errors[name] && touched[name]) ? errorInput : validInput;

  const Field = ({ name, children }) => (
    <div>
      {children}
      {errors[name] && touched[name] && (
        <p className="mt-1.5 text-red-400 text-xs">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <motion.form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      noValidate
    >
      <Field name="name">
        <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} onBlur={handleBlur} className={getClass('name')} />
      </Field>
      <Field name="email">
        <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} onBlur={handleBlur} className={getClass('email')} />
      </Field>
      <input name="phone" type="tel" placeholder="Phone Number" value={form.phone} onChange={handleChange} className={validInput} />
      <Field name="eventType">
        <select
          name="eventType"
          value={form.eventType}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${getClass('eventType')} ${!form.eventType ? 'text-neutral-500' : ''} appearance-none`}
        >
          <option value="" disabled>Select Event Type</option>
          <option value="Wedding">Wedding</option>
          <option value="Pre-wedding">Pre-wedding</option>
          <option value="Portrait">Portrait</option>
          <option value="Corporate Event">Corporate Event</option>
          <option value="Other">Other</option>
        </select>
      </Field>
      <input
        name="eventDate"
        type="date"
        min={minDate}
        value={form.eventDate}
        onChange={handleChange}
        className={`${validInput} ${!form.eventDate ? 'text-neutral-500' : ''}`}
      />
      <Field name="message">
        <textarea name="message" placeholder="Tell us about your event..." value={form.message} onChange={handleChange} onBlur={handleBlur} rows={5} className={getClass('message')} />
      </Field>
      <button
        type="submit"
        disabled={loading || sent}
        className="w-full py-3.5 rounded-full bg-yellow-500 text-black font-semibold text-sm hover:bg-yellow-400 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 shadow-lg shadow-yellow-500/20 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : sent ? '✓ Message Sent!' : 'Send Message'}
      </button>
    </motion.form>
  );
}
