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
    console.error(`Error fetching user data for user: ${userId}`);
    return null;
  }
};

export const updateClerkUser = async (data: any) => {
  try {
    const response = await axios.patch(
      `https://api.clerk.com/v1/users/${data.user_id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(`Error updating user data for user: ${data.user_id}`, error);
    return null;
  }
};
