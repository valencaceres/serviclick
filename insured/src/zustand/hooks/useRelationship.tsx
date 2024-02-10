import { shallow } from "zustand/shallow";

import { relationshipStore } from "../stores";
const useRelationship = () => {
  const {
    relationshipList,
    isLoading: relationshipIsLoading,
    isError: relationshipIsError,
    error: relationshipError,
  } = relationshipStore(
    (state) => ({
      relationshipList: state.relationshipList,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );
  const { getAll: getAllRelationships, reset: resetRelationship } =
    relationshipStore();

  return {
    relationshipList,
    relationshipIsLoading,
    relationshipIsError,
    relationshipError,
    getAllRelationships,
    resetRelationship,
  };
};

export default useRelationship;
