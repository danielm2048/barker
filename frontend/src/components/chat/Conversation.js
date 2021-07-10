import useProfile from "../../hooks/useProfile";
import {
	StyledConversation,
	ConversationImg,
	ConversationName,
} from "../../styles/StyledMessenger";

const Conversation = ({ conversation, currentUser }) => {
	const { data: user } = useProfile(
		conversation.members.find((m) => m !== currentUser.id)
	);

	return (
		<StyledConversation>
			<ConversationImg src={user?.pic} alt="user profile pic" />
			<ConversationName>{user?.name}</ConversationName>
		</StyledConversation>
	);
};

export default Conversation;
