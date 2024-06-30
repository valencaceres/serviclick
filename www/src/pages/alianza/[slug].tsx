import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Servicios() {
  const router = useRouter();

  useEffect(() => {
    router.push(`https://personas.serviclick.cl/alianza/${router.query.slug}`);
  }, [router.isReady]);
}
