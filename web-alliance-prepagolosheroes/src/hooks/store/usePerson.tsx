import { useEffect } from "react";
import shallow from "zustand/shallow";

import { personStore } from "../../store/personStore";
import { GetByRut } from "../query/useQueryPerson";

const usePerson = () => {
  const { data, setPersonRut, isLoading, isError, error } = GetByRut();

  const getByRut = (rut: string) => {
    setPersonRut(rut);
  };

  const { person } = personStore(
    (state) => ({
      person: state.person,
    }),
    shallow
  );
  const { setPerson, reset: resetPerson } = personStore();

  useEffect(() => {
    if (data && data?.id !== "") {
      setPerson({ ...data });
    }
  }, [data?.id]);

  return {
    person,
    isLoading,
    isError,
    error,
    getByRut,
    setPerson,
  };
};

export default usePerson;
