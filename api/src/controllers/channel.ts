import createLogger from "../util/logger";
import * as Channel from "../models/channel";

const createChannel = async (req: any, res: any) => {
  const { name, isBroker } = req.body;
  const channelResponse = await Channel.createChannel(name, isBroker);

  if (!channelResponse.success) {
    createLogger.error({
      model: "channel/createChannel",
      error: channelResponse.error,
    });
    res.status(500).json({ error: channelResponse.error });
    return;
  }

  createLogger.info({
    controller: "channel",
    message: "OK",
  });
  res.status(200).json(channelResponse.data);
};

const updateChannel = async (req: any, res: any) => {
  const { id } = req.params;
  const { name, isBroker } = req.body;
  const channelResponse = await Channel.updateChannel(id, name, isBroker);

  if (!channelResponse.success) {
    createLogger.error({
      model: "channel/updateChannel",
      error: channelResponse.error,
    });
    res.status(500).json({ error: channelResponse.error });
    return;
  }

  createLogger.info({
    controller: "channel",
    message: "OK",
  });
  res.status(200).json(channelResponse.data);
};

const deleteChannel = async (req: any, res: any) => {
  const { id } = req.params;
  const channelResponse = await Channel.deleteChannel(id);

  if (!channelResponse.success) {
    createLogger.error({
      model: "channel/deleteChannel",
      error: channelResponse.error,
    });
    res.status(500).json({ error: channelResponse.error });
    return;
  }

  createLogger.info({
    controller: "channel",
    message: "OK",
  });
  res.status(200).json(channelResponse.data);
};

const listChannels = async (req: any, res: any) => {
  const channelResponse = await Channel.listChannels();

  if (!channelResponse.success) {
    createLogger.error({
      model: "channel/listChannels",
      error: channelResponse.error,
    });
    res.status(500).json({ error: channelResponse.error });
    return;
  }

  createLogger.info({
    controller: "channel",
    message: "OK",
  });
  res.status(200).json(channelResponse.data);
};

export { createChannel, updateChannel, deleteChannel, listChannels };
