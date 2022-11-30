import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

export type FrequencyT = "M" | "A" | "S";

export type AssistanceT = {
  id: string;
  name: string;
  amount: number;
  maximum: string;
  events: number;
  lack: number;
  currency: string;
};

export type ProductT = {
  id: string;
  family_id: string;
  name: string;
  cost: number;
  isSubject: boolean;
  frequency: FrequencyT;
  term: number;
  beneficiaries: number;
  currency: string;
  dueDay: number;
  minInsuredCompanyPrice: number;
  title: string;
  subTitle: string;
  description: string;
  territorialScope: string;
  hiringConditions: string;
  assistances: AssistanceT[];
};

type FamilyT = {
  id: string;
  name: string;
};

type StateT = {
  list: ProductT[];
  product: ProductT;
  families: FamilyT[];
  loading: boolean;
  error: boolean;
};

export const initialState: StateT = {
  list: [],
  product: {
    id: "",
    family_id: "",
    name: "",
    cost: 0,
    isSubject: false,
    frequency: "M",
    term: 0,
    beneficiaries: 0,
    currency: "",
    dueDay: 0,
    minInsuredCompanyPrice: 0,
    title: "",
    subTitle: "",
    description: "",
    territorialScope: "",
    hiringConditions: "",
    assistances: [],
  },
  families: [],
  loading: false,
  error: false,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: StateT, action: PayloadAction<boolean>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setFamilies: (state: StateT, action: PayloadAction<FamilyT[]>) => {
      state.families = action.payload;
      state.loading = false;
      state.error = false;
    },
    setProductList: (state: StateT, action: PayloadAction<any>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = false;
    },
    setProduct: (state: StateT, action: PayloadAction<any>) => {
      state.product = action.payload;
      state.loading = false;
      state.error = false;
    },
    resetProduct: (state: StateT) => {
      state.product = initialState.product;
    },
    resetProductList: (state: StateT) => {
      state.list = initialState.list;
    },
  },
});

export const {
  setLoading,
  setError,
  setFamilies,
  setProductList,
  setProduct,
  resetProduct,
  resetProductList,
} = productSlice.actions;

export default productSlice.reducer;

export const createProduct =
  (
    family_id: string,
    name: string,
    cost: number,
    isSubject: boolean,
    frequency: FrequencyT,
    term: number,
    beneficiaries: number,
    currency: string,
    dueDay: number,
    minInsuredCompanyPrice: number,
    title: string,
    subTitle: string,
    description: string,
    territorialScope: string,
    hiringConditions: string,
    assistances: AssistanceT[]
  ) =>
  async (dispatch: any) => {
    dispatch(setLoading(true));
    const { data } = await apiInstance.post(`/product/create`, {
      family_id,
      name,
      cost,
      isSubject,
      frequency,
      term,
      beneficiaries,
      currency,
      dueDay,
      minInsuredCompanyPrice,
      title,
      subTitle,
      description,
      territorialScope,
      hiringConditions,
      assistances,
    });
    dispatch(setProduct(data));
  };

export const assignProductPrices =
  (id: string, agent_id: string, customerprice: number, companyprice: number) =>
  async (dispatch: any) => {
    dispatch(setLoading(true));
    const { data } = await apiInstance.post(`/product/assignPrices`, {
      id,
      agent_id,
      customerprice,
      companyprice,
    });
    dispatch(setProduct(data));
  };

export const updateProduct =
  (
    id: string,
    family_id: string,
    name: string,
    cost: number,
    isSubject: boolean,
    frequency: FrequencyT,
    term: number,
    beneficiaries: number,
    currency: string,
    dueDay: number,
    minInsuredCompanyPrice: number,
    title: string,
    subTitle: string,
    description: string,
    territorialScope: string,
    hiringConditions: string,
    assistances: AssistanceT[]
  ) =>
  async (dispatch: any) => {
    dispatch(setLoading(true));
    const { data } = await apiInstance.put(`/product/update/${id}`, {
      id,
      family_id,
      name,
      cost,
      isSubject,
      frequency,
      term,
      beneficiaries,
      currency,
      dueDay,
      minInsuredCompanyPrice,
      title,
      subTitle,
      description,
      territorialScope,
      hiringConditions,
      assistances,
    });
    dispatch(setProduct(data));
  };

export const deleteProduct = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.delete(`/product/delete/${id}`);
    dispatch(resetProduct());
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getAllProducts = (agent_id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`/product/list/${agent_id}`);
    dispatch(setProductList(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getProductsByFamilyId =
  (family_id: string, agent_id: string) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.get(
        `/product/getByFamilyId/${family_id}/${agent_id}`
      );
      dispatch(setProductList(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const getProductById =
  (id: string, agent_id: string) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.get(`/product/get/${id}/${agent_id}`);
      dispatch(setProduct(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const getProductsDescription =
  (proeduct_id: string) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.get(
        `/productDescription/getByProductId/${proeduct_id}`
      );
      dispatch(setProductList(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const getOnlyProductById =
  (product_id: string) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.get(`/product/getById/${product_id}`);
      dispatch(setProduct(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const getFamilies = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`/product/getFamilies`);
    dispatch(setFamilies(data));
  } catch (e) {
    dispatch(setError(true));
  }
};
