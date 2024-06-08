"use client";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";

const SetOpenApiKey: React.FC = () => {
  const router = useRouter();
  const [apiKey, setApiKey] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (apiKey) {
      localStorage.setItem("openai_api_key", apiKey);
      toast.success("API key has been saved!");
      setApiKey(""); // Clear the input field
      router.push("/emails");
    } else {
      toast.error("Please enter a valid API key.");
    }
  };

  return (
    <div className="text-white w-full h-full">
      <h1 className="text-[3rem] font-bold text-center">Set OpenAI API Key</h1>
      <form onSubmit={handleSubmit} className="flex flex-col mt-16">
        <label htmlFor="api-key-input" className="text-left">
          API Key:
        </label>
        <input
          type="text"
          id="api-key-input"
          value={apiKey}
          onChange={handleInputChange}
          required
          className="w-[60%] max-md:w-full py-2.5 bg-transparent outline-none border px-4 rounded-[10px]"
        />
        <button
          type="submit"
          className="text-center mt-6 bg-purple-600 py-2.5 w-[60%] max-md:w-full"
        >
          Save API Key
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default SetOpenApiKey;
