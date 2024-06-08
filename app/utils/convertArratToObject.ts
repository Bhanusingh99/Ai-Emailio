interface Email {
  sender: string;
  recipient: string;
  subject: string;
  snippet: string;
  body: string;
  category?: string;
}

export function convertArrayToObject(
  array: string[],
  emails: Email[]
): Email[] {
  const categories = ["Promotional", "Social", "Marketing", "Spam"];

  for (let i = 0; i < emails.length; i++) {
    const emailSubject = emails[i].subject;

    for (let j = 0; j < array.length; j++) {
      const stringItem = array[j];

      if (stringItem.includes(emailSubject)) {
        const matches = stringItem.match(/==> \*\*(.*?)\*\*/);
        if (matches && matches.length > 1) {
          const category = matches[1];
          // Check if the extracted category is one of the predefined categories
          if (categories.includes(category)) {
            emails[i].category = category;
            break; // No need to continue searching once a match is found
          }
        }
      }
    }
  }

  return emails;
}
interface EmailObject {
  name: string;
  label: string;
}

export function createObjectFromArray(array: string[]): EmailObject[] {
  const objects: EmailObject[] = [];

  for (const str of array) {
    if (str.trim() !== "" && str.includes(" ==> ")) {
      const [nameWithStars, label] = str.split(" ==> ");
      const name = nameWithStars.split("**")[1]; // Removing stars
      objects.push({ name, label: label.trim() });
    }
  }

  return objects;
}
