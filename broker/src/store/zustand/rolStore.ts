import { create } from "zustand";
import jwt from "jsonwebtoken";

import { apiInstance, apiInstanceUser } from "../../utils/api";
import {IUserRol} from '../../interfaces/rol'

interface rolState {
  rol: IUserRol
  rolList: IUserRol[]
  isLoading: boolean;
  isError: boolean;
  error: string;
  getRolById: (id: string) => void;
}

const initialDataRol = {
  id: '',
  user_id: '',
  agent_id: '',
  agent_type: ''
}

export const rolStore = create<rolState>((set) => ({
  rol: initialDataRol,
  rolList: [],
  isLoading: false,
  isError: false,
  error: "",

  getRolById: async (id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstanceUser.get(`/user/getUserRolAgent/${id}`);
      set((state) => ({
        ...state,
        rolList: data.data,
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
