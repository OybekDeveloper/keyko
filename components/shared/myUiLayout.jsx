"use client";
import {
  Camera,
  ChatIcon,
  Circle,
  CircleLive,
  Leave,
  Members,
  MicUnMute,
} from "@/lib/functions";
import { useEvent } from "@/store/evet";
import {
  ParticipantView,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import AdminChat from "./adminChat";

const MyUiLayout = ({ tokenApi, callID }) => {
  const call = useCall();
  const {
    useIsCallLive,
    useCameraState,
    useMicrophoneState,
    useLocalParticipant,
    useParticipantCount,
  } = useCallStateHooks();
  const { microphone: mic, isEnabled: isMicEnabled } = useMicrophoneState();
  const { camera: cam, isEnabled: isCamEnabled } = useCameraState();
  const participantCount = useParticipantCount();
  const localParticipant = useLocalParticipant();
  const isCallLive = useIsCallLive();
  const [seeChat, setSeeChat] = useState(true);

  useEffect(() => {}, []);

  function StartStream() {
    if (!isCallLive) {
      call?.goLive();
    } else if (isCallLive) {
      call?.stopLive();
    }
  }

  return (
    <div className="">
      <div className="h-[calc(100vh-120px)] w-full bg-black flex flex-col items-center justify-center relative">
        <div className="w-full flex justify-end px-6 py-1 absolute top-0 z-10 bg-black">
          <div className="flex items-center gap-2 px-3 py-2 border-[1px] border-[#272A31] rounded-lg ">
            {isCallLive ? <CircleLive /> : <Circle />}

            <p className="font-Poppins font-medium textNormall1 md:leading-5 text-white">
              LIVE
            </p>
          </div>
        </div>
        <div className="h-full relative w-full flex justify-center items-center">
          <ParticipantView
            participant={localParticipant}
            style={{
              width: "100vw", 
              height: "50vh", 
            }}
          />
          <div className={`absolute right-0 ${seeChat ? "" : "hidden"}`}>
            <AdminChat />
          </div>
        </div>

        <div className="flex py-1 justify-between items-center px-6 w-full  absolute bottom-0 z-10 bg-black">
          <div className="flex gap-2 md:gap-6">
            <button
              onClick={() => mic.toggle()}
              className={`px-1 py-1 md:px-3 md:py-2 border-[1px] border-[#272A31] rounded-lg ${
                isMicEnabled ? "bg-[#2E3038]" : "bg-transparent"
              }`}
            >
              {" "}
              <MicUnMute />{" "}
            </button>
            <button
              onClick={() => cam.toggle()}
              className={`px-1 py-1 md:px-3 md:py-2 border-[1px] border-[#272A31] rounded-lg ${
                isCamEnabled ? "bg-[#2E3038]" : "bg-transparent"
              }`}
            >
              {" "}
              <Camera />{" "}
            </button>
          </div>
          <button
            onClick={() => StartStream()}
            className={`font-Poppins font-medium textNormall1 px-3 py-2 border-[1px] border-[#272A31] rounded-lg ${
              isCallLive ? "bg-[#C74E5B]" : "bg-[#3cdb57]"
            }`}
          >
            {isCallLive ? <Leave /> : "Boshlash"}
          </button>

          <div className="flex gap-2 md:gap-6">
            <div className="flex items-center px-1 py-1 md:px-3 md:py-2 border-[1px] border-[#272A31] rounded-lg">
              <Members />
              <p className="font-Poppins font-medium text-lg leading-5 text-white">
                {participantCount}
              </p>
            </div>

            <button
              onClick={() => setSeeChat(!seeChat)}
              className={`px-1 py-1 md:px-3 md:py-2 border-[1px] border-[#272A31] rounded-lg ${
                seeChat ? "bg-[#2E3038]" : "bg-transparent"
              }`}
            >
              <ChatIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyUiLayout;
