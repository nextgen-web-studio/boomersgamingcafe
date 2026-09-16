// React API Client
export const API_BASE = 'http://127.0.0.1:8000';

export async function fetchWithMockFallback(path) {
  try {
    const res = await fetch(\\);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Backend offline, using mock data");
    return getMockData(path);
  }
}

function getMockData(path) {
  return null; // Add mock logic here
}
