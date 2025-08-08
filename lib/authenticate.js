import { jwtDecode } from "jwt-decode"; 

export function getToken() {
  return localStorage.getItem("access_token");
}

export function setToken(token) {
  localStorage.setItem("access_token", token);
}

export function removeToken() {
  localStorage.removeItem("access_token");
}

export function readToken() {
  const token = getToken();
  try {
    return token ? jwtDecode(token) : null;
  } catch (err) {
    console.error("JWT decode error:", err);
    return null;
  }
}


export function isAuthenticated() {
  return !!getToken();
}


export async function authenticateUser(user, password) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName: user, password }),
  });

  if (res.status === 200) {
    const data = await res.json();
    setToken(data.token);
    return true;
  } else {
    const err = await res.json();
    throw new Error(err.message || "Invalid login.");
  }
}

export async function registerUser(user, password, password2) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName: user, password, password2 }),
  });

  if (res.status === 200) {
    return true;
  } else {
    const err = await res.json();
    throw new Error(err.message || "Registration failed.");
  }
}
