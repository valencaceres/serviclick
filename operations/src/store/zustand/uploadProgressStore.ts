import { create } from "zustand";
import io from "socket.io-client";

interface BaseData {
  productPlan_id: string;
  retail_id: string;
}

interface SummaryResponseData extends BaseData {
  total: number;
}

interface RowResponseData extends BaseData {
  status: boolean;
}

interface SocketState {
  summaryData: SummaryResponseData | null;
  rowData: RowResponseData[] | null;
}

const useSocketStore = create<SocketState>(() => ({
  summaryData: null,
  rowData: null,
}));

const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_API_URL}`);

socket.on("summaryResponse", (data: SummaryResponseData) => {
  useSocketStore.setState({ summaryData: data });
});

socket.on("rowResponse", (data: RowResponseData) => {
  const currentRowData = useSocketStore.getState().rowData;

  const newRowData = currentRowData ? [...currentRowData, data] : [data];

  useSocketStore.setState({ rowData: newRowData });
});

export { useSocketStore };
