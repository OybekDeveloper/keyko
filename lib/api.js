"use client";

import axios from "axios";
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT, DATABASE_ID } from "./utils";

const apiClient = axios.create({
  baseURL: APPWRITE_ENDPOINT,
  headers: {
    "X-Appwrite-Project": APPWRITE_PROJECT,
  },
});

export const fetchEntries = async (collectionId) => {
  try {
    const response = await apiClient.get(
      `/databases/${DATABASE_ID}/collections/${collectionId}/documents`
    );
    return response.data.documents;
  } catch (error) {
    console.error(
      "Error fetching entries:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const addEntry = async (collectionId, data) => {
  try {
    await apiClient.post(
      `/databases/${DATABASE_ID}/collections/${collectionId}/documents`,
      {
        documentId: "unique()",
        data: data,
      }
    );
  } catch (error) {
    console.error("Error adding entry:", error.response?.data || error.message);
    throw error;
  }
};

export const updateEntry = async (collectionId, documentId, data) => {
  try {
    const response = await apiClient.patch(
      `/databases/${DATABASE_ID}/collections/${collectionId}/documents/${documentId}`,
      { data }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating entry:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export const deleteEntry = async (collectionId, id) => {
  try {
    await apiClient.delete(
      `/databases/${DATABASE_ID}/collections/${collectionId}/documents/${id}`
    );
  } catch (error) {
    console.error(
      "Error deleting entry:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}
