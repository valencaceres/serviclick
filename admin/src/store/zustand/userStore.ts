import { create } from "zustand";

import { apiInstance } from "../../utils/api";

import { ApiResponse, User, userResponse } from "../../interfaces/user";
interface userState {
  list: ApiResponse;
  user: userResponse;
  isLoading: boolean;
  isError: boolean;
  error: string;
  getUsers: () => void;
  getUserByid: (id: string) => void;
  createUser: (
    body: any,
    options?: { onSuccess?: () => void }
  ) => Promise<void>;
  deleteUser: (
    id: string,
    options?: { onSuccess?: () => void }
  ) => Promise<void>;
  updateUser: (
    id: string,
    body: any,
    options?: { onSuccess?: () => void }
  ) => Promise<void>;
  reset: () => void;
  resetAll: () => void;
}

const initialData: ApiResponse = {
  data: [],
  success: false,
};
const initialUser: userResponse = {
  success: false,
  data: {
    username: "",
    first_name: "",
    birthday: "",
    has_image: false,
    backup_code_enabled: false,
    banned: false,
    create_organization_enabled: false,
    created_at: 0,
    delete_self_enabled: false,
    email_addresses: [],
    external_accounts: [],
    external_id: "",
    gender: "",
    id: "",
    image_url: "",
    last_name: "",
    last_sign_in_at: 0,
    locked: false,
    object: "",
    password_enabled: false,
    phone_numbers: [],
    primary_email_address_id: "",
    primary_phone_number_id: null,
    primary_web3_wallet_id: null,
    private_metadata: {},
    profile_image_url: "",
    public_metadata: {
      roles: {
        admin: "user",
        broker: "user",
        retail: "user",
        operations: "user",
        serviclick: "user",
      },
    },
    remaining_lockout_duration_in_seconds: null,
    saml_accounts: [],
    totp_enabled: false,
    two_factor_enabled: false,
    unsafe_metadata: {},
    updated_at: 0,
    web3_wallets: [],
  },
};

export const userStore = create<userState>((set, get) => ({
  list: initialData,
  user: initialUser,
  isLoading: false,
  isError: false,
  error: "",

  set: (userstate: ApiResponse) => {
    set((state) => ({ ...state, userstate }));
  },

  getUsers: async () => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`user/getAllClerkUsers`);
      set((state) => ({
        ...state,
        list: data,
        isLoading: false,
        isError: false,
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
  getUserByid: async (id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`user/getUserByClerkId/${id}`);
      set((state) => ({
        ...state,
        user: data,
        isLoading: false,
        isError: false,
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
  createUser: async (body: any, options?: { onSuccess?: () => void }) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.post(`user/createClerkUser`, body);
      set((state) => ({
        ...state,
        user: data,
        isLoading: false,
        isError: false,
      }));

      if (options?.onSuccess) {
        options.onSuccess();
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
  updateUser: async (
    id: string,
    body: any,
    options?: { onSuccess?: () => void }
  ) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.patch(
        `user/updateClerkUser/${id}`,
        body
      );
      set((state) => ({
        ...state,
        user: data,
        isLoading: false,
        isError: false,
      }));

      if (options?.onSuccess) {
        options.onSuccess();
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
  deleteUser: async (id: string, options?: { onSuccess?: () => void }) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.delete(`user/deleteUserById/${id}`);
      set((state) => ({
        ...state,
        isLoading: false,
        isError: false,
      }));
      if (options?.onSuccess) {
        options.onSuccess();
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

  reset: () =>
    set((state) => ({
      ...state,
      retail: initialData,
      isLoading: false,
      isError: false,
      error: "",
    })),
  resetAll: () => set({}, true),
}));
