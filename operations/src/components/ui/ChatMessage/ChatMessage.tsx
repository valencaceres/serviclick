import { useUser } from "../../../hooks";

const ChatMessage = ({ messages }: any) => {
  return (
    <div className="border-tertiary flex h-[600px] flex-col gap-2 overflow-y-auto rounded-md border border-opacity-50 p-2">
      {messages?.length > 0 ? (
        messages?.map((m: any) => (
          <div
            key={m.id}
            className={`w-3/4 rounded-lg p-2 duration-75 ${
              m.type === "Operador"
                ? "self-end bg-gray-100 hover:bg-gray-200"
                : "self-start bg-teal-100 hover:bg-teal-200"
            }`}
          >
            {m.type === "Operador" ? (
              <div className="flex justify-between">
                <h1 className="font-semibold text-secondary-500">
                  {m.operator_name + " " + m.operator_lastname}
                </h1>
                <h3 className="text-xs italic">
                  {m.created_at.split("T")[0] +
                    " - " +
                    m.created_at.split("T")[1].slice(0, 5)}
                </h3>
              </div>
            ) : (
              <div>
                <div className="flex justify-between">
                  <h1 className="font-semibold text-secondary-500">
                    {m.applicant_name + " " + m.applicant_lastname}
                  </h1>
                  <h3 className="text-xs italic">
                    {m.created_at.split("T")[0] +
                      " - " +
                      m.created_at.split("T")[1].slice(0, 5)}
                  </h3>
                </div>
                <h2 className="text-xs italic">
                  {"por " + m.operator_name + " " + m.operator_lastname}
                </h2>
              </div>
            )}
            <div>
              <p className="text-secondary-500">{m.message}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="flex h-full items-center justify-center">
          <h1 className="select-none text-center text-2xl font-semibold text-secondary-500">
            No hay mensajes para mostrar
          </h1>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
