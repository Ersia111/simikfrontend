const API_BASE_URL = "https://simik.onrender.com/api";

export async function registerUser(userData) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text || "Gabim gjatë regjistrimit.");
  }

  return text;
}

export async function loginUser(loginData) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Gabim gjatë login.");
  }

  return data;
}

export async function getAllJobs() {
  const response = await fetch(`${API_BASE_URL}/jobs`);

  if (!response.ok) {
    throw new Error("Gabim gjatë marrjes së njoftimeve.");
  }

  return response.json();
}

export async function applyToJob(applicationData) {
  const response = await fetch(`${API_BASE_URL}/applications/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(applicationData),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text || "Gabim gjatë aplikimit.");
  }

  return text;
}

export async function createJob(jobData) {
  const response = await fetch(`${API_BASE_URL}/jobs/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jobData),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text || "Gabim gjatë krijimit të njoftimit.");
  }

  return text;
}

export async function getPackages() {
  const response = await fetch(`${API_BASE_URL}/packages`);

  if (!response.ok) {
    throw new Error("Gabim gjatë marrjes së paketave.");
  }

  return response.json();
}

export async function buyPackage(data) {
  const response = await fetch(`${API_BASE_URL}/packages/buy`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text || "Gabim gjatë blerjes së paketës.");
  }

  return text;
}

export async function getApplicationsByJob(jobPostId) {
  const response = await fetch(`${API_BASE_URL}/applications/job/${jobPostId}`);

  if (!response.ok) {
    throw new Error("Gabim gjatë marrjes së aplikimeve.");
  }

  return response.json();
}

export async function getApplicationsByEmployee(email) {
  const response = await fetch(
    `${API_BASE_URL}/applications/employee/${email}`
  );

  if (!response.ok) {
    throw new Error("Gabim gjatë marrjes së aplikimeve.");
  }

  return response.json();
}

export async function saveEmployeeProfile(profileData) {
  const formData = new FormData();

  formData.append("employeeEmail", profileData.employeeEmail);
  formData.append("fullName", profileData.fullName);
  formData.append("phoneNumber", profileData.phoneNumber);
  formData.append("profession", profileData.profession);
  formData.append("skills", profileData.skills);
  formData.append("bio", profileData.bio);

  if (profileData.cv) {
    formData.append("cv", profileData.cv);
  }

  if (profileData.portfolio) {
    formData.append("portfolio", profileData.portfolio);
  }

  const response = await fetch(`${API_BASE_URL}/employee-profile/save`, {
    method: "POST",
    body: formData,
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text || "Gabim gjatë ruajtjes së profilit.");
  }

  return text;
}

export async function uploadCv(email, file) {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/files/upload-cv`, {
    method: "POST",
    body: formData,
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text || "Gabim gjatë ngarkimit të CV.");
  }

  return text;
}

export async function uploadPortfolio(email, file) {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/files/upload-portfolio`, {
    method: "POST",
    body: formData,
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text || "Gabim gjatë ngarkimit të portfolio.");
  }

  return text;
}

export async function getEmployeeProfile(email) {
  const response = await fetch(`${API_BASE_URL}/employee-profile/${email}`);

  if (!response.ok) {
    throw new Error("Profili i punonjësit nuk u gjet.");
  }

  return response.json();
}

export async function getPendingSubscriptions() {
  const response = await fetch(`${API_BASE_URL}/packages/pending`);

  if (!response.ok) {
    throw new Error("Gabim gjatë marrjes së kërkesave.");
  }

  return response.json();
}

export async function approveSubscription(id) {
  const response = await fetch(`${API_BASE_URL}/packages/approve/${id}`, {
    method: "PUT",
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text || "Gabim gjatë aprovimit.");
  }

  return text;
}

export async function rejectSubscription(id) {
  const response = await fetch(`${API_BASE_URL}/packages/reject/${id}`, {
    method: "PUT",
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text || "Gabim gjatë refuzimit.");
  }

  return text;
}

export async function getEmployerSubscriptions(email) {
  const response = await fetch(`${API_BASE_URL}/packages/employer/${email}`);

  if (!response.ok) {
    throw new Error("Gabim gjatë marrjes së paketave.");
  }

  return response.json();
}