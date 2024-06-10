"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { RefreshCcw } from "lucide-react";
import { generateEmail } from "@/app/utils/generateEmail";
import { Toaster, toast } from "react-hot-toast";
import { cleanEmailBody } from "@/app/utils/cleanEmailBody";
import axios from "axios";

const EmailPopUp = () => {
  const [prompt, setPrompt] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [subject, setSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  const handelSendEmails = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/emails/send-email",
        {
          emailAddress, // Pass the actual email address variable
          body: emailBody,
          subject,
        }
      );
      if (res.status === 200) {
        toast.success("email send successfully");
        setEmailAddress("");
        setEmailBody("");
        setSubject("");
      }
    } catch (error: any) {
      toast.error(
        "email not send, something went wrong, please try again later"
      );
      // Handle error if needed
    }
  };

  const handleGenerateEmail = async () => {
    setSubject("");
    setEmailBody("");
    if (!prompt.includes("email") && !prompt.includes("Email")) {
      return toast.error("Please mention 'email' in your prompt.");
    }
    const generatedEmail = await generateEmail(prompt);
    if (generatedEmail) {
      const email: any = generatedEmail
        .replace("```", "")
        .replace("```", "")
        .replace("javascript", "")
        .replace("json", "")
        .split(' "," ')[0]
        .replace(`"subject"`, `subject`)
        .replace(`"emailBody"`, `emailBody`)
        .replace(`"body"`, `emailBody`)
        .replace("{", "")
        .replace("}", "")
        .replace("\n", " ")
        .replace(`subject:`, ` `)
        .replace(`emailBody:`, "")
        .replace(`Subject:`, "")
        .replace("\n\n* **", " ")
        .replace("\n\nI", " ")
        .split(`",`);

      setSubject(email[0]);
      setEmailBody(cleanEmailBody(email[1]));

      toast.success("Email generated successfully!", {
        className: "bg-green-500 text-white p-4 rounded-md",
      });
    }
  };

  return (
    <div className="">
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #444",
            padding: "16px",
            color: "white",
            background: "#020817",
          },
        }}
      />
      <AlertDialog>
        <AlertDialogTrigger className="morphismEffect text-white px-3 py-2 text-[14px] font-semibold">
          Send Email
        </AlertDialogTrigger>
        <AlertDialogContent className="emailBody text-white rounded-[20px] border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[24px] font-semibold">
              Send Smarter, Write Faster:
              <span className="text-green-600 underline"> AI-Powered</span>{" "}
              Email Magic at Your Fingertips
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="py-2 my-1">
                <p>Email</p>
                <input
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  type="text"
                  placeholder="recipient@example.com"
                  className="w-full py-2.5 border bg-[#020817] px-4 rounded-[10px] border-gray-700"
                />
              </div>
              <div className="py-2 my-1">
                <p>Subject</p>
                <input
                  type="text"
                  onChange={(e) => setSubject(e.target.value)}
                  value={subject}
                  placeholder="I like Indian Foods"
                  className="w-full py-2.5 border bg-[#020817] px-4 rounded-[10px] border-gray-700"
                />
              </div>
              <div className="py-2 my-1">
                <p>Email Body</p>
                <textarea
                  value={emailBody}
                  onChange={(e) => {
                    setEmailBody(e.target.value);
                  }}
                  placeholder="
                    I hope this email finds you well.
                    My name is Bhanu singh, and I am a front-end developer with [X years] of experience in building responsive and user-friendly web applications. I am writing to express my interest in potential front-end development opportunities at [Company Name].
                    Thank you for considering my application. I look forward to the possibility of contributing to [Company Name] and am excited about the opportunity to discuss this further.
                    Best regards,
                    Bhanu singh"
                  className="w-full text-[13px] py-2.5 border h-52 bg-[#020817] px-4 rounded-[10px] border-gray-700 font-light"
                />
              </div>

              <div className="py-2 my-2 flex justify-between items-end w-full">
                <div className="w-[70%]">
                  <p>Enter Your Prompt</p>
                  <input
                    onChange={(e) => setPrompt(e.target.value)}
                    value={prompt}
                    type="text"
                    placeholder="write a cold email for a frontend opportunity"
                    className="w-full py-2.5 border bg-[#020817] px-4 rounded-[10px] border-gray-700"
                  />
                </div>
                <div
                  onClick={handleGenerateEmail}
                  className="morphismEffect cursor-pointer px-4 py-2 h-10 flex justify-between items-center gap-1"
                >
                  Generate
                  <RefreshCcw size={16} />
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="morphismEffect">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="morphismEffect"
              onClick={handelSendEmails}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EmailPopUp;
