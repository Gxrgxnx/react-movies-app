export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
  return passwordRegex.test(password);
};

export const validateUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
  return usernameRegex.test(username);
};
