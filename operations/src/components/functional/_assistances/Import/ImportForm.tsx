import ComboBox from "../../../ui/ComboBox";
import InputFile from "../../../ui/InputFile";
import { ContentCell, ContentRow } from "../../../layout/Content";
import Button from "../../../ui/Button";

const ImportForm = () => {
  return (
    <form>
      <ContentCell gap="5px" align="center">
        <ComboBox
          label="Cliente"
          width="355px"
          value=""
          onChange={() => {}}
          placeHolder=":: Seleccione cliente ::"
          data={[]}
          dataValue="id"
          dataText="name"
        />
        <ContentRow gap="5px" align="center">
          <ComboBox
            label="Año"
            width="150px"
            value=""
            onChange={() => {}}
            placeHolder=":: Año ::"
            data={[]}
            dataValue="id"
            dataText="name"
          />
          <ComboBox
            label="Mes"
            width="200px"
            value=""
            onChange={() => {}}
            placeHolder=":: Mes ::"
            data={[]}
            dataValue="id"
            dataText="name"
          />
        </ContentRow>
        <InputFile
          label="Archivo"
          width="w-[355px]"
          value=""
          onChange={() => {}}
        />
        <ContentRow align="center">
          <Button width="200px" text="Procesar" className={"mt-5"} />
        </ContentRow>
      </ContentCell>
    </form>
  );
};

export default ImportForm;
