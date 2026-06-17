import { API_BASE_URL } from "../../config.js";

export const getJobs = async () => {
  const res = await fetch(`${API_BASE_URL}/jobs`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch jobs: ${res.status}`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
};

export const getJobById = async (id) => {
  const token = await window.Clerk.session.getToken();

  const res = await fetch(`${API_BASE_URL}/jobs/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export const createJob = async ({
  title,
  description,
  type,
  location,
  questions,
}) => {
  if (!window.Clerk || !window.Clerk.session) {
    throw new Error("Clerk is not initialized properly.");
  }
  const token = await window.Clerk.session.getToken();

  const response = await fetch(`${API_BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      description,
      type,
      location,
      questions,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create job posting (${response.status})`);
  }
};
