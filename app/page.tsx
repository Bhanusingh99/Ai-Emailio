import EmailList from "@/components/emails ui/displayALlEmails";
import { auth, EnrichedSession } from "auth";

export default async function Index() {
  const session = (await auth()) as EnrichedSession;

  const accessTokenExpiryDate = new Date(
    session.accessTokenExpiresAt
  ).toLocaleString();
  const accessTokenIssueDate = new Date(
    session.accessTokenIssuedAt
  ).toLocaleString();

  return (
    <div className="w-full relative overflow-hidden">
      <div className="w-full relative">
        <EmailList />
      </div>
    </div>
  );
}
