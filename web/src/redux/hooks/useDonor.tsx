import { create, getByRut, setList, set, reset } from "../slices/donorSlice";
import { useAppDispatch, useAppSelector } from ".";

const useDonor = () => {
  const dispatch = useAppDispatch();

  const { donor, list } = useAppSelector((state) => state.donorSlice);

  const createDonor = (
    rut: string,
    name: string,
    paternalLastName: string,
    maternalLastName: string,
    birthDate: string,
    address: string,
    district: string,
    email: string,
    phone: string
  ) => {
    dispatch(
      create(
        rut,
        name,
        paternalLastName,
        maternalLastName,
        birthDate,
        address,
        district,
        email,
        phone
      )
    );
  };

  const getDonorByRut = (rut: string) => {
    dispatch(getByRut(rut));
  };

  const setDonorList = (donorList: any) => {
    setList(donorList);
  };

  const setDonor = (donor: any) => {
    set(donor);
  };

  const resetDonor = () => {
    reset();
  };

  return {
    createDonor,
    getDonorByRut,
    setDonorList,
    setDonor,
    resetDonor,
    donor,
    list,
  };
};

export default useDonor;
