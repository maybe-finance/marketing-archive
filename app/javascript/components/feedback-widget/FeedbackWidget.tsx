import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";

function FeedbackWidget(): JSX.Element {
  type State = "closed" | "feedback" | "sent";
  const [state, setState] = useState<State>("closed");
  const [comment, setComment] = useState<string>("");

  // Close on esc
  const escFunction = useCallback(
    (e) => {
      if (e.keyCode === 27 && state !== "closed") {
        setState("closed");
      }
    },
    [state]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [state]);

  return (
    <div className="fixed bottom-0 right-0 z-50 w-full max-w-sm p-5">
      <div
        className={`p-4 mb-4 space-y-3 bg-gray-900 rounded-lg ${
          state !== "feedback" && "hidden"
        }`}
      >
        <textarea
          className="w-full h-40 p-4 border-none resize-none bg-full-black focus:border-teal focus:ring-teal focus:ring focus:ring-opacity-50 rounded-xl placeholder-gray"
          placeholder="Your feedback here."
          id="feedback-comment"
          value={comment}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setComment(e.target.value)
          }
        ></textarea>
        <div className="flex justify-between">
          <button
            className="px-4 py-2 text-sm font-semibold text-white bg-gray-700 rounded-md appearance-none hover:bg-gray-600 focus:bg-gray-600 focus:ring focus:ring-offset-gray-900 focus:ring-offset-2 focus:ring-gray-700"
            onClick={() => setState("closed")}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm font-semibold text-black rounded-md appearance-none bg-teal disabled:opacity-50 disabled:cursor-not-allowed focus:ring focus:ring-teal focus:ring-opacity-50"
            disabled={comment.length < 5}
            onClick={async () => {
              setState("sent");
              await axios
                .create({
                  transformRequest: [(data) => JSON.stringify(data)],
                })
                .post(
                  "https://hooks.zapier.com/hooks/catch/10143005/buyo6na/",
                  { comment, page: window.location.href },
                  { headers: { Accept: "application/json" } }
                );
              setComment("");
              setTimeout(() => {
                setState("closed");
              }, 5000);
            }}
          >
            Send Feedback
          </button>
        </div>
        <p className="text-xs text-gray-100">
          Help us improve our tool, by letting us know if you have any
          suggestions or if you ran into any issues.
        </p>
      </div>
      <div
        className={`p-4 mb-4 space-y-3 bg-gray-900 rounded-lg ${
          state !== "sent" && "hidden"
        }`}
      >
        <div className="flex flex-col justify-center w-full h-40 overflow-hidden rounded-lg ">
          <video
            src="/videos/feedback-widget/keanu-reeves-kiss.mp4"
            className="w-full"
            autoPlay
            loop
            muted
            playsInline
          ></video>
        </div>
        <div className="text-center">
          <p className="pb-2 text-sm font-semibold">
            Thank you for your feedback 🙏
          </p>
          <p className="pb-4 text-xs text-gray-100">
            Every little bit helps us make Maybe better.
          </p>
          <p className="text-xs text-gray-100">The Maybe team</p>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="inline-flex items-center px-3 py-2 text-sm font-semibold leading-none text-white bg-gray-900 border border-white rounded-lg cursor-pointer border-opacity-10 whitespace-nowrap hover:bg-gray-800 focus:bg-gray-800 focus:ring focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-black"
          onClick={() => {
            const newState = state === "closed" ? "feedback" : "closed";
            setState(newState);
          }}
        >
          <i className="flex-shrink-0 mr-2 text-xl font-normal leading-none ri-feedback-line"></i>
          Was this tool helpful?
        </button>
      </div>
    </div>
  );
}

export default FeedbackWidget;
