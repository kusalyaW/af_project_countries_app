import axios from 'axios';
const BASE = 'https://restcountries.com/v3.1';

export const getAll = () => axios.get(`${BASE}/all`);
export const searchByName = (name) => axios.get(`${BASE}/name/${name}`);
export const filterByRegion = (region) => axios.get(`${BASE}/region/${region}`);
export const filterByLang = (lang) => axios.get(`${BASE}/lang/${lang}`);
export const getByCode = (code) => axios.get(`${BASE}/alpha/${code}`);
