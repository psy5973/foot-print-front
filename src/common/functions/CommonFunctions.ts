/**
 *
 * email 정규식
 * @param email
 * @returns boolean
 */
const regExpEmail = (email: string): boolean => {
  const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regExp.test(email);
};
export const CommonFunctions = {
  regExpEmail,
};
