import { emailRegEx } from "./regEx";

export const isValidEmail = (email: string) => {
  return emailRegEx.test(email);
};
