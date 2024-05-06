import { create } from "zustand";

import { apiInstance, apiInstanceUser } from "../../utils/api";


interface UserResponse {
  data: { id: string; first_name: string; last_name: string }[];
}
interface User {
  id: string;
  rut: string;
  name: string;
  email: string;
  profileCode: string | undefined;
  maternallastname: string;
  paternallastname: string;
  isactive: boolean | undefined;
  district: string | undefined;
}


interface userState {
  usersList: UserResponse;
  user: User
  usersListChat: UserResponse;
  isLoading: boolean;
  isError: boolean;
  error: string;
  getUsers: (ids: string[]) => void;
  getUsersChat: (ids: string[]) => void;
  validate: (email: string, password: string) => void,
  resetUserLists: () => void;
  resetUserListsChat: () => void;

}



export const userStore = create<userState>((set) => ({
  user: { id: "", rut: "", name: "", email: "", profileCode: "", maternallastname: "", paternallastname: "", isactive: false, district: "" },
  usersList: {
    data: [],
  },
  usersListChat: {
    data: [],
  },
 
  isLoading: false,
  isError: false,
  error: "",

  getUsers: async (ids: string[]) => {
    try {
      set((state) => ({ ...state, isLoading: true }));

      const { data } = await apiInstance.post(`/user/getByIds`, { ids });

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
  },
  getUsersChat: async (ids: string[]) => {
    try {
      set((state) => ({ ...state, isLoading: true }));

      const { data } = await apiInstance.post(`/user/getByIds`, { ids });

      set((state) => ({
        ...state,
        usersListChat: data,
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
  },

  validate: async(email: string, password: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstanceUser.post(`/user/validate`, { email, password });
      console.log(data.data)
      set((state) => ({...state, user: data.data, isLoading: false,}));
    } catch (e) {
      set((state) => ({...state, isLoading: false, isError: true, error: (e as Error).message}));
    }
  },
 
  resetUserLists: () => {
    set((state) => ({
      ...state,
      usersList: {
        data: [],
      },
    }));
  },
  resetUserListsChat: () => {
    set((state) => ({
      ...state,
      usersListChat: {
        data: [],
      },
    }));
  },
 
}));