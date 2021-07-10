import { format } from "timeago.js";

import {
	StyledMessage,
	MessageTop,
	MessageText,
	MessageBottom,
} from "../../styles/StyledMessenger";

const Message = ({ message, own }) => {
	return (
		<StyledMessage own={own}>
			<MessageTop>
				<MessageText own={own}>{message.text}</MessageText>
			</MessageTop>
			<MessageBottom>{format(message.createdAt)}</MessageBottom>
		</StyledMessage>
	);
};

export default Message;
