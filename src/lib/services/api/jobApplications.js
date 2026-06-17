import { API_BASE_URL } from "../../config.js";

export const getJobApllicationsForJob = async (id) => {
  const token = await window.Clerk.session.getToken();

  const res = await fetch(`${API_BASE_URL}/jobApplications?jobid=${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch job applications (${res.status})`);
  }
  const data = await res.json();
  return data;
};

export const getJobApplicationById = async (id) => {
  const token = await window.Clerk.session.getToken();

  const res = await fetch(`${API_BASE_URL}/jobApplications/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch job application (${res.status})`);
  }
  const data = await res.json();
  return data;
};

export const generateJobApplicationFeedback = async (id) => {
  const token = await window.Clerk.session.getToken();

  const res = await fetch(`${API_BASE_URL}/jobApplications/${id}/feedback`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    let message = `Failed to generate AI feedback (${res.status})`;
    try {
      const data = await res.json();
      message = data.error || data.message || message;
    } catch {
      // Keep the status-based message when the backend does not return JSON.
    }
    throw new Error(message);
  }

  return res.json();
};

export const createJobApplication = async ({
  userId,
  fullName,
  job,
  answers,
}) => {
  const token = await window.Clerk.session.getToken();

  const res = await fetch(`${API_BASE_URL}/jobApplications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: userId,
      fullName: fullName,
      job,
      answers,
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to create job application (${res.status})`);
  }
};
