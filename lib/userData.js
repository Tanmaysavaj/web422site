import { getToken } from "./authenticate";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`, 
  };
}

// FAVOURITES
export async function getFavourites() {
  const res = await fetch(`${API_URL}/favourites`, {
    headers: getAuthHeaders(),
  });
  return res.ok ? res.json() : [];
}

export async function addToFavourites(id) {
  const res = await fetch(`${API_URL}/favourites/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
  });
  return res.ok ? res.json() : [];
}

export async function removeFromFavourites(id) {
  const res = await fetch(`${API_URL}/favourites/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return res.ok ? res.json() : [];
}

// HISTORY
export async function getHistory() {
  const res = await fetch(`${API_URL}/history`, {
    headers: getAuthHeaders(),
  });
  return res.ok ? res.json() : [];
}

export async function addToHistory(id) {
  const res = await fetch(`${API_URL}/history/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
  });
  return res.ok ? res.json() : [];
}

export async function removeFromHistory(id) {
  const res = await fetch(`${API_URL}/history/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return res.ok ? res.json() : [];
}
