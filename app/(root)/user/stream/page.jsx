"use client";
import { COLLECTION_ID_STREAM, STREAM_API_KEY } from "@/lib/utils";
import { useEvent } from "@/store/evet";
import {
  LivestreamPlayer,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useEffect, useRef, useState } from "react";
import ChatUser from "./_components/ChatUser";
import { fetchEntries } from "@/lib/api";

export default function StreamPage() {
  const [streamData, setStreamData] = useState();
  const [isChatVisible, setIsChatVisible] = useState(true);
  const apiKey = STREAM_API_KEY;
  const userId = "fikserr";
  const clientRef = useRef(null);
  const [call, setCall] = useState(null);
  const user = {
    id: userId,
    name: "fikserr",
  };

  useEffect(() => {
    if (
      streamData?.stream_call_id &&
      streamData?.stream_token &&
      !clientRef.current
    ) {
      clientRef.current = StreamVideoClient.getOrCreateInstance({
        apiKey,
        user,
        token: streamData?.stream_token,
      });
      const existingCall = clientRef.current.call(
        "livestream",
        streamData?.stream_call_id
      );
      disableCallFeatures(existingCall);
      existingCall.join();
      setCall(existingCall);
    }
  }, [streamData]);

  // Kamera va mikrofonni o'chirish funksiyasi
  function disableCallFeatures(call) {
    call.camera.disable();
    call.microphone.disable();
  }

  useEffect(() => {
    (async () => {
      try {
        const stream = await fetchEntries(COLLECTION_ID_STREAM);
        const response = stream.find(
          (stream) => stream.$id === "676c7abd001756b0ff40"
        );
        if (response) {
          setStreamData(response);
          console.log(response);
        }
      } catch (err) {
        console.error("Failed to load service:", err);
        setError("Failed to load service details.");
      }
    })();
  }, []);

  return (
    <StreamVideo client={clientRef.current}>
      <div className="relative w-full">
        {/* Background layer */}
        <div className="absolute inset-0 bg-nav-back bg-yellow-50 blur-[3px] brightness-80 bg-cover bg-center"></div>
        <div className="relative z-10 w-full pt-24 pb-10">
          <div className="container flex justify-center">
            {streamData?.stream_token ? (
              <div className="w-full flex flex-col justify-center bg-black">
                {/* LIVE ko'rsatkich */}
                <div className="w-full flex justify-end px-6 py-5">
                  <div className="flex items-center gap-2 px-3 py-2 border-[1px] border-[#272A31] rounded-lg">
                    <CircleLive />
                    <p className="font-Poppins font-medium textNormall1 leading-5 text-white">
                      LIVE
                    </p>
                  </div>
                </div>

                {/* Translyatsiya pleyeri */}
                <div className="relative h-[calc(100vh-300px)] w-full flex justify-end items-center bg-black">
                  <LivestreamPlayer
                    showLiveBadge={true}
                    showDuration={true}
                    showParticipantCount={true}
                    callType="livestream"
                    callId={streamData?.stream_call_id}
                  />
                  {/* Chat oynasi */}
                  <div
                    className={`absolute right-3   ${
                      isChatVisible ? "" : "hidden"
                    }`}
                  >
                    <ChatUser />
                  </div>
                </div>

                {/* Chatni yoqish/o'chirish tugmasi */}
                <div className="w-full flex justify-end px-6 py-5">
                  <button
                    className={`px-3 py-4 border-[1px] border-[#272A31] rounded-lg ${
                      isChatVisible ? "bg-[#2E3038]" : "bg-transparent"
                    }`}
                    onClick={() => setIsChatVisible(!isChatVisible)}
                  >
                    <ChatIcon />
                  </button>
                </div>
              </div>
            ) : (
              <h1 className="w-full flex justify-center bg-black items-center h-[calc(100vh-300px)] font-Poppins font-bold text-lg">
                Ожидание потока...
              </h1>
            )}
          </div>
        </div>
      </div>
    </StreamVideo>
  );
}

// Placeholder komponentlari (ChatIcon va CircleLive)
function ChatIcon() {
  return <span>💬</span>;
}

function CircleLive() {
  return <span>🔴</span>;
}
