import * as Broker from "../redux/slices/brokerSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useBroker = () => {
  const dispatch = useAppDispatch();

  const {
    broker,
    list: brokerList,
    loading,
  } = useAppSelector((state) => state.brokerSlice);

  const createBroker = (broker: Broker.BrokerT) => {
    dispatch(Broker.setLoading(true));
    dispatch(Broker.create(broker));
  };

  const getBrokerById = (id: string) => {
    dispatch(Broker.setLoading(true));
    dispatch(Broker.getById(id));
  };

  const getBrokerByRut = (rut: string) => {
    dispatch(Broker.setLoading(true));
    dispatch(Broker.getByRut(rut));
  };

  const getAllBrokers = () => {
    dispatch(Broker.setLoading(true));
    dispatch(Broker.getAll());
  };

  const uploadLogo = (logo: any) => {
    dispatch(Broker.setLoading(true));
    dispatch(Broker.uploadLogo(logo));
  };

  const deleteBrokerById = (id: string) => {
    dispatch(Broker.setLoading(true));
    dispatch(Broker.deleteById(id));
  };

  const setBrokerList = (data: any) => {
    dispatch(Broker.setList(data));
  };

  const setBroker = (data: any) => {
    dispatch(Broker.setBroker(data));
  };

  const setBrokerLogo = (base64: any) => {
    dispatch(Broker.setLogo(base64));
  };

  const resetBroker = () => {
    dispatch(Broker.resetBroker());
  };

  const resetLogo = () => {
    dispatch(Broker.resetLogo());
  };

  const reset = () => {
    dispatch(Broker.resetBroker());
  };

  return {
    createBroker,
    getAllBrokers,
    getBrokerById,
    getBrokerByRut,
    uploadLogo,
    deleteBrokerById,
    setBrokerList,
    setBroker,
    setBrokerLogo,
    resetLogo,
    resetBroker,
    reset,
    broker,
    brokerList,
    loading,
  };
};

export default useBroker;
