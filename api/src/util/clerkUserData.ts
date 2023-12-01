import axios from "axios";
import { IClerkUser } from "../interfaces/person";
export const fetchtAllClerkUsers = async () => {
  try {
    const response = await axios.get("https://api.clerk.com/v1/users", {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });

    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching users", error);

    return {
      success: false,
      data: null,
      error: "Error fetching users",
    };
  }
};
export const fetchCreateClerkUser = async (input: IClerkUser) => {
  const commonData = {
    first_name: input.name,
    last_name: input.last_name,
    email_address: [input.email_address],
    public_metadata: {
      roles: {
        [input.role_admin]: input.type_role_admin,
        [input.role_broker]: input.type_role_broker,
        [input.role_operations]: input.type_role_operations,
        [input.role_serviclick]: input.type_role_serviclick,
        [input.role_retail]: input.type_role_retail,
        [input.role_web_admin]: input.type_role_web_admin,
      },
    },
    password: input.password,
  };
  try {
    const response = await axios.post(
      `https://api.clerk.com/v1/users`,
      commonData,
      {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
      }
    );
    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Error creating users",
    };
  }
};
export const fetchUpdateClerkUser = async (id: string, input: IClerkUser) => {
  const commonData: {
    first_name: string;
    last_name: string;
    email_address: string[];
    public_metadata: {
      roles: {
        admin: "user" | "admin" | "moderator";
        broker: "user" | "admin" | "moderator";
        operaciones: "user" | "admin" | "moderator";
        serviclick: "user" | "admin" | "moderator";
        retail: "user" | "admin" | "moderator";
        web_admin: "user" | "admin" | "moderator";
      };
    };
    password?: string;
  } = {
    first_name: input.name,
    last_name: input.last_name,
    email_address: [input.email_address],
    public_metadata: {
      roles: {
        admin: input.type_role_admin,
        broker: input.type_role_broker,
        operaciones: input.type_role_operations,
        serviclick: input.type_role_serviclick,
        retail: input.type_role_retail,
        web_admin: input.type_role_web_admin,
      },
    },
  };
  if (input.password && input.password.trim() !== "") {
    commonData.password = input.password;
  }
  try {
    const response = await axios.patch(
      `https://api.clerk.com/v1/users/${id}`,
      commonData,
      {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
      }
    );
    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Error updating user",
    };
  }
};
export const fetchDeleteClerkUser = async (id: string) => {
  try {
    const response = await axios.delete(
      `https://api.clerk.com/v1/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
      }
    );
    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Error deleting user",
    };
  }
};

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
    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (error) {
    console.error(`Error fetching user data for user: ${userId}`);
    return {
      success: false,
      data: null,
      error: "Error fetching users",
    };
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
