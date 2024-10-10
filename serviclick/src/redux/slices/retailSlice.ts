import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { post, get, erase, apiInstance } from "../../utils/api";

export type PriceT = {
  base: number;
  customer: number;
  company: number;
};

export type DiscountT = {
  type: string;
  percent: number;
  cicles: number;
};

export type ProductT = {
  product_id: string;
  name: string;
  price: PriceT;
  currency: string;
  discount: DiscountT;
  pdfbase64: PdfT;
  yearly_price: number;
  beneficiary_price: number;
  productplan_id: string;
};

export type UserT = {
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  email: string;
  profileCode: string;
};

export type RetailT = {
  id: string;
  rut: string;
  name: string;
  legalRepresentative: string;
  line: string;
  fantasyName: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  logo: string;
  products: ProductT[];
  users: UserT[];
};

export type StateT = {
  list: RetailT[];
  retail: RetailT;
  pdf: PdfT
  loading: boolean;
  loadingpdf: boolean
};

export type PdfT = {
  pdf: string;
};

const initialState: StateT = {
  list: [],
  retail: {
    id: "",
    rut: "",
    name: "",
    legalRepresentative: "",
    line: "",
    fantasyName: "",
    address: "",
    district: "",
    email: "",
    phone: "",
    logo: "",
    products: [],
    users: [],
  },
  pdf: {pdf: ""},
  loading: false,
  loadingpdf: false
};

export const retailSlice = createSlice({
  name: "retails",
  initialState,
  reducers: {
    setList: (state: StateT, action: PayloadAction<RetailT[]>) => {
      state.list = action.payload;
    },
    setRetail: (state: StateT, action: PayloadAction<RetailT>) => {
      state.retail = action.payload;
    },
    setProducts: (state: StateT, action: PayloadAction<ProductT[]>) => {
      state.retail.products = action.payload;
    },
    setPdf: (state: StateT, action: PayloadAction<PdfT>) => {
      state.pdf = action.payload
    },
    setLogo: (state: StateT, action: PayloadAction<string>) => {
      state.retail.logo = action.payload;
    },
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setLoadingPdf: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetRetail: (state: StateT) => {
      state.retail = initialState.retail;
    },
    resetLogo: (state: StateT) => {
      state.retail.logo = initialState.retail.logo;
    },
    reset: (state: StateT) => {
      state = initialState;
    },
  },
});

export const {
  setList,
  setRetail,
  setLoading,
  setProducts,
  setLogo,
  setPdf,
  setLoadingPdf,
  resetLogo,
  resetRetail,
  reset,
} = retailSlice.actions;

export default retailSlice.reducer;

export const create = (values: RetailT) => async (dispatch: any) => {
  const { success, data, error } = await post(`retail/create`, values);

  if (!success) {
    return false;
  }

  dispatch(setRetail(data));
  dispatch(setLoading(false));
  return true;
};

export const getById = (id: string) => async (dispatch: any) => {
  const { success, data, error } = await get(`retail/getById/${id}`);

  if (!success) {
    return false;
  }

  dispatch(setRetail(data));
  dispatch(setLoading(false));
  return true;
};

export const getByRut = (rut: string) => async (dispatch: any) => {
  const { success, data, error } = await get(`retail/getByRut/${rut}`);

  if (!success) {
    return false;
  }

  dispatch(setRetail(data));
  dispatch(setLoading(false));
  return true;
};

export const getAll = () => async (dispatch: any) => {
  const { success, data, error } = await get(`retail/getAll`);

  if (!success) {
    return false;
  }

  dispatch(setList(data));
  dispatch(setLoading(false));
  return true;
};

export const uploadLogo = (logo: any) => async (dispatch: any) => {
  const { success, data, error } = await post(`retail/uploadLogo`, logo);

  if (!success) {
    return false;
  }

  dispatch(setList(data));
  dispatch(setLoading(false));
  return true;
};

export const deleteById = (id: string) => async (dispatch: any) => {
  const { success, data, error } = await erase(`retail/deleteById/${id}`);

  if (!success) {
    return false;
  }

  dispatch(setLoading(false));
  return true;
};

export const addProduct =
  (id: string, product: ProductT, number: number) => async (dispatch: any) => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
      console.error("Token JWT no encontrado en el localStorage");
      return false;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    };

    try {
      const response = await apiInstance.post(
        `retail/addProduct`,
        {
          retail_id: id,
          ...product,
        },
        { headers }
      );

      const { data } = response;
      dispatch(setProducts(data));
      dispatch(setLoading(false));

      return true;
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      return false;
    }
  };

export const removeProduct =
  (id: string, product_id: string) => async (dispatch: any) => {
    const { success, data, error } = await post(`retail/removeProduct`, {
      retail_id: id,
      product_id,
    });

    if (!success) {
      return false;
    }

    dispatch(setProducts(data));
    dispatch(setLoading(false));
    return true;
  };

export const getPdfByRetail =
  (retail_id: string, productplan_id: string) => async (dispatch: any) => {
    try {
      console.log(retail_id, productplan_id);
      const data = await apiInstance.get(`retail/getPdfByRetail?retail_id=${retail_id}&productplan_id${productplan_id}`);
      console.log(data);
  
      dispatch(setPdf(data.data));
      dispatch(setLoading(false));
      return true;
    } catch (error) {
      return false;
    }
  };
