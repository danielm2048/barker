import styled from "styled-components";

export const StyledMessenger = styled.div`
	height: calc(100vh - 70px);
	display: flex;
`;

export const ChatMenuWrapper = styled.div`
	padding: 10px;
	height: 100%;
`;

export const ChatMenu = styled.div`
	flex: 3.5;

	@media screen and (max-width: 768px) {
		flex: 1;
	}
`;

export const ChatMenuInput = styled.input`
	width: 90%;
	padding: 10px 0;
	border: none;
	border-bottom: 1px solid gray;

	@media screen and (max-width: 768px) {
		display: none;
	}
`;

export const ChatBox = styled.div`
	flex: 5.5;

	@media screen and (max-width: 768px) {
		flex: 10;
	}
`;

export const ChatBoxWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
	padding: 10px;
	height: 100%;
`;

export const ChatBoxTop = styled.div`
	height: 100%;
	overflow-y: scroll;
	padding-right: 10px;
`;

export const ChatBoxBottom = styled.div`
	margin-top: 5px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const ChatMessageInput = styled.textarea`
	width: 80%;
	height: 90px;
	padding: 10px;
	font-family: "Montserrat", sans-serif;
`;

export const ChatSubmitButton = styled.button`
	width: 70px;
	height: 40px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	background-color: teal;
	color: white;
`;

export const NoConversationText = styled.span`
	position: absolute;
	top: 10%;
	font-size: 50px;
	color: rgb(224, 220, 220);
	cursor: default;
`;

export const StyledConversation = styled.div`
	display: flex;
	align-items: center;
	padding: 10px;
	cursor: pointer;
	margin-top: 20px;

	&:hover {
		background-color: rgb(245, 243, 243);
	}
`;

export const ConversationImg = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	object-fit: cover;
	margin-right: 20px;
`;

export const ConversationName = styled.span`
	font-weight: 500;

	@media screen and (max-width: 768px) {
		display: none;
	}
`;

export const StyledMessage = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 20px;

	align-items: ${(props) => (props.own ? "flex-end" : "")};
`;

export const MessageTop = styled.div`
	display: flex;
`;

export const MessageText = styled.p`
	padding: 10px;
	border-radius: 20px;
	background-color: ${(props) =>
		props.own ? "rgb(245, 241, 241)" : "#1877f2"};
	color: ${(props) => (props.own ? "black" : "white")};
	max-width: 300px;
`;

export const MessageBottom = styled.div`
	font-size: 12px;
	margin-top: 10px;
`;
