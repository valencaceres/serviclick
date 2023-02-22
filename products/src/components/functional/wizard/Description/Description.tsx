import { currencyFormat, formatAmount } from "@/utils/format";
import { useRouter } from "next/router";

import { useUI, useProduct } from "@/store/hooks";

import styles from "./Description.module.scss";
import Loading from "@/components/ui/Loading";
import Icon from "@/components/ui/Icon/Icon";

const Description = () => {
  const router = useRouter();

  const { setUI, ui } = useUI();
  const { product, productIsLoading } = useProduct();

  const handleClickHire = () => {
    router.push(`/contractor?productPlanId=${ui.product.productPlan_id}`);
  };

  return (
    <div className={styles.landingPage}>
      {product.id && <Banner />}
      <div className={styles.title}>{product.name}</div>
      <div className={styles.description}>{product.promotional}</div>
      <div className={styles.highlighted}>Plan mensual</div>
      <Price />
      <button className={styles.button} onClick={handleClickHire}>
        Contrata aquí
      </button>
      <Coverage />
      <LandingFooter />
    </div>
  );
};

const Banner = () => {
  const { product } = useProduct();
  return (
    <div
      className={styles.landingBanner}
      style={{
        backgroundImage: `url(/images/products/banners/${product.id}.jpg)`,
      }}></div>
  );
};

const Price = () => {
  const { product, productIsLoading } = useProduct();

  return (
    <>
      {product.plan.discount.type === "p" && (
        <div className={styles.priceOld}>
          {currencyFormat(product.plan.price)}
        </div>
      )}
      <div className={styles.price}>
        {product.plan.discount.type === "p" && (
          <span>{product.plan.discount.percent}%</span>
        )}
        {currencyFormat(
          product.plan.price *
            (product.plan.discount.type === "p"
              ? 1 - product.plan.discount.percent / 100
              : 1)
        )}
      </div>
    </>
  );
};

const Coverage = () => {
  const { product, productIsLoading } = useProduct();

  const limitDescription = (item: any) => {
    const oDiv = [];

    if (item.maximum !== "") {
      oDiv.push(<div>{item.maximum}</div>);
    }

    if (item.amount > 0) {
      oDiv.push(
        <div>
          {item.maximum !== "" ? "Tope" : ""}{" "}
          {formatAmount(item.amount, item.currency)}{" "}
          {item.maximum !== "" ? "al mes" : ""}
        </div>
      );
    }

    return oDiv;
  };

  return productIsLoading ? (
    <Loading />
  ) : (
    <div className={styles.table}>
      <div className={styles.tableHeader}>
        <div className={styles.tableHeaderTitie}>Servicio</div>
        <div className={styles.tableHeaderTitie}>Límite</div>
        <div className={styles.tableHeaderTitie}>Máximo</div>
        <div className={styles.tableHeaderTitie}>Carencia</div>
      </div>
      <div className={styles.tableDetail}>
        {product.assistances.map((item, idx: number) => (
          <div className={styles.tableRow} key={`item_${idx}`}>
            <div className={styles.tableCell} key={`name_${idx}`}>
              {item.name}
            </div>
            <div className={styles.tableCell} key={`limit_${idx}`}>
              {limitDescription(item)}
            </div>
            <div className={styles.tableCell} key={`events_${idx}`}>
              {item.events === 0
                ? "Ilimitado"
                : item.events === 1
                ? `${item.events} evento`
                : `${item.events} eventos`}
            </div>
            <div className={styles.tableCell} key={`lack_${idx}`}>
              {item.lack} días
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LandingFooter = () => {
  return (
    <div className={styles.landingFooter}>
      <div className={styles.top}>
        <div className={styles.columnLeft}>
          <div className={styles.address}>
            <div className={styles.data}>
              <Icon iconName="location_on"></Icon>
              <a href="https://goo.gl/maps/YLyrpsccKryUEqfs5">
                ENRIQUE MAC IVER 440 OFICINA 702
              </a>
            </div>
            <div className={styles.data}>
              <Icon iconName="phone"></Icon>
              <a href="tel:6000860580">600 0860 580</a>
            </div>
            <div className={styles.data}>
              <Icon iconName="email"></Icon>
              <a href="mailto:@info@serviclick.cl">info@serviclick.cl</a>
            </div>
          </div>
          <div className={styles.rrss}>
            <a
              href="https://www.facebook.com/serviclick.cl"
              target="_blank"
              rel="noreferrer">
              <div className={styles.facebook}></div>
            </a>
            <a
              href="https://www.instagram.com/serviclick.cl/"
              target="_blank"
              rel="noreferrer">
              <div className={styles.instagram}></div>
            </a>
            <a
              href="https://www.linkedin.com/company/serviclick/"
              target="_blank"
              rel="noreferrer">
              <div className={styles.linkedin}></div>
            </a>
          </div>
        </div>
        <div className={styles.columnCenter}>
          <a
            href="https://serviclick.cl/salud/"
            target="_blank"
            rel="noreferrer">
            Planes Salud
          </a>
          <a
            href="https://serviclick.cl/asistencia-hogar/"
            target="_blank"
            rel="noreferrer">
            Planes Hogar
          </a>
          <a
            href="https://serviclick.cl/asistencia-automovil/"
            target="_blank"
            rel="noreferrer">
            Plan Automóvil
          </a>
          <a
            href="https://serviclick.cl/asistencia-veterinaria/"
            target="_blank"
            rel="noreferrer">
            Planes Veterinaria
          </a>
          <a
            href="https://serviclick.cl/proteccion-total-ultra/"
            target="_blank"
            rel="noreferrer">
            Plan Protección Total Ultra
          </a>
        </div>
        <div className={styles.columnRight}>
          <a
            href="https://serviclick.cl/personas/"
            target="_blank"
            rel="noreferrer">
            Personas
          </a>
          <a
            href="https://serviclick.cl/empresas/"
            target="_blank"
            rel="noreferrer">
            Empresas
          </a>
          <a
            href="https://asegurado.serviclick.cl/"
            target="_blank"
            rel="noreferrer">
            Acceso Beneficiario
          </a>
          <a
            href="https://serviclick.cl/terminos-y-condiciones/"
            target="_blank"
            rel="noreferrer">
            Términos y condiciones
          </a>
          <a
            href="https://serviclick.cl/canales-comerciales/"
            target="_blank"
            rel="noreferrer">
            Trabaja con nosotros
          </a>
        </div>
      </div>
      <div className={styles.bottom}>
        Serviclick 2023 - Todos los derechos reservados
      </div>
    </div>
  );
};

export default Description;
