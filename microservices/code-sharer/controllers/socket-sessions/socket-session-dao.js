import socketSessionModel from "./soskcet-session-model.js";

export const findSocketSession = (socketId) =>
  socketSessionModel.findOne({ socket_id: socketId });
export const createSocketSession = (socketSession) =>
  socketSessionModel.create(socketSession);
export const deleteSocketSession = (socketId) =>
  socketSessionModel.deleteOne({ socket_id: socketId });
