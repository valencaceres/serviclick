import { Card, CardContent, CardHeader } from "@/components/ui/card-ui";

const PaymentSection = ({ children, title, selected = false, state }: any) => {
  return (
    <Card>
      <CardHeader
        className={`flex flex-row justify-between items-center h-8 text-base px-4 w-full ${
          selected
            ? "bg-[#B4CD25] text-white font-bold"
            : "bg-gray-200 text-gray-600 font-bold"
        }`}
      >
        {" "}
        <input type="checkbox" onChange={(e: any) => state(e.target.checked)} />
        {title}
        <div>&nbsp;</div>
      </CardHeader>
      <CardContent className="p-4">{children}</CardContent>
    </Card>
  );
};

export default PaymentSection;
