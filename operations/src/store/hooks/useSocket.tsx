import { socketStore } from "../zustand/socketStore";

const useSocket = () => {
  const { socket } = socketStore((state) => ({
    socket: state.socket,
  }));
  const { connect, disconnect, emit, on } = socketStore();

  return {
    socket,
    on,
    connect,
    disconnect,
    emit,
  };
};

export default useSocket;

// import { socketStore } from "../zustand/socketStore";

// const useLab = () => {
//   const { socket, response } = socketStore((state) => ({
//     socket: state.socket,
//     response: state.response,
//   }));

//   const { connect } = socketStore();

//   return {
//     socket,
//     response,
//     connect,
//   };
// };

// export default useLab;
