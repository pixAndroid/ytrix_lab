'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator, QrCode, Code, Palette, FileText, Percent,
  ArrowRight, X, Copy, Check, DollarSign,
} from 'lucide-react';

// ─── EMI Calculator ───────────────────────────────────────────────────────────
function EMICalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [result, setResult] = useState<{ emi: number; total: number; interest: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100;
    const n = parseFloat(tenure);
    if (!p || !r || !n) return;
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    setResult({ emi, total, interest: total - p });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount (₹)</label>
          <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="e.g. 500000" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Annual Interest Rate (%)</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="e.g. 8.5" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tenure (months)</label>
          <input type="number" value={tenure} onChange={e => setTenure(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="e.g. 60" />
        </div>
      </div>
      <button onClick={calculate}
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
        Calculate EMI
      </button>
      {result && (
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">Monthly EMI</div>
            <div className="font-bold text-blue-700 text-lg">₹{result.emi.toFixed(0)}</div>
          </div>
          <div className="bg-violet-50 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">Total Payment</div>
            <div className="font-bold text-violet-700 text-lg">₹{result.total.toFixed(0)}</div>
          </div>
          <div className="bg-rose-50 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">Total Interest</div>
            <div className="font-bold text-rose-700 text-lg">₹{result.interest.toFixed(0)}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── QR Generator ─────────────────────────────────────────────────────────────
function QRGenerator() {
  const [text, setText] = useState('');
  const [qrUrl, setQrUrl] = useState('');

  const generate = () => {
    if (!text) return;
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(text)}`);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Enter URL or Text</label>
        <textarea value={text} onChange={e => setText(e.target.value)}
          rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          placeholder="https://yantrixlab.com" />
      </div>
      <button onClick={generate}
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
        Generate QR Code
      </button>
      {qrUrl && (
        <div className="flex flex-col items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrUrl} alt="QR Code" className="w-48 h-48 rounded-xl border border-gray-200" />
          <a href={qrUrl} download="qrcode.png"
            className="text-sm text-blue-600 hover:underline">Download QR Code</a>
        </div>
      )}
    </div>
  );
}

// ─── JSON Formatter ───────────────────────────────────────────────────────────
function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const format = () => {
    setError('');
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (e) {
      setError(String(e));
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Input JSON</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={5}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none font-mono text-sm"
          placeholder='{"key": "value"}' />
      </div>
      <button onClick={format}
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
        Format JSON
      </button>
      {error && <p className="text-red-500 text-sm p-3 bg-red-50 rounded-lg">{error}</p>}
      {output && (
        <div className="relative">
          <button onClick={copy} className="absolute top-3 right-3 p-1.5 bg-gray-200 hover:bg-gray-300 rounded-lg">
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-gray-600" />}
          </button>
          <pre className="p-4 bg-gray-900 text-green-400 rounded-xl text-xs overflow-auto max-h-48 font-mono">{output}</pre>
        </div>
      )}
    </div>
  );
}

// ─── Color Picker ─────────────────────────────────────────────────────────────
function ColorPickerTool() {
  const [color, setColor] = useState('#3b82f6');
  const [copied, setCopied] = useState<string | null>(null);

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const hexToHsl = (hex: string) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h /= 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const copy = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(val);
    setTimeout(() => setCopied(null), 2000);
  };

  const values = [
    { label: 'HEX', value: color },
    { label: 'RGB', value: hexToRgb(color) },
    { label: 'HSL', value: hexToHsl(color) },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-4">
        <div className="w-full h-32 rounded-2xl border-2 border-gray-200 shadow-inner" style={{ backgroundColor: color }} />
        <input type="color" value={color} onChange={e => setColor(e.target.value)}
          className="w-16 h-16 rounded-xl cursor-pointer border-2 border-gray-200 p-1" />
      </div>
      <div className="space-y-2">
        {values.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <span className="text-xs font-semibold text-gray-500 w-8">{label}</span>
            <span className="text-sm font-mono text-gray-800 flex-1 ml-3">{value}</span>
            <button onClick={() => copy(value)} className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors">
              {copied === value ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-gray-500" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── GST Calculator ───────────────────────────────────────────────────────────
function GSTCalculator() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('18');
  const [type, setType] = useState<'exclusive' | 'inclusive'>('exclusive');
  const [result, setResult] = useState<{ gst: number; total: number; base: number } | null>(null);

  const calculate = () => {
    const a = parseFloat(amount);
    const r = parseFloat(rate) / 100;
    if (!a || !r) return;
    if (type === 'exclusive') {
      const gst = a * r;
      setResult({ gst, total: a + gst, base: a });
    } else {
      const base = a / (1 + r);
      const gst = a - base;
      setResult({ gst, total: a, base });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter amount" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">GST Rate (%)</label>
          <select value={rate} onChange={e => setRate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white">
            {['5', '12', '18', '28'].map(r => <option key={r} value={r}>{r}%</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">GST Type</label>
          <select value={type} onChange={e => setType(e.target.value as 'exclusive' | 'inclusive')}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white">
            <option value="exclusive">Exclusive</option>
            <option value="inclusive">Inclusive</option>
          </select>
        </div>
      </div>
      <button onClick={calculate}
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
        Calculate GST
      </button>
      {result && (
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">Base Amount</div>
            <div className="font-bold text-blue-700">₹{result.base.toFixed(2)}</div>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">GST ({rate}%)</div>
            <div className="font-bold text-amber-700">₹{result.gst.toFixed(2)}</div>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">Total</div>
            <div className="font-bold text-emerald-700">₹{result.total.toFixed(2)}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Text Diff Checker ────────────────────────────────────────────────────────
function TextDiffChecker() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diff, setDiff] = useState<{ added: number; removed: number; similar: number } | null>(null);

  const check = () => {
    const words1 = text1.split(/\s+/).filter(Boolean);
    const words2 = text2.split(/\s+/).filter(Boolean);
    const set1 = new Set(words1);
    const set2 = new Set(words2);
    const added = words2.filter(w => !set1.has(w)).length;
    const removed = words1.filter(w => !set2.has(w)).length;
    const similar = words1.filter(w => set2.has(w)).length;
    setDiff({ added, removed, similar });
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Original Text</label>
          <textarea value={text1} onChange={e => setText1(e.target.value)} rows={5}
            className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm"
            placeholder="Paste original text..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">New Text</label>
          <textarea value={text2} onChange={e => setText2(e.target.value)} rows={5}
            className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm"
            placeholder="Paste new text..." />
        </div>
      </div>
      <button onClick={check}
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
        Compare Texts
      </button>
      {diff && (
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-emerald-50 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">Added Words</div>
            <div className="font-bold text-emerald-700 text-xl">+{diff.added}</div>
          </div>
          <div className="bg-rose-50 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">Removed Words</div>
            <div className="font-bold text-rose-700 text-xl">-{diff.removed}</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">Common Words</div>
            <div className="font-bold text-blue-700 text-xl">{diff.similar}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Tools Page ──────────────────────────────────────────────────────────
const tools = [
  { icon: DollarSign, title: 'EMI Calculator', desc: 'Calculate monthly loan EMI with principal, interest rate and tenure.', color: 'from-blue-500 to-blue-600', component: EMICalculator },
  { icon: QrCode, title: 'QR Code Generator', desc: 'Generate QR codes for URLs, text, or any data instantly.', color: 'from-violet-500 to-violet-600', component: QRGenerator },
  { icon: Code, title: 'JSON Formatter', desc: 'Format, validate and beautify JSON data with syntax highlighting.', color: 'from-emerald-500 to-emerald-600', component: JSONFormatter },
  { icon: Palette, title: 'Color Picker', desc: 'Pick colors and get HEX, RGB, and HSL values instantly.', color: 'from-pink-500 to-pink-600', component: ColorPickerTool },
  { icon: Percent, title: 'GST Calculator', desc: 'Calculate GST amounts for exclusive and inclusive pricing.', color: 'from-amber-500 to-amber-600', component: GSTCalculator },
  { icon: FileText, title: 'Text Diff Checker', desc: 'Compare two texts and find differences and similarities.', color: 'from-cyan-500 to-cyan-600', component: TextDiffChecker },
];

export default function ToolsPageClient() {
  const [activeTool, setActiveTool] = useState<(typeof tools)[0] | null>(null);

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-28 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-6">
            Free Online{' '}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Tools</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto">
            Handy developer and business tools — completely free to use.
          </motion.p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
              >
                <button
                  onClick={() => setActiveTool(tool)}
                  className="group w-full text-left p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-5`}>
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{tool.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 group-hover:gap-2.5 transition-all">
                    Open Tool <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Modal */}
      <AnimatePresence>
        {activeTool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveTool(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeTool.color} flex items-center justify-center`}>
                    <activeTool.icon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{activeTool.title}</h2>
                </div>
                <button onClick={() => setActiveTool(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <activeTool.component />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
