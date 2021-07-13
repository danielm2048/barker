import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { io } from "socket.io-client";

import Conversation from "../components/chat/Conversation";
import Message from "../components/chat/Message";

import useAuth from "../hooks/useAuth";
import useConversations from "../hooks/chat/useConversations";
import useMessages from "../hooks/chat/useMessages";
import useAddMessage from "../hooks/chat/useAddMessage";

import { Send } from "@styled-icons/feather";

import {
	StyledMessenger,
	ChatMenu,
	ChatMenuWrapper,
	ChatMenuInput,
	ChatBox,
	ChatBoxWrapper,
	ChatBoxTop,
	ChatBoxBottom,
	ChatMessageInput,
	ChatSubmitButton,
} from "../styles/StyledMessenger";

export default function Messenger() {
	const [currentChat, setCurrentChat] = useState(null);
	const [newMessage, setNewMessage] = useState("");
	const [arrivalMessage, setArrivalMessage] = useState(null);

	const queryClient = useQueryClient();
	const { data: user } = useAuth();
	const { data: conversations } = useConversations();
	const { data: messages } = useMessages(currentChat?._id);
	const { mutate: addMessage } = useAddMessage();

	const socket = useRef();
	const scrollRef = useRef();

	useEffect(() => {
		socket.current = io("ws://localhost:8900");
		socket.current.on("getMessage", (data) => {
			setArrivalMessage({
				sender: data.senderId,
				text: data.text,
				createdAt: Date.now(),
			});
		});
	}, []);

	useEffect(() => {
		arrivalMessage &&
			currentChat?.members.includes(arrivalMessage.sender) &&
			queryClient.setQueryData(["messages", currentChat._id], (prev) => {
				return [...prev, arrivalMessage];
			});
	}, [queryClient, arrivalMessage, currentChat]);

	useEffect(() => {
		socket.current.emit("addUser", user.id);
	}, [user]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const message = {
			sender: user.id,
			text: newMessage,
			conversationId: currentChat._id,
		};

		const receiverId = currentChat.members.find((member) => member !== user.id);

		socket.current.emit("sendMessage", {
			senderId: user.id,
			receiverId,
			text: newMessage,
		});

		try {
			addMessage(message);
			setNewMessage("");
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<StyledMessenger>
			<ChatMenu>
				<ChatMenuWrapper>
					<ChatMenuInput placeholder="Search..." />
					<hr />
					{conversations?.map((c, i) => (
						<div key={i} onClick={() => setCurrentChat(c)}>
							<Conversation conversation={c} currentUser={user} />
							<hr />
						</div>
					))}
				</ChatMenuWrapper>
			</ChatMenu>
			<ChatBox>
				<ChatBoxWrapper>
					{currentChat && (
						<>
							<ChatBoxTop>
								{messages?.map((m, i) => (
									<div key={i} ref={scrollRef}>
										<Message message={m} own={m.sender === user.id} />
									</div>
								))}
							</ChatBoxTop>
							<ChatBoxBottom>
								<ChatMessageInput
									placeholder="write something..."
									onChange={(e) => setNewMessage(e.target.value)}
									value={newMessage}
									onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
								></ChatMessageInput>
								<ChatSubmitButton onClick={handleSubmit}>
									<Send size="30" />
								</ChatSubmitButton>
							</ChatBoxBottom>
						</>
					)}
				</ChatBoxWrapper>
			</ChatBox>
		</StyledMessenger>
	);
}
