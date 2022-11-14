import * as Broker from "../slices/brokerSlice";
import { useAppDispatch, useAppSelector } from ".";

const useBroker = () => {
  const dispatch = useAppDispatch();

  const { broker, list: brokerList } = useAppSelector(
    (state) => state.brokerSlice
  );

  const createBroker = (
    id: string,
    rut: string,
    name: string,
    legalRepresentative: string,
    line: string,
    address: string,
    district: string,
    email: string,
    phone: string,
    products: Broker.ProductT[],
    users: Broker.UserT[]
  ) => {
    dispatch(
      Broker.create({
        id,
        rut,
        name,
        legalRepresentative,
        line,
        address,
        district,
        email,
        phone,
        products,
        users,
      })
    );
  };

  const getBrokerById = (id: string) => {
    dispatch(Broker.getById(id));
  };

  const setBrokerList = (data: any) => {
    dispatch(Broker.setList(data));
  };

  const setBroker = (data: any) => {
    dispatch(Broker.setList(data));
  };

  const resetBroker = () => {
    dispatch(Broker.resetBroker());
  };

  const reset = () => {
    dispatch(Broker.resetBroker());
  };

  return {
    createBroker,
    getBrokerById,
    setBrokerList,
    setBroker,
    resetBroker,
    reset,
    broker,
    brokerList,
  };
};

export default useBroker;
