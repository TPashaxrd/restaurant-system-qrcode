import axios from 'axios';

export const sendSupportMessage = async (message: string, username: string, gender: string) => {
  try {
    const response = await axios.post('/api/support', {
      message,
      username,
      gender,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending message", error);
    throw error;
  }
};
