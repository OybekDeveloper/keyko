import axios from "axios";
import {
  APPWRITE_PROJECT,
  COLLECTION_ID_USERS,
  DATABASE_ID,
  NEXT_PUBLIC_URL,
  STREAM_API_KEY,
} from "./utils";
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";

export const ApiService = {
  async getToken() {
    const response = await axios.get(`${NEXT_PUBLIC_URL}/api/token`);
    return response;
  },
  async getTokenUser({ name }) {
    const response = await axios.post(`${NEXT_PUBLIC_URL}/api/user`, {
      name: name,
    });
    return response;
  },
};

export const createUser = async (userData, tokenApiUser) => {
  const chatClient = new StreamChat(STREAM_API_KEY);

  const data = {
    FirstName: userData.first_name,
    LastName: userData.last_name,
    PhoneNumber: userData.phone,
    Password: userData.password,
    Role: "user",
  };

  try {
    // Axios orqali hujjat yaratish
    const response = await axios.post(
      `https://cloud.appwrite.io/v1/databases/${DATABASE_ID}/collections/${COLLECTION_ID_USERS}/documents`,
      {
        data,
        documentId: uuidv4(),
      },
      {
        headers: {
          "X-Appwrite-Project": APPWRITE_PROJECT,
          "Content-Type": "application/json",
        },
      }
    );

    // if (response.data && tokenApiUser) {
    //   console.log(tokenApiUser);
    //   const newUser = {
    //     id: response?.data?.$id,
    //     name: userData?.first_name,
    //     image: "https://link.to/avatar.png",
    //   };
    //   await chatClient.connectUser(newUser, String(tokenApiUser));
    // }

    console.log("Foydalanuvchi yaratildi:", response.data);
  } catch (error) {
    console.error("Xatolik yuz berdi:", error.message);
  }
};

