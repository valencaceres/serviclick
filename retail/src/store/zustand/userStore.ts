import { create } from "zustand";
import jwt from 'jsonwebtoken'

import { apiInstance, apiInstanceUser } from "../../utils/api";


interface UserResponse {
  data: { id: string; first_name: string; last_name: string }[];
}
interface Roles {
  id: string,
  code: string,
  name: string
}
interface User {
  id: string;
  rut: string;
  name: string;
  email: string;
  maternallastname: string;
  paternallastname: string;
  roles: Roles[]
  district: string | undefined;
  address: string,
  phone: string
}

export interface MyJwtPayload {
  id: string;
  personId: string;
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string,
  email: string
  address: string;
  district?: string;
  phone: string;
  roles: { id: string; code: string; name: string }[];
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
  user: { id: "", rut: "", name: "", email: "", maternallastname: "", paternallastname: "", roles: [], district: "", address: '', phone: '' },
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

  
validate: async (email: string, password: string) => {
  try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstanceUser.post(`/user/validate`, { email, password });
      if (data.success) {
          localStorage.setItem('jwtToken', data.data);
          const decodedToken = jwt.decode(data.data) as MyJwtPayload | null;
          console.log(decodedToken)
          if (decodedToken) {
              const { id, rut, name, paternalLastName, maternalLastName, roles, email, address, phone, district } = decodedToken;
              const user: User = { id: id, rut, name, paternallastname: paternalLastName, maternallastname: maternalLastName, roles, email, address, phone, district };
              set((state) => ({ ...state, user, isLoading: false }));
          } else {
              console.log('No funciono 1')
          }
      } else {
          console.log('No funciono 2')
      }
  } catch (e) {
      set((state) => ({ ...state, isLoading: false, isError: true, error: (e as Error).message }));
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