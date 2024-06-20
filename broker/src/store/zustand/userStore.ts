import { create } from "zustand";
import jwt from "jsonwebtoken";

import { apiInstance, apiInstanceUser } from "../../utils/api";

import { IUser, IUserList } from "../../interfaces/user";

interface userState {
  userItem: IUser;
  usersList: IUserList[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  validate: (email: string, password: string) => void;
  getRolById: (id: string) => void;
}

export const userStore = create<userState>((set) => ({
  userItem: {
    id: "",
    personId: "",
    rut: "",
    name: "",
    email: "",
    maternalLastName: "",
    paternalLastName: "",
    districtName: "",
    address: "",
    phone: "",
    roles: [],
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
  },
  usersList: [],
  isLoading: false,
  isError: false,
  error: "",

  validate: async (email: string, password: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));

      const { data } = await apiInstanceUser.post(`/user/validate`, {
        email,
        password,
      });

      if (!data.success) {
        set((state) => ({
          ...state,
          isLoading: false,
          isError: true,
          error: data.error,
        }));
      }

      const decodedToken = jwt.decode(data.data) as IUser | null;
      if (!decodedToken) {
        set((state) => ({
          ...state,
          isLoading: false,
          isError: true,
          error: "Token inválido",
        }));
      }

      localStorage.setItem("jwtToken", data.data);

      if (decodedToken) {
        set((state) => ({
          ...state,
          userItem: decodedToken,
          isLoading: false,
        }));
      }
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
  getRolById: async (id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstanceUser.get(`/rol/getById/${id}`);
      set((state) => ({
        ...state,
        usersList: data,
        isLoading: false,
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  }
}));
