import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { CgClose } from "react-icons/cg";
import { FaMicrophone } from "react-icons/fa";

const VoiceToText = ({ setShowVoiceText }) => {
  const navigate = useNavigate();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleVoicing = () => {
    setShowVoiceText(true);
    if (!listening) {
      SpeechRecognition.startListening();
    } else {
      SpeechRecognition.stopListening();
    }
  };

  useEffect(() => {
    if (!listening && transcript !== "") {
      navigate(`/searchResult/${transcript}`);
      setShowVoiceText(false);
    }
  }, [navigate, transcript, listening]);

  return (
    <div className="relative top-[180px] md:left-[130px]  lg:left-0 z-0">
      <div className="bg-[#212121]   w-[80vw]  lg:w-[50vw]  h-[320px] md:h-[400px] flex items-center justify-center z-20 "></div>
      <div
        onClick={() => setShowVoiceText(false)}
        className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-[#0f0f0f] opacity-40 cursor-pointer"
      ></div>
      <div className="absolute inset-0 text-white z-50  pl-4 lg:pl-10 md:pr-1 lg:pr-2 py-1 ">
        <div className="flex flex-col">
          <div className="flex justify-end items-center mt-2">
            <div
              className="flex items-center justify-center cursor-pointer h-10 w-10 rounded-full hover:bg-[#3f3f3f]/[0.6]"
              onClick={() => {
                setShowVoiceText(false);
                SpeechRecognition.stopListening();
                resetTranscript();
              }}
            >
              <CgClose className="text-white text-xl" />
            </div>
          </div>
          {listening ? (
            <p className="text-white text-xl font-semibold tracking-wide mt-2 mb-5 leading-8">
              Listening...
            </p>
          ) : (
            <p className="text-white text-xl font-semibold tracking-wide mt-2 mb-5 leading-8">
              Search with your voice{" "}
            </p>
          )}

          <p className="text-white text-xl font-medium tracking-wide my-5 leading-8">
            {transcript}
          </p>

          <div className="flex flex-col items-center justify-center">
            <div className="flex  ">
              {/* Microphone button */}
              <button
                className={` h-20 w-20 rounded-full flex items-center justify-center ${
                  listening ? "bg-red-600" : "hover:bg-[#3f3f3f]/[0.6]"
                } `}
                onClick={handleVoicing}
              >
                <FaMicrophone className="text-white text-3xl" />
              </button>
            </div>

            {browserSupportsSpeechRecognition ? (
              <p className="text-white/[0.7] text-sm font-medium mt-3">
                Speak now or click the microphone to start listening
              </p>
            ) : (
              <p className="text-white/[0.7] text-sm font-medium mt-3">
                Browser doesn't support speech recognition.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceToText;
