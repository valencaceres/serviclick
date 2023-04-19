import axios from "axios";

export const fetchClerkUser = async (userId: string) => {
  try {
    const response = await axios.get(
      `https://api.clerk.com/v1/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching user data for user: ${userId}`, error);
    return null;
  }
};
