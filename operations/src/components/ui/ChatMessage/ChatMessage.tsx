import { useUser } from "../../../hooks";
import { useQueryCase } from "~/hooks/query";
import { useCase } from "~/store/hooks";
import format from "date-fns/format";
import { useEffect } from "react";
const ChatMessage = ({ messages }: any) => {
  const userIds = messages?.map((m: any) => m.user_id);
  const { getUsers, usersList } = useCase();
  useEffect(() => {
    if (messages?.length > 0) {
      getUsers(userIds);
    }
  }, [messages, getUsers]);

  return (
    <div className="border-tertiary flex h-[600px] flex-col gap-2 overflow-y-auto rounded-md border border-opacity-50 p-2">
      {messages?.length > 0 ? (
        messages?.map((m: any) => {
          const user = usersList?.data.find(
            (user: any) => user.id === m.user_id
          );

          return (
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
                    {`${user?.first_name} ${user?.last_name}`}
                  </h1>
                  <h3 className="text-xs italic">
                    {format(new Date(m.created_at), "yyyy-MM-dd - HH:mm")}
                  </h3>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between">
                    <h1 className="font-semibold text-secondary-500">
                      {`${m.applicant_name} ${m.applicant_lastname}`}
                    </h1>
                    <h3 className="text-xs italic">
                      {format(new Date(m.created_at), "yyyy-MM-dd - HH:mm")}
                    </h3>
                  </div>
                  <h2 className="text-xs italic">
                    {"por " + `${user?.first_name} ${user?.last_name}`}
                  </h2>
                </div>
              )}
              <div>
                <p className="text-secondary-500">{m.message}</p>
              </div>
            </div>
          );
        })
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
