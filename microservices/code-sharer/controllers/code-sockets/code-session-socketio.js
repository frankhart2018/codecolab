import * as codeSessionDao from "../code-sessions/code-session-dao.js";
import * as socketSessionDao from "../socket-sessions/socket-session-dao.js";

const viewCode = async (socket, data) => {
  console.log(`User ${socket.id} is viewing code for room ${data.room_id}`);
  socket.join(data.room_id);
  let codeSession = await codeSessionDao.findCodeSession(data.room_id);
  await socketSessionDao.createSocketSession({
    socket_id: socket.id,
    room_id: data.room_id,
  });

  if (codeSession) {
    codeSession.num_active_users += 1;
    const newData = {
      room_id: data.room_id,
      code: codeSession.code,
      num_active_users: codeSession.num_active_users,
    };
    await codeSessionDao.updateCodeSession(data.room_id, newData);
  } else {
    const newData = { ...data, num_active_users: 1 };
    codeSession = await codeSessionDao.createCodeSession(newData);
  }

  socket.emit("code", codeSession.code);
};

const removeUser = async (socket) => {
  console.log(`User ${socket.id} is no longer viewing code`);
  const socketSession = await socketSessionDao.findSocketSession(socket.id);

  if (socketSession) {
    const room_id = socketSession.room_id;

    let codeSession = await codeSessionDao.findCodeSession(room_id);
    codeSession.num_active_users -= 1;

    if (codeSession.num_active_users === 0) {
      await codeSessionDao.deleteCodeSession(room_id);
      // Call the API to push code session to MongoDB and S3
    } else {
      await codeSessionDao.updateCodeSession(room_id, codeSession);
    }

    await socketSessionDao.deleteSocketSession(socket.id);
    socket.leave(room_id);
  }
};

const updateCode = async (socket, data) => {
  console.log(`User ${socket.id} is updating code for room ${data.room_id}`);
  let newData = await codeSessionDao.findCodeSession(data.room_id);

  if (newData) {
    newData.code = data.code;
    await codeSessionDao.updateCodeSession(data.room_id, newData);

    socket.to(newData.room_id).emit("recv_code", newData.code);
  }
};

export default (socket) => {
  socket.on("view_code", (data) => viewCode(socket, data));
  socket.on("stop_viewing_code", () => removeUser(socket));
  socket.on("disconnect", () => removeUser(socket));
  socket.on("update_code", (data) => updateCode(socket, data));
};
