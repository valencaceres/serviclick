import shallow from "zustand/shallow";
import { slugStore } from "../store/slugStore";

const useSlug = () => {
  const {
    slug,
    slugList,
    loading: slugLoading,
    error: slugError,
  } = slugStore(
    (state) => ({
      slug: state.slug,
      slugList: state.slugList,
      loading: state.loading,
      error: state.error,
    }),
    shallow
  );
  const {
    setLoading: setSlugLoading,
    setError: setSlugError,
    setSlug,
    getByCode: getSlugByCode,
    reset: resetSlug,
  } = slugStore();

  return {
    slug,
    slugList,
    slugLoading,
    slugError,
    setSlugLoading,
    setSlugError,
    setSlug,
    getSlugByCode,
    resetSlug,
  };
};

export default useSlug;
