import { create } from "zustand";

import io from "socket.io-client";
import { config } from "../../utils/config";

interface ISocketStore {
  socket: any;
  connect: () => void;
  disconnect: () => void;
  emit: (event: string, date: any) => void;
  on: (event: string, functionAction: any) => void;
}

const socket = io(config.socketApiURL);

export const socketStore = create(<ISocketStore>(set: any, get: any) => ({
  socket: null,
  connect: () => {
    set({ socket });
  },
  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
  emit: (event: any, data: any) => {
    const { socket } = get();
    if (socket) {
      socket.emit(event, data);
    }
  },
  on: (event: string, functionAction: any) => {
    set({ socket });
    socket.on(event, (stateUsers) => {
      functionAction(stateUsers);
    });
  },
}));
