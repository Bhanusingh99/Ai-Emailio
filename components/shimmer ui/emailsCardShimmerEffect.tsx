import React from "react";

const EmailCardShimmerEffect = () => {
  return (
    <div className="card br morphismEffect w-[90%] max-md:w-[90%] mt-8">
      <div className="wrapper">
        <div className="comment br animate w80"></div>
        <div className="comment br animate"></div>
        <div className="comment br animate"></div>
      </div>
    </div>
  );
};

export const ShimmerEffect = () => {
  return (
    <div className="w-full bg-black">
      <div className="w-[90%] mx-auto px-6 py-3 morphismEffect">
        <h3 className="text-center text-[24px] font-semibold text-green-500 max-md:text-[16px]">
          This Website backend is deployed on Render so on first reload it take
          50 second
        </h3>
        <p className="my-2 text-center">
          This website is using Google Gemini Api, because OpenAi is Paid and I
          am Poor 🥹🥹
        </p>
      </div>
      <EmailCardShimmerEffect />
      <EmailCardShimmerEffect />
      <EmailCardShimmerEffect />
      <EmailCardShimmerEffect />
    </div>
  );
};
