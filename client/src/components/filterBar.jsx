import React from 'react';
import Select from 'react-select';

const regions   = ['Africa','Americas','Asia','Europe','Oceania'];
const languages = ['en','es','fr','ar','ru','zh'];

const sortOptions = [
  { value: '',           label: 'Default'      },
  { value: 'name-asc',   label: 'Name A→Z'     },
  { value: 'name-desc',  label: 'Name Z→A'     },
  { value: 'pop-asc',    label: 'Population ↑' },
  { value: 'pop-desc',   label: 'Population ↓' },
];

export default function FilterBar({
  region,    setRegion,
  lang,      setLang,
  search,    setSearch,
  sort,      setSort,      
}) {
  return (
    <div className="flex flex-wrap gap-4 mb-4 items-center">
      
      <input
        type="text"
        placeholder="Search by name…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border p-2 flex-1 min-w-[200px] dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      />

      
      <div className="min-w-[150px]">
        <Select
          options={sortOptions}
          value={sortOptions.find(o => o.value === sort) || sortOptions[0]}
          onChange={opt => setSort(opt.value)}
          className="dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          isSearchable={false}
          placeholder="Sort…"
          
        />
      </div>

      <select
        value={region}
        onChange={e => setRegion(e.target.value)}
        className="border p-2 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      >
        <option value="">All Regions</option>
        {regions.map(r => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>

      <select
        value={lang}
        onChange={e => setLang(e.target.value)}
        className="border p-2 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      >
        <option value="">All Languages</option>
        {languages.map(l => (
          <option key={l} value={l}>{l.toUpperCase()}</option>
        ))}
      </select>
    </div>
  );
}
