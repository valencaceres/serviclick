import * as ChannelHook from "../../../hooks/query/useChannel";

const Channel = () => {
  const { isLoading, channels } = ChannelHook.GetAll();

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      {channels.map((channel: any, idx: number) => (
        <p key={idx}>{channel.name}</p>
      ))}
    </div>
  );
};

export default Channel;
