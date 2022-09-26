import { ContentCell, ContentRow } from "../../../layout/Content";

import Button from "../../../ui/Button";
import InputText from "../../../ui/InputText";
import ButtonIcon from "../../../ui/ButtonIcon";

const ProductCoverage = ({
  setCoverage,
  coverage,
  saveCoverage,
  isCompleteCoverageItem,
}: any) => {
  return (
    <ContentCell gap="30px" align="center">
      <ContentCell gap="10px" align="center">
        <InputText
          id="txtProductCoverageName"
          label="Servicio"
          width="480px"
          value={coverage.name}
          onChange={(e: any) =>
            setCoverage({ ...coverage, name: e.target.value })
          }
        />
        <ContentRow gap="10px">
          <ContentRow gap="5px">
            <InputText
              id="txtProductCoverageAmount"
              label="Monto"
              width="190px"
              value={coverage.amount}
              onChange={(e: any) =>
                setCoverage({ ...coverage, amount: e.target.value })
              }
            />
            <ButtonIcon
              iconName="all_inclusive"
              onClick={() => setCoverage({ ...coverage, amount: "Ilimitado" })}
              color="gray"
            />
          </ContentRow>
          <ContentRow gap="5px">
            <InputText
              id="txtProductCoverageMaximum"
              label="Límite"
              width="190px"
              value={coverage.maximum}
              onChange={(e: any) =>
                setCoverage({ ...coverage, maximum: e.target.value })
              }
            />
            <ButtonIcon
              iconName="all_inclusive"
              onClick={() => setCoverage({ ...coverage, maximum: "Ilimitado" })}
              color="gray"
            />
          </ContentRow>
        </ContentRow>
        <ContentRow gap="10px">
          <ContentRow gap="5px">
            <InputText
              id="txtProductCoverageLack"
              label="Inicio vigencia (días)"
              width="190px"
              value={coverage.lack}
              onChange={(e: any) =>
                setCoverage({ ...coverage, lack: e.target.value })
              }
            />
            <ButtonIcon
              iconName="all_inclusive"
              onClick={() => setCoverage({ ...coverage, lack: "Ilimitado" })}
              color="gray"
            />
          </ContentRow>
          <ContentRow gap="5px">
            <InputText
              id="txtProductCoverageEvents"
              label="Eventos (cantidad)"
              width="190px"
              value={coverage.events}
              onChange={(e: any) =>
                setCoverage({ ...coverage, events: e.target.value })
              }
            />
            <ButtonIcon
              iconName="all_inclusive"
              onClick={() => setCoverage({ ...coverage, events: "Ilimitado" })}
              color="gray"
            />
          </ContentRow>
        </ContentRow>
      </ContentCell>
      <Button
        text="Registrar"
        width="200px"
        onClick={saveCoverage}
        enabled={isCompleteCoverageItem}
      />
    </ContentCell>
  );
};

export default ProductCoverage;
