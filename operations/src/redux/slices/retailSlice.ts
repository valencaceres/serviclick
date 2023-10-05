import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

export type PriceT = {
  customer: number;
  company: number;
};

export type ProductT = {
  product_id: string;
  productplan_id: string;
  name: string;
  campaign: string;
  price: PriceT;
  currency: string;
  frequency: string;
};

export type UserT = {
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  email: string;
  profileCode: string;
};

export type CustomerT = {
  customer_id: string;
  customer_rut: string;
  customer_name: string;
  customer_paternalLastName: string;
  customer_maternalLastName: string;
  customer_address: string;
  customer_district: string;
  customer_phone: string;
  customer_email: string;
  insured_id: string;
  insured_rut: string;
  insured_name: string;
  insured_paternalLastName: string;
  insured_maternalLastName: string;
  insured_address: string;
  insured_district: string;
  insured_phone: string;
  insured_email: string;
  insured_birthDate: string;
  createDate: string;
  initialDate: string;
  endDate: string;
};

export type RetailT = {
  id: string;
  rut: string;
  name: string;
  legalRepresentative: string;
  line: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  logo: string;
  products: ProductT[];
  insured: number;
  users: UserT[];
};

export type StateT = {
  list: RetailT[];
  customers: CustomerT[];
  selectedProduct: ProductT | null;
  retail: RetailT;
  loading: boolean;
  error: boolean;
};

const initialState: StateT = {
  list: [],
  customers: [],
  selectedProduct: null,
  retail: {
    id: "",
    rut: "",
    name: "",
    legalRepresentative: "",
    line: "",
    address: "",
    district: "",
    email: "",
    phone: "",
    logo: "",
    products: [],
    insured: 0,
    users: [],
  },
  loading: false,
  error: false,
};

export const retailSlice = createSlice({
  name: "retails",
  initialState,
  reducers: {
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: StateT, action: PayloadAction<boolean>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setList: (state: StateT, action: PayloadAction<RetailT[]>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = false;
    },
    setRetail: (state: StateT, action: PayloadAction<RetailT>) => {
      state.retail = action.payload;
      state.loading = false;
      state.error = false;
    },
    setCustomers: (state: StateT, action: PayloadAction<CustomerT[]>) => {
      state.customers = action.payload;
      state.loading = false;
      state.error = false;
    },
    setSelectedProduct: (state: StateT, action: PayloadAction<ProductT>) => {
      state.selectedProduct = action.payload;
    },
    setLogo: (state: StateT, action: PayloadAction<string>) => {
      state.retail.logo = action.payload;
      state.loading = false;
      state.error = false;
    },
    resetRetail: (state: StateT) => {
      state.retail = initialState.retail;
      state.loading = false;
      state.error = false;
    },
    resetLogo: (state: StateT) => {
      state.retail.logo = initialState.retail.logo;
      state.loading = false;
      state.error = false;
    },
    reset: (state: StateT) => {
      state = initialState;
    },
  },
});

export const {
  setList,
  setRetail,
  setCustomers,
  setSelectedProduct,
  setLoading,
  setError,
  setLogo,
  resetLogo,
  resetRetail,
  reset,
} = retailSlice.actions;

export default retailSlice.reducer;

export const create = (values: RetailT) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.post(`retail/create`, values);
    dispatch(setRetail(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getById = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`retail/getById/${id}`);
    dispatch(setRetail(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getByRut = (rut: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`retail/getByRut/${rut}`);
    dispatch(setRetail(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getAll = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`retail/getAll`);
    dispatch(setList(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getBySearchValues =
  (rut: string, name: string) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.post(`retail/getBySearchValues`, {
        rut,
        name,
      });
      dispatch(setList(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const getCustomersByRetailIdAndProductId =
  (retail_id: string, product_id: string) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.get(
        `retail/getCustomersByRetailIdAndProductId/${retail_id}/${product_id}`
      );
      dispatch(setCustomers(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const uploadLogo = (logo: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.post(`retail/uploadLogo`, logo);
    dispatch(setList(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const uploadExcel = (excel: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.post(`retail/addLeadFromExcel`, excel);
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const deleteById = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.delete(`retail/deleteById/${id}`);
    dispatch(setList(data));
  } catch (e) {
    dispatch(setError(true));
  }
};
