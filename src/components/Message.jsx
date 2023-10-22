import PropTypes from "prop-types";
import Logo from "../assets/logo2.png";
// import Image from "next/image";

import moment from "moment";
import Image from "./Image";
import Markdown from "./Markdown";
import { Person, Refresh, ThumbDown, ThumbUp } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

/**
 * A chat message component that displays a message with a timestamp and an icon.
 *
 * @param {Object} props - The properties for the component.
 */
const Message = (props) => {
  const { id, createdAt, text, ai = false } = props.message;


  return (
    <div
      key={id}
      className={`flex items-end my-2 gap-2 ${
        ai ? "flex-row-reverse justify-end" : "flex-row justify-end"
      }`}
    >
      <div
        className={` w-screen overflow-hidden chat ${
          ai ? "chat-start" : "chat-end"
        }`}
      >
        <div className="chat-bubble text-neutral-content">
          <Markdown markdownText={text} />
          <div className="flex justify-between">
            <div className={`${ai ? "text-left" : "text-right"} text-xs`}>
              {moment(createdAt).calendar()}
            </div>
            {ai && <div className="flex gap-2 cursor-pointer">
              <Tooltip placement="top" title="Rate reply as neutral - NOT IMPLEMENTED"><IconButton><ThumbUp /></IconButton></Tooltip>
              <Tooltip placement="top" title="Rate reply as negative - NOT IMPLEMENTED"> <IconButton><ThumbDown /></IconButton></Tooltip>
              <Tooltip placement="top" title="Regenerate last message"><IconButton onClick={(e) => props.regen(e)}><Refresh /></IconButton></Tooltip>
              </div>}
          </div>
        </div>
      </div>
      
      <div className="avatar">
        {ai ? (
          <div className="w-16  rounded-full border-slate-400">
            <img src={Logo} className="w-6 h-full m-auto" />
          </div>
        ) : (
          <div className="border rounded-full border-slate-400 p-2 flex items-center justify-center">
            <Person />
            {/* <MdPerson className="w-6 h-full m-auto" /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    createdAt: PropTypes.number.isRequired,
    text: PropTypes.string,
    ai: PropTypes.bool,
    // regen: PropTypes.func,
  }).isRequired,
  regen: PropTypes.func,
};
