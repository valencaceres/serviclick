import { useEffect } from "react";
import shallow from "zustand/shallow";

import { slugStore } from "../../store/slugStore";
import { GetByCode } from "../query/useQuerySlug";

const useSlug = () => {
  const { data, setSlugCode, isLoading, isError, error } = GetByCode();

  const getByCode = (code: string) => {
    setSlugCode(code);
  };

  const { slug } = slugStore(
    (state) => ({
      slug: state.slug,
    }),
    shallow
  );
  const { setSlug, reset: resetSlug } = slugStore();

  useEffect(() => {
    if (data && data?.id !== "") {
      setSlug({ ...data });
    }
  }, [data?.id]);

  return {
    slug,
    isLoading,
    isError,
    error,
    getByCode,
    setSlug,
  };
};

export default useSlug;
