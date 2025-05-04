// client/src/tests/Home.integration.test.jsx
import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { AuthContext } from '../context/AuthContext';
import Home from '../pages/Home';
import { vi } from 'vitest';

// 1) Mock the countries API
vi.mock('../api/countries', () => ({
  getAll: vi.fn().mockResolvedValue({
    data: [
      {
        cca3: 'XYZ',
        name: { common: 'Xland', official: 'Republic of Xland' },
        flags: { svg: 'https://example.com/x.svg' },
        population: 12345,
        region: 'Europe',
        capital: ['Xcity'],
        languages: { eng: 'English' },
      },
    ],
  }),
  searchByName:   vi.fn(),
  filterByRegion: vi.fn(),
  filterByLang:   vi.fn(),
}));

describe('Home page (axios mock)', () => {
  it('renders a country card and opens detail modal', async () => {
    // Wrap in AuthContext so useContext(AuthContext) returns an object
    render(
      <AuthContext.Provider value={{ token: '', user: null, logout: () => {} }}>
        <Home />
      </AuthContext.Provider>
    );

    // 2) Wait for the "Xland" card, then click it
    const card = await screen.findByText('Xland');
    fireEvent.click(card);

    // 3) Find the modal's <h2> heading
    const modalHeading = screen.getByRole('heading', {
      level: 2,
      name: /Xland/,
    });
    const modal = within(modalHeading.parentElement);

    // 4) Official name
    expect(modal.getByTestId('modal-official').textContent)
      .toContain('Republic of Xland');

    // 5) Population: strip non-digits and assert numeric value
    const popEl = modal.getByTestId('modal-population');
    const popDigits = popEl.textContent.replace(/\D/g, '');
    expect(popDigits).toBe('12345');

    // 6) Region, Capital, Languages
    expect(modal.getByTestId('modal-region').textContent)
      .toContain('Europe');
    expect(modal.getByTestId('modal-capital').textContent)
      .toContain('Xcity');
    expect(modal.getByTestId('modal-languages').textContent)
      .toContain('English');
  });
});
