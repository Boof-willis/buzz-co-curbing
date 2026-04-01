import { useState } from 'react';

const AREAS = [
  { id: 'logan', label: 'Cache Valley / Logan' },
  { id: 'central', label: 'Brigham City to Sandy' },
  { id: 'south', label: 'Draper to Provo' },
];

const LINEAR_FEET = [
  '0–100 Feet',
  '100–200 Feet',
  '200–300 Feet',
  '300–400 Feet',
  '400–500 Feet',
  '500+ Feet',
];

const CURB_STYLES = [
  { id: 'block', label: 'Block' },
  { id: 'slant', label: 'Slant / Wedge' },
  { id: 'mower', label: 'Mower' },
];

const WEBHOOKS = {
  logan: 'https://services.leadconnectorhq.com/hooks/0j2Z0AqFSPiIh2cUeNRO/webhook-trigger/8iOg3WJjwMCRKSbK2SIN',
  central: 'https://services.leadconnectorhq.com/hooks/RoXyWVOiw8UZWGs2zaqB/webhook-trigger/WvSL1I27yQF7zPunoA5F',
  south: 'https://services.leadconnectorhq.com/hooks/l4BF8a6ec5cTCUWGNwpi/webhook-trigger/2ea75cd1-0169-4722-a892-dc209d0dfc6b',
};

const TOTAL_STEPS = 5;

export default function EstimateSurvey({ locationId }) {
  const skipArea = !!locationId;
  const minStep = skipArea ? 2 : 1;
  const displayTotal = skipArea ? TOTAL_STEPS - 1 : TOTAL_STEPS;
  const [step, setStep] = useState(minStep);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({
    area: locationId || '',
    website: '', // honeypot
    address: '',
    linearFeet: '',
    curbStyle: '',
    yardType: '',
    wantsColor: '',
    notes: '',
    name: '',
    phone: '',
    email: '',
  });

  const update = (field, value) => setData((prev) => ({ ...prev, [field]: value }));

  const canAdvance = () => {
    switch (step) {
      case 1: return data.area;
      case 2: return data.linearFeet;
      case 3: return data.curbStyle;
      case 4: return true;
      case 5: return data.name && data.phone && data.email;
      default: return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.website) return; // honeypot triggered — silently discard

    const payload = {};
    Object.entries(data).forEach(([key, val]) => {
      if (val && key !== 'website') payload[key] = val;
    });

    const webhookUrl = WEBHOOKS[data.area];
    if (!webhookUrl) {
      setSubmitted(true);
      return;
    }

    fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(() => setSubmitted(true))
      .catch(() => setSubmitted(true));
  };

  if (submitted) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-none bg-gold/20">
          <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-xl font-bold text-dark mb-2">We Got Your Request!</h3>
        <p className="font-body text-dark/60 max-w-sm">
          We'll reach out within a few hours to discuss your project and get you a quote. Talk soon!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Honeypot — hidden from real users, filled by bots */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          value={data.website}
          onChange={(e) => update('website', e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-data text-[10px] uppercase tracking-widest text-dark/50">
            Step {step - minStep + 1} of {displayTotal}
          </span>
          <span className="font-data text-[10px] uppercase tracking-widest text-dark/50">
            {Math.round(((step - minStep + 1) / displayTotal) * 100)}%
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-none bg-dark/[0.06]">
          <div
            className="h-full rounded-none bg-[#fcc33c] transition-all duration-500 ease-out"
            style={{ width: `${((step - minStep + 1) / displayTotal) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Area */}
      {step === 1 && (
        <div className="space-y-5">
          <div>
            <h3 className="font-heading text-lg font-bold text-dark mb-1">Where is your property?</h3>
            <p className="font-body text-sm text-dark/50 mb-5">Select your service area.</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {AREAS.map((area) => (
              <button
                key={area.id}
                type="button"
                onClick={() => update('area', area.id)}
                className={`flex items-center gap-3 rounded-none border-2 px-5 py-4 text-left transition-all duration-200 ${
                  data.area === area.id
                    ? 'border-gold bg-gold/10 shadow-sm'
                    : 'border-dark/[0.08] bg-white hover:border-dark/20'
                }`}
              >
                <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-none border-2 transition-colors ${
                  data.area === area.id ? 'border-gold bg-gold' : 'border-dark/20'
                }`}>
                  {data.area === area.id && (
                    <svg className="h-3 w-3 text-white" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 7.5L5.5 10L11 4" />
                    </svg>
                  )}
                </div>
                <span className="font-heading text-sm font-semibold text-dark">{area.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Linear Feet */}
      {step === 2 && (
        <div className="space-y-5">
          <div>
            <h3 className="font-heading text-lg font-bold text-dark mb-1">Approximate linear feet?</h3>
            <p className="font-body text-sm text-dark/50 mb-5">Don't worry about being exact. We'll measure during the estimate.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {LINEAR_FEET.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => update('linearFeet', option)}
                className={`rounded-none border-2 px-4 py-4 text-center font-heading text-sm font-semibold transition-all duration-200 ${
                  data.linearFeet === option
                    ? 'border-gold bg-gold/10 text-dark shadow-sm'
                    : 'border-dark/[0.08] bg-white text-dark/70 hover:border-dark/20'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Curb Style */}
      {step === 3 && (
        <div className="space-y-5">
          <div>
            <h3 className="font-heading text-lg font-bold text-dark mb-1">Select your curb style</h3>
            <p className="font-body text-sm text-dark/50 mb-5">Pick a profile. We'll fine-tune details on install day.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {CURB_STYLES.map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => update('curbStyle', style.id)}
                className={`flex flex-col items-center gap-4 rounded-none border-2 p-5 text-center transition-all duration-200 ${
                  data.curbStyle === style.id
                    ? 'border-gold bg-gold/10 shadow-sm'
                    : 'border-dark/[0.08] bg-white hover:border-dark/20'
                }`}
              >
                {/* Stylized curb profile SVGs */}
                <div className="flex h-16 items-end justify-center">
                  {style.id === 'block' && (
                    <img src="/images/SVG/Block.svg" alt="Block Curb" className="w-24 h-auto" />
                  )}
                  {style.id === 'slant' && (
                    <img src="/images/SVG/Slant.svg" alt="Slant or Wedge Style" className="w-24 h-auto" />
                  )}
                  {style.id === 'mower' && (
                    <img src="/images/SVG/Mower.svg" alt="Mower Style" className="w-24 h-auto" />
                  )}
                </div>
                <span className={`font-heading text-sm font-semibold ${
                  data.curbStyle === style.id ? 'text-dark' : 'text-dark/70'
                }`}>
                  {style.label}
                </span>
              </button>
            ))}
          </div>

          <p className="text-center font-body text-xs text-dark/40">Not sure? That's fine — we'll help you pick during the estimate.</p>
        </div>
      )}

      {/* Step 4: Additional Info */}
      {step === 4 && (
        <div className="space-y-6">
          <div>
            <h3 className="font-heading text-lg font-bold text-dark mb-1">Additional details</h3>
            <p className="font-body text-sm text-dark/50 mb-5">Help us prepare for your estimate. All fields are optional.</p>
          </div>

          <div className="space-y-2">
            <p className="font-body text-sm font-semibold text-dark">What describes your yard?</p>
            <div className="grid grid-cols-2 gap-3">
              {['New Yard', 'Existing Yard'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => update('yardType', option)}
                  className={`rounded-none border-2 px-4 py-3 text-center font-heading text-sm font-semibold transition-all duration-200 ${
                    data.yardType === option
                      ? 'border-gold bg-gold/10 text-dark shadow-sm'
                      : 'border-dark/[0.08] bg-white text-dark/70 hover:border-dark/20'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-body text-sm font-semibold text-dark">Interested in custom colors or stamp patterns?</p>
            <div className="grid grid-cols-2 gap-3">
              {['Yes', 'No / Not Sure'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => update('wantsColor', option)}
                  className={`rounded-none border-2 px-4 py-3 text-center font-heading text-sm font-semibold transition-all duration-200 ${
                    data.wantsColor === option
                      ? 'border-gold bg-gold/10 text-dark shadow-sm'
                      : 'border-dark/[0.08] bg-white text-dark/70 hover:border-dark/20'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="notes" className="font-body text-sm font-semibold text-dark">Anything else we should know?</label>
            <textarea
              id="notes"
              value={data.notes}
              onChange={(e) => update('notes', e.target.value)}
              rows={3}
              className="w-full rounded-none border-2 border-dark/[0.08] bg-white px-5 py-4 font-body text-dark placeholder:text-dark/30 focus:border-gold focus:outline-none focus:ring-0 transition-colors"
              placeholder="Specific areas of the yard, sprinkler heads to avoid, timeline, etc."
            />
          </div>
        </div>
      )}

      {/* Step 5: Contact Info */}
      {step === 5 && (
        <div className="space-y-5">
          <div>
            <h3 className="font-heading text-lg font-bold text-dark mb-1">Last step — how do we reach you?</h3>
            <p className="font-body text-sm text-dark/50 mb-5">We'll call or text to discuss your project and get you a quote.</p>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="survey-name" className="font-body text-sm font-semibold text-dark">Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="survey-name"
              value={data.name}
              onChange={(e) => update('name', e.target.value)}
              required
              className="w-full rounded-none border-2 border-dark/[0.08] bg-white px-5 py-4 font-body text-dark placeholder:text-dark/30 focus:border-gold focus:outline-none focus:ring-0 transition-colors"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="survey-phone" className="font-body text-sm font-semibold text-dark">Phone Number <span className="text-red-500">*</span></label>
            <input
              type="tel"
              id="survey-phone"
              value={data.phone}
              onChange={(e) => update('phone', e.target.value)}
              required
              className="w-full rounded-none border-2 border-dark/[0.08] bg-white px-5 py-4 font-body text-dark placeholder:text-dark/30 focus:border-gold focus:outline-none focus:ring-0 transition-colors"
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="survey-email" className="font-body text-sm font-semibold text-dark">Email Address <span className="text-red-500">*</span></label>
            <input
              type="email"
              id="survey-email"
              value={data.email}
              onChange={(e) => update('email', e.target.value)}
              required
              className="w-full rounded-none border-2 border-dark/[0.08] bg-white px-5 py-4 font-body text-dark placeholder:text-dark/30 focus:border-gold focus:outline-none focus:ring-0 transition-colors"
              placeholder="john@example.com"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center gap-4">
        {step > minStep && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="font-heading text-sm font-medium text-dark/50 transition-colors hover:text-dark"
          >
            ← Back
          </button>
        )}
        <div className="flex-1" />
        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={() => canAdvance() && setStep((s) => s + 1)}
            disabled={!canAdvance()}
            className={`inline-flex items-center gap-2 rounded-none px-8 py-3.5 font-heading text-sm font-semibold transition-all duration-300 ${
              canAdvance()
                ? 'bg-[#fcc33c] text-dark hover:scale-[1.03] hover:shadow-lg active:scale-[0.98]'
                : 'cursor-not-allowed bg-dark/[0.06] text-dark/30'
            }`}
          >
            Continue →
          </button>
        ) : (
          <button
            type="submit"
            disabled={!canAdvance()}
            className={`inline-flex items-center gap-2 rounded-none px-8 py-3.5 font-heading text-sm font-semibold transition-all duration-300 ${
              canAdvance()
                ? 'bg-[#fcc33c] text-dark hover:scale-[1.03] hover:shadow-lg active:scale-[0.98]'
                : 'cursor-not-allowed bg-dark/[0.06] text-dark/30'
            }`}
          >
            Get My Free Estimate →
          </button>
        )}
      </div>
    </form>
  );
}
