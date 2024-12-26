"use client";
import Loader from "@/components/shared/loader";
import { useEvent } from "@/store/evet";
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useRef, useState, useEffect } from "react";
import MyUiLayout from "@/components/shared/myUiLayout";
import {
  APPWRITE_PROJECT,
  COLLECTION_ID_STREAM,
  DATABASE_ID,
  STREAM_API_KEY,
} from "./utils";
import axios from "axios";
import { addEntry, updateEntry } from "./api";
import { Client, Databases, ID } from "appwrite";

export default function AdminStream() {
  const { tokenApi, callID, setCallID, setTokenApi } = useEvent(
    (state) => state
  );
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(APPWRITE_PROJECT);

  const databases = new Databases(client);

  const apiKey = STREAM_API_KEY;
  const userId = "fikserr";
  const user = {
    id: userId,
    name: "Ziyodakhon",
  };

  const clientRef = useRef(null);
  const [callInstance, setCallInstance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const tokenData = await axios.get("/api/token");
        if (!tokenApi) {
          setTokenApi(tokenData.data);
          setCallID();
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    })();
  }, []);

  useEffect(() => {
    console.log({ callID });

    if (tokenApi && callID) {
      (async () => {
        try {
          const res = await updateEntry(
            COLLECTION_ID_STREAM,
            "676c7abd001756b0ff40",
            {
              stream_token: tokenApi,
              stream_call_id: callID,
            }
          );
          console.log(res);
        } catch (error) {}
      })();
    }
  }, [tokenApi, callID]);

  useEffect(() => {
    if (tokenApi && !clientRef.current) {
      clientRef.current = new StreamVideoClient({
        apiKey,
        user,
        token: tokenApi,
      });
    }
  }, [tokenApi]);

  useEffect(() => {
    if (clientRef.current && callID && tokenApi) {
      const newCall = clientRef.current.call("livestream", callID);
      newCall
        .join({ create: true })
        .then(() => {
          setCallInstance(newCall);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Call join failed:", err);
          setLoading(false);
        });
    }
  }, [callID, tokenApi]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <StreamVideo client={clientRef.current}>
      <StreamCall call={callInstance}>
        <MyUiLayout tokenApi={tokenApi} callID={callID} />
      </StreamCall>
    </StreamVideo>
  );
}
