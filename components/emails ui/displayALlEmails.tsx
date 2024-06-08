"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { cleanEmailBody } from "@/app/utils/cleanEmailBody";
import { ShimmerEffect } from "../shimmer ui/emailsCardShimmerEffect";
import { classifyEmails } from "@/app/utils/classifyEmails";
import emails from "@/app/api/emails";

interface Email {
  sender: string;
  recipient: string;
  subject: string;
  snippet: string;
  body: string;
  category?: string;
}
interface values {
  name: string;
  label: string;
}

const EmailList: React.FC = () => {
  const [classifiedEmails, setClassifiedEmails] = useState<any>([]);
  const [emails, setEmails] = useState<Email[]>([]); // State to hold the list of emails
  const [numEmails, setNumEmails] = useState<number>(10); // State to hold the number of emails to fetch, default is 10
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false); // State to control the sidebar visibility
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null); // State to hold the currently selected email
  const hasFetchedEmails = useRef(false); // Ref to track if emails have been fetched
  const [classify, setClassify] = useState(false);

  useEffect(() => {
    // Function to fetch emails from the API
    const fetchEmails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/emails/get-all-emails`
        );
        setEmails(response.data.emails); // Set the emails state with the fetched data

        // Classify the emails after fetching them
        const generatedArray = await classifyEmails(response.data.emails);
        setClassifiedEmails(generatedArray);
      } catch (error) {
        console.error(error); // Log any errors that occur during the fetch
      }
    };

    if (!hasFetchedEmails.current) {
      fetchEmails(); // Call fetchEmails on component mount
      hasFetchedEmails.current = true; // Set the ref to true after fetching emails
    }
  }, []); // Empty dependency array to ensure the effect runs only once

  // Handler to update the number of emails to display based on user selection
  const handleNumEmailsChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNumEmails(Number(event.target.value)); // Update the numEmails state with the selected value
  };

  // Handler to set the selected email and open the sidebar
  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email); // Set the selected email state
    setIsSidebarOpen(true); // Open the sidebar
  };

  useEffect(() => {
    const updatedEmails = emails.map((email) => {
      for (const classifiedEmail of classifiedEmails) {
        if (email.subject.includes(classifiedEmail.name)) {
          // Remove ** from the start and end if they exist
          const labelWithoutAsterisks = classifiedEmail.label.replace(
            /^\*{2}|\*{2}$/g,
            ""
          );
          return { ...email, category: labelWithoutAsterisks };
        }
      }
      return email;
    });
    setEmails(updatedEmails);
  }, [classifiedEmails]);

  // Function to render the email body, either as HTML or plain text
  const renderEmailBody = (body: string) => {
    if (body.startsWith("<")) {
      // If the body starts with "<", treat it as HTML
      return (
        <div
          className="email-body"
          dangerouslySetInnerHTML={{ __html: body }} // Render HTML directly
        />
      );
    } else {
      // Otherwise, treat it as plain text and clean it
      return <p className="email-body">{cleanEmailBody(body)}</p>;
    }
  };

  return (
    <div className="relative text-white w-[65%] mx-auto max-md:w-[95%]">
      {emails.length === 0 ? (
        <ShimmerEffect />
      ) : (
        <>
          {/* Dropdown to select the number of emails to fetch */}
          <div className="w-full flex justify-between">
            <select
              id="numEmails"
              onChange={handleNumEmailsChange}
              value={numEmails}
              className="morphismEffect text-[20px] font-semibold px-6 py-2 mb-16 outline-none cursor-pointer"
            >
              <option value={10} className="bg-purple-400">
                10
              </option>
              <option value={20} className="bg-purple-400">
                20
              </option>
              <option value={30} className="bg-purple-400">
                30
              </option>
            </select>

            <div
              onClick={() => setClassify((prevClassify) => !prevClassify)}
              className="morphismEffect px-6 h-11 cursor-pointer flex items-center font-bold"
            >
              Classify
            </div>
          </div>

          {/* List of emails */}
          {emails.slice(0, numEmails).map((email, index) => (
            <div
              key={index}
              className={`border-[1px] p-4 mb-8 rounded morphismEffect cursor-pointer`}
              onClick={() => handleEmailClick(email)}
            >
              <div className="flex justify-between">
                <p>
                  <strong>From:</strong>{" "}
                  {
                    email.sender
                      .split("<")
                      .join("")
                      .split(">")
                      .join()
                      .split(" ")[0]
                  }
                </p>
                <p
                  className={` ${classify ? "flex font-bold" : "hidden"}  ${
                    email.category?.split("*").join("") === "Important"
                      ? "text-green-500 "
                      : `${
                          email.category?.split("*").join("") === "Marketing"
                            ? "text-yellow-500"
                            : email.category?.split("*").join("") === "Spam"
                            ? "text-red-500"
                            : email.category?.split("*").join("") ===
                              "Promotional"
                            ? "text-yellow-400 font-bold"
                            : ""
                        }`
                  }`}
                >
                  {!email.category?.split("*")
                    ? "loading"
                    : email.category?.split("*")}
                </p>
              </div>
              <p>
                <strong>To:</strong>{" "}
                {
                  email.recipient
                    .split("<")
                    .join("")
                    .split(">")
                    .join()
                    .split(" ")[0]
                }
              </p>
              <p>
                <strong>Subject:</strong> {email.subject}
              </p>
            </div>
          ))}

          {/* Sidebar for displaying the selected email */}
          {isSidebarOpen && selectedEmail && (
            <div className="fixed top-0 right-0 h-full w-[500px] max-lg:w-[500px] max-md:w-[400px] max-sm:w-[300px] morphismEffect text-white p-4 shadow-lg z-50 overflow-y-scroll">
              <button
                onClick={() => setIsSidebarOpen(false)} // Close sidebar on button click
                className="text-right block ml-auto mb-4"
              >
                Close
              </button>
              <div className="flex justify-between w-full">
                <h2 className="text-lg font-bold mb-2">
                  {selectedEmail.subject}
                </h2>
                <p
                  className={` ${classify ? "flex font-bold" : "hidden"}  ${
                    selectedEmail.category?.split("*").join("") === "Important"
                      ? "text-green-500 "
                      : `${
                          selectedEmail.category?.split("*").join("") ===
                          "Marketing"
                            ? "text-yellow-500"
                            : selectedEmail.category?.split("*").join("") ===
                              "Spam"
                            ? "text-red-500"
                            : selectedEmail.category?.split("*").join("") ===
                              "Promotional"
                            ? "text-yellow-400 font-bold"
                            : ""
                        }`
                  }`}
                >
                  {!selectedEmail.category?.split("*")
                    ? "loading"
                    : selectedEmail.category?.split("*")}
                </p>
              </div>
              <p>
                <strong>From:</strong>{" "}
                {
                  selectedEmail.sender
                    .split("<")
                    .join("")
                    .split(">")
                    .join()
                    .split(" ")[0]
                }
              </p>
              <p>
                <strong>To:</strong> {selectedEmail.recipient}
              </p>
              <div className="mt-4 text-[14px]">
                {renderEmailBody(selectedEmail.body)}{" "}
                {/* Render the email body */}
              </div>
            </div>
          )}
        </>
      )}
      <style jsx>{`
        .email-body {
          overflow-wrap: break-word; /* Ensure long words break appropriately */
          word-wrap: break-word; /* For IE < 10 */
          word-break: break-all; /* Break words if necessary */
          max-width: 100%; /* Ensure body does not overflow */
        }
      `}</style>
    </div>
  );
};

export default EmailList;
