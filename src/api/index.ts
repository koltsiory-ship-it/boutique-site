import axios from 'axios';
import type { Produit, Categorie } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({ baseURL: API_URL });

// Produits
export const getProduits = (params?: {
  categorie_id?: number;
  search?: string;
}) => api.get<Produit[]>('/api/produits', { params }).then(r => r.data);

export const getProduit = (id: number) =>
  api.get<Produit>(`/api/produits/${id}`).then(r => r.data);

// Catégories
export const getCategories = () =>
  api.get<Categorie[]>('/api/categories').then(r => r.data);

// URL complète d'une photo
export const getPhotoUrl = (photo: string | null): string =>
  photo ? `${API_URL}${photo}` : '/placeholder.jpg';