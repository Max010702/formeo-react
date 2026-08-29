export const serverApi: string = import.meta.env.VITE_REACT_APP_API_URL ?? "";

export const Messages = {
  error1: "Something went wrong",
  error2: "Please log in first",
  error3: "Please fill in all required fields",
  error4: "Message cannot be empty",
  error5: "Only JPEG, JPG, and PNG images are allowed",
} as const;
