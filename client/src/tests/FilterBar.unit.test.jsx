// client/src/__tests__/FilterBar.unit.test.jsx
import { render, fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';
import FilterBar from '../components/filterBar';

test('FilterBar calls handlers on input and selects', () => {
  const fns = {
    setSearch: vi.fn(),
    setRegion: vi.fn(),
    setLang: vi.fn(),
    setSort:   vi.fn(),
  };

  render(
    <FilterBar
      search="" setSearch={fns.setSearch}
      region="" setRegion={fns.setRegion}
      lang=""   setLang={fns.setLang}
      sort=""   setSort={fns.setSort}
    />
  );

  // type into search
  fireEvent.change(screen.getByPlaceholderText(/search by name/i), {
    target: { value: 'Brazil' }
  });
  expect(fns.setSearch).toHaveBeenCalledWith('Brazil');

  // change region
  fireEvent.change(screen.getByDisplayValue('All Regions'), {
    target: { value: 'Asia' }
  });
  expect(fns.setRegion).toHaveBeenCalledWith('Asia');

  // change language
  fireEvent.change(screen.getByDisplayValue('All Languages'), {
    target: { value: 'es' }
  });
  expect(fns.setLang).toHaveBeenCalledWith('es');
});
