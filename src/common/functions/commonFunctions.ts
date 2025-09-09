/**
 *
 * email 정규식
 * @param email
 * @returns boolean
 */
const isEmailPatternValid = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const isPasswordPatternValid = (password: string) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  return passwordRegex.test(password);
};

export const commonFunctions = {
  isEmailPatternValid,
  isPasswordPatternValid,
};
