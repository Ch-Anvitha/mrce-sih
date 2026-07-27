import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login on session expiration
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login?expired=true';
      }
    }
    return Promise.reject(error);
  }
);

export const submitRegistration = async (formDataState) => {
  const { team, leader, members, payment } = formDataState;

  const allParticipants = [
    { ...leader, gender: leader.gender },
    ...(members?.members || [])
  ];

  const hasFemale = allParticipants.some(p => p.gender?.toUpperCase() === 'FEMALE');
  if (!hasFemale) {
    throw new Error('At least one female participant is required (Leader or Member).');
  }

  const rolls = allParticipants.map(p => p.rollNumber?.toUpperCase());
  if (new Set(rolls).size !== rolls.length) {
    throw new Error('Duplicate roll numbers found among participants.');
  }

  const emails = allParticipants.map(p => p.email?.toLowerCase());
  if (new Set(emails).size !== emails.length) {
    throw new Error('Duplicate emails found among participants.');
  }

  const mappedLeader = {
    name: leader.leaderName,
    rollNumber: leader.rollNumber.toUpperCase(),
    email: leader.email,
    phone: leader.phoneNumber,
    gender: leader.gender.toUpperCase(),
    department: leader.branch,
    year: Number(leader.year),
    section: leader.section?.toUpperCase() || "A"
  };

  const mappedMembers = (members?.members || []).map((m) => ({
    name: m.name,
    rollNumber: m.rollNumber.toUpperCase(),
    email: m.email,
    phone: m.phoneNumber,
    gender: m.gender.toUpperCase(),
    department: m.department,
    year: Number(m.year),
    section: m.section?.toUpperCase() || "A"
  }));

  const payloadJson = {
    teamName: team.teamName,
    problemStatement: team.problemStatementTitle, // Mapped to the string requirement
    leader: mappedLeader,
    members: mappedMembers,
    payment: {
      transactionId: payment.transactionId,
      amount: 500
    }
  };

  // Since it's a multipart/form-data with a nested JSON, 
  // the backend uses `parseMultipartJson` middleware which parses req.body if it's sent as flat fields or as a string.
  // Express multer + json usually expects the JSON payload to be stringified under a specific key, 
  // OR the `parseMultipartJson` middleware processes all keys. Let's send the JSON stringified under 'data' 
  // or stringify individual fields. I will stringify the entire object and send it. 
  // Wait, looking at common middleware `parseMultipartJson`, it usually parses fields that look like JSON strings.
  
  const formData = new FormData();
  // Append JSON fields
  Object.keys(payloadJson).forEach(key => {
    if (typeof payloadJson[key] === 'object') {
      formData.append(key, JSON.stringify(payloadJson[key]));
    } else {
      formData.append(key, payloadJson[key]);
    }
  });

  // Append file
  if (payment.paymentScreenshot) {
    formData.append('paymentScreenshot', payment.paymentScreenshot);
  }

  const response = await apiClient.post('/registrations', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};

// ----------------------------------------------------------------------
// Edit Registration Methods
// ----------------------------------------------------------------------

export const fetchRegistrationById = async (registrationId) => {
  const response = await apiClient.get(`/registrations/${registrationId}`);
  return response.data;
};

export const getRegistrationStatus = async (registrationId) => {
  const response = await apiClient.get(`/registrations/check/${registrationId}`);
  return response.data;
};

// Admin Actions
export const approveRegistration = async (registrationId, remarks) => {
  const response = await apiClient.patch(`/registrations/${registrationId}/approve`, { remarks });
  return response.data;
};

export const rejectRegistration = async (registrationId, remarks) => {
  const response = await apiClient.patch(`/registrations/${registrationId}/reject`, { remarks });
  return response.data;
};

export const lockRegistration = async (registrationId) => {
  const response = await apiClient.patch(`/registrations/${registrationId}/lock`);
  return response.data;
};

export const unlockRegistration = async (registrationId) => {
  const response = await apiClient.patch(`/registrations/${registrationId}/unlock`);
  return response.data;
};

// ----------------------------------------------------------------------
// Export
// ----------------------------------------------------------------------
export const exportRegistrations = async (params = {}) => {
  const response = await apiClient.get('/registrations/export', {
    params,
    responseType: 'blob', // crucial for downloading files
  });
  return response; // Return full response to get headers for filename
};

// ----------------------------------------------------------------------
// Admin Methods
// ----------------------------------------------------------------------

export const fetchAdminRegistrations = async (params = {}) => {
  const response = await apiClient.get('/registrations', { params });
  return response.data;
};

export const fetchRegistrationByEditCode = async (editCode) => {
  const response = await apiClient.get(`/registrations/edit/${editCode}`);
  const backendData = response.data.data;
  
  // Inverse Mapper: Backend Schema -> Frontend formData State
  
  // Helper to format names back to Title Case if needed, or just keep as is
  const leaderData = backendData.leader;
  
  // Clean members list (remove dummy emails if we want, or just keep them)
  const memberData = backendData.members || [];
  
  const hydratedFormData = {
    team: {
      teamName: backendData.teamName,
      problemStatementTitle: backendData.problemStatement,
      agreeToRules: true
    },
    leader: {
      leaderName: leaderData.name,
      rollNumber: leaderData.rollNumber,
      email: leaderData.email,
      phoneNumber: leaderData.phone,
      gender: leaderData.gender.charAt(0) + leaderData.gender.slice(1).toLowerCase(),
      branch: leaderData.department,
      year: leaderData.year.toString(),
      section: leaderData.section || ''
    },
    members: {
      members: memberData.map(m => ({
        name: m.name,
        rollNumber: m.rollNumber,
        email: m.email,
        phoneNumber: m.phone,
        gender: m.gender.charAt(0) + m.gender.slice(1).toLowerCase(),
        department: m.department,
        year: m.year.toString(),
        section: m.section || ''
      }))
    },
    payment: {
      transactionId: backendData.payment?.transactionId || "",
      // Hydrate with a placeholder for the existing file so schema validation passes
      paymentScreenshot: { name: 'Existing Receipt.jpg', size: 0, type: 'image/jpeg', isExisting: true } 
    }
  };

  return {
    raw: backendData,
    formData: hydratedFormData
  };
};

export const updateRegistration = async (registrationId, editCode, formDataState) => {
  const { team, leader, members, payment } = formDataState;

  const allParticipants = [
    { ...leader, gender: leader.gender },
    ...(members?.members || [])
  ];

  const hasFemale = allParticipants.some(p => p.gender?.toUpperCase() === 'FEMALE');
  if (!hasFemale) {
    throw new Error('At least one female participant is required (Leader or Member).');
  }

  const rolls = allParticipants.map(p => p.rollNumber?.toUpperCase());
  if (new Set(rolls).size !== rolls.length) {
    throw new Error('Duplicate roll numbers found among participants.');
  }

  const emails = allParticipants.map(p => p.email?.toLowerCase());
  if (new Set(emails).size !== emails.length) {
    throw new Error('Duplicate emails found among participants.');
  }

  const mappedLeader = {
    name: leader.leaderName,
    rollNumber: leader.rollNumber.toUpperCase(),
    email: leader.email,
    phone: leader.phoneNumber,
    gender: leader.gender.toUpperCase(),
    department: leader.branch,
    year: Number(leader.year),
    section: leader.section?.toUpperCase() || "A" 
  };

  const mappedMembers = (members?.members || []).map((m) => ({
    name: m.name,
    rollNumber: m.rollNumber.toUpperCase(),
    email: m.email, 
    phone: m.phoneNumber, 
    gender: m.gender.toUpperCase(),
    department: m.department,
    year: Number(m.year),
    section: m.section?.toUpperCase() || "A" 
  }));

  const payloadJson = {
    editCode: editCode, // REQUIRED for update
    teamName: team.teamName,
    problemStatement: team.problemStatementTitle,
    leader: mappedLeader,
    members: mappedMembers,
    payment: {
      transactionId: payment.transactionId,
      amount: 500
    }
  };

  const formData = new FormData();
  Object.keys(payloadJson).forEach(key => {
    if (typeof payloadJson[key] === 'object') {
      formData.append(key, JSON.stringify(payloadJson[key]));
    } else {
      formData.append(key, payloadJson[key]);
    }
  });

  if (payment.paymentScreenshot && !payment.paymentScreenshot.isExisting && payment.paymentScreenshot instanceof File) {
    formData.append('paymentScreenshot', payment.paymentScreenshot);
  }

  const response = await apiClient.patch(`/registrations/${registrationId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};
