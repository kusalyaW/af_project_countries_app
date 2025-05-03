import React from 'react';

const regions = ['Africa','Americas','Asia','Europe','Oceania'];
const languages = ['en','es','fr','ar','ru','zh'];

const FilterBar = ({ region, setRegion, lang, setLang, search, setSearch, onFilter }) => (
  <div className="flex flex-wrap gap-4 mb-4">
    <input
      type="text"
      placeholder="Search by name..."
      value={search}
      onChange={e => setSearch(e.target.value)}
      onKeyDown={e => e.key === 'Enter' && onFilter()}
      className="border p-2 flex-1"
    />
    <select value={region} onChange={e => setRegion(e.target.value)} className="border p-2">
      <option value="">All Regions</option>
      {regions.map(r => <option key={r} value={r}>{r}</option>)}
    </select>
    <select value={lang} onChange={e => setLang(e.target.value)} className="border p-2">
      <option value="">All Languages</option>
      {languages.map(l => <option key={l} value={l}>{l}</option>)}
    </select>
    <button onClick={onFilter} className="bg-blue-500 text-white px-4 py-2">Filter</button>
  </div>
);

export default FilterBar;
