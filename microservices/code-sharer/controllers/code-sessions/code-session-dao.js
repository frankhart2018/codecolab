import codeSessionModel from "./code-session-model.js";

export const findCodeSession = (roomId) =>
  codeSessionModel.findOne({ room_id: roomId });
export const createCodeSession = (codeSession) =>
  codeSessionModel.create(codeSession);
export const deleteCodeSession = (roomId) =>
  codeSessionModel.deleteOne({ room_id: roomId });
export const updateCodeSession = (roomId, codeSession) =>
  codeSessionModel.updateOne({ room_id: roomId }, { $set: codeSession });
