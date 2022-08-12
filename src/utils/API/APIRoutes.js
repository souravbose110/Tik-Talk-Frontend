export const loginRoute = `${process.env.REACT_APP_HOST}/api/users/login`;
export const registerRoute = `${process.env.REACT_APP_HOST}/api/users`;
export const searchUsersRoute = `${process.env.REACT_APP_HOST}/api/users?search`;
export const createGroupRoute = `${process.env.REACT_APP_HOST}/api/chats/group`;
export const chatRoute = `${process.env.REACT_APP_HOST}/api/chats`;
export const messageRoute = `${process.env.REACT_APP_HOST}/api/messages`;
export const renameGroupRoute = `${process.env.REACT_APP_HOST}/api/chats/rename`;
export const addUserToGroupRoute = `${process.env.REACT_APP_HOST}/api/chats/groupadd`;
export const removeUserFromGroupRoute = `${process.env.REACT_APP_HOST}/api/chats/groupremove`;
