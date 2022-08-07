import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import UserChats from "../../components/UserChats/UserChats";
import ChatBox from "../../components/ChatBox/ChatBox";
import "./Chatpage.css";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div className="sidedrawer-container">
      {user && <SideDrawer />}
      <Box className="chat-items-container">
        {user && <UserChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
