import { ContentCell } from "~/components/layout/Content";
import InputText from "~/components/ui/InputText";
import { useQueryContractor } from "~/hooks/query";

export const CaseDescription = ({ thisCase }: any) => {
  const { data: contractor, isLoading } = useQueryContractor().useGetById(
    thisCase?.contractor_id
  );

  return (
    <ContentCell gap="5px">
      <InputText
        label="Cliente"
        value={
          isLoading
            ? "Cargando..."
            : contractor?.companyName ||
              contractor?.name + " " + contractor?.paternalLastName
        }
        type="text"
        disabled={true}
        width="525px"
      />
      <InputText
        label="Asegurado"
        value={
          isLoading
            ? "Cargando..."
            : thisCase?.applicant_name + " " + thisCase?.applicant_lastname
        }
        type="text"
        disabled={true}
        width="525px"
      />
      <InputText
        label="Servicio"
        value={isLoading ? "Cargando..." : thisCase?.assistance}
        type="text"
        disabled={true}
        width="525px"
      />
    </ContentCell>
  );
};
