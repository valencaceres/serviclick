import { shallow } from "zustand/shallow";

import { relationshipStore } from "@/store/zustand";

const useRelationship = () => {
  const {
    relationship,
    relationshipList,
    isLoading: relationshipIsLoading,
    isError: relationshipIsError,
    error: relationshipError,
  } = relationshipStore(
    (state) => ({
      relationship: state.relationship,
      relationshipList: state.relationshipList,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );
  const {
    setRelationship,
    getAll: getAllRelationships,
    reset: resetRelationship,
  } = relationshipStore();

  return {
    relationship,
    relationshipList,
    relationshipIsLoading,
    relationshipIsError,
    relationshipError,
    setRelationship,
    getAllRelationships,
    resetRelationship,
  };
};

export default useRelationship;
