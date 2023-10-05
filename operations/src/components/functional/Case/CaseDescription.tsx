import Link from "next/link";
import { ContentCell } from "~/components/layout/Content";
import InputText from "~/components/ui/InputText";
import { useQueryContractor } from "~/hooks/query";

export const CaseDescription = ({ thisCase }: any) => {
  const { data: contractor, isLoading } = useQueryContractor().useGetById(
    thisCase?.contractor_id
  );

  return (
    <ContentCell gap="5px">
      <Link href={`/entities/contractor/${contractor?.id}`}>
        <InputText
          label="Cliente"
          value={
            isLoading
              ? "Cargando..."
              : contractor?.name ||
                contractor?.name + " " + contractor?.paternalLastName
          }
          className="capitalize"
          disabled
        />
      </Link>
      <InputText
        label="Beneficiario"
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
