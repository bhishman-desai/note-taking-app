import axios from 'axios';

const API_BASE_URL = 'https://qf9u2og6cb.execute-api.us-east-1.amazonaws.com/prod';

export const createNote = (note) => axios.post(`${API_BASE_URL}/notes`, note, {
    headers: {
        'Content-Type': 'application/json',
    }
});

export const getNotes = () => axios.get(`${API_BASE_URL}/notes`);

export const updateNote = (id, note) => axios.put(`${API_BASE_URL}/notes/${id}`, note, {
    headers: {
        'Content-Type': 'application/json',
    }
});

export const deleteNote = (id) => axios.delete(`${API_BASE_URL}/notes/${id}`);
