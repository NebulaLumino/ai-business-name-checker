'use client';
import { useState } from 'react';
export default function Page() {
  const [form, setForm] = useState({ name: '', industry: '' });
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const generate = async () => {
    setLoading(true);
    const r = await fetch('/api/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    const d = await r.json();
    setAnalysis(d.analysis || 'Error'); setLoading(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-slate-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">🔍 Business Name Availability Checker</h1>
        <p className="text-emerald-300 mb-6">Check domain, trademark, and brandability of your business name</p>
        <input placeholder="Business Name" className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 mb-3" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="Industry (e.g. SaaS, Retail, Finance)" className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 mb-4" value={form.industry} onChange={e => setForm({...form, industry: e.target.value})} />
        <button onClick={generate} disabled={loading} className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 px-6 py-3 rounded font-semibold w-full">
          {loading ? 'Checking...' : 'Check Name'}
        </button>
        {analysis && <div className="mt-6 bg-slate-800 rounded-lg p-6 whitespace-pre-wrap text-sm text-slate-300">{analysis}</div>}
      </div>
    </div>
  );
}
