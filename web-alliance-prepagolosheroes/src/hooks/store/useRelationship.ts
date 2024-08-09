import { useEffect } from "react";
import { isConstructorDeclaration } from "typescript";
import shallow from "zustand/shallow";

import { relationshipStore } from "../../store/relationshipStore";
import { GetAll } from "../query/useQueryRelationship";

const useRelationship = () => {
  const { refetch, isLoading, data, isError, error } = GetAll();

  const getAll = () => {
    refetch();
  };

  const { relationship } = relationshipStore(
    (state) => ({
      relationship: state.list,
    }),
    shallow
  );
  const { setList, reset: resetRelationship } = relationshipStore();

  useEffect(() => {
    if (data && data.length > 0) {
      setList(data);
    }
  }, [data]);

  return {
    relationship,
    isLoading,
    isError,
    error,
    getAll,
    setList,
  };
};

export default useRelationship;
