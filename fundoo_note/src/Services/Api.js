import axios from "axios";
const API_BASE_URL = "http://127.0.0.1:8000/note/";
const token = localStorage.getItem("accessToken");

// Register API Call
export function registerApiCall(payload) {
  return axios.post("http://127.0.0.1:8000/user/register/", payload,{
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
  })
}

// Login API Call
export function loginApiCall(payload) {
  return axios.post("http://localhost:8000/user/login/", payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })

}

// api define


export const addNoteApi = async (note) => {
  const response = await axios.post(API_BASE_URL, note, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchArchiveNotesApi = async () => {
  const response = await axios.get(`${API_BASE_URL}archived_notes/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


export const updateNoteApi = async (noteId, endpoint) => {
    const response = await axios.put(`${API_BASE_URL}${noteId}/${endpoint}/`, null, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  export const deleteNoteApi = async (noteId) => {
    await axios.delete(`${API_BASE_URL}${noteId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };


  export const fetchtrashNotesApi = async () => {
    const response = await axios.get(`${API_BASE_URL}trashed_notes/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  export const fetchNotesApi = async () => {
    const response = await axios.get(`${API_BASE_URL}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };


  export const changeNoteColorApi = async (noteId, newColor) => {
        const response = await axios.put(`${API_BASE_URL}${noteId}/change_color/`, 
        { color: newColor }, 
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, 
            },
        });
        return response.data;
      } 

      export const updateTitleDescriptionApi = async (noteId, newTitle, newDescription) => {
        const response = await axios.put(
          `${API_BASE_URL}${noteId}/edit_note/`,
          {
            title: newTitle,
            description: newDescription
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Ensure token is defined elsewhere
            },
          }
        );
        return response.data;
      };
      