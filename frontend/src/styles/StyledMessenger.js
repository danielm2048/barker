import styled from "styled-components";

import chat from "../images/chat.jpg";

export const StyledMessenger = styled.div`
  height: 85vh;
  display: flex;
`;

export const ChatMenuWrapper = styled.div`
  padding: 10px;
  height: 100%;
  border-right: 1px solid black;

  hr {
    width: 95%;
    border: 0.5px solid grey;
    margin: 5px 0;
  }
`;

export const ChatMenu = styled.div`
  flex: 3.5;

  @media screen and (max-width: 768px) {
    flex: 1;
  }
`;

export const ChatMenuInput = styled.input`
  width: 90%;
  padding: 10px;
  border: none;

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
  background-image: url(${chat});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
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
  justify-content: center;
`;

export const ChatMessageInput = styled.input`
  width: 80%;
  height: 40px;
  padding: 10px;
  border-radius: 5px 0 0 5px;
  font-family: "Montserrat", sans-serif;

  &:focus {
    outline: none;
  }
`;

export const ChatSubmitButton = styled.button`
  width: 70px;
  height: 64px;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  background-color: #069;
  color: white;
`;

export const NoConversationText = styled.span`
  position: absolute;
  top: 10%;
  font-size: 50px;
  color: black;
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

export const MessageText = styled.div`
  padding: 10px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.own ? "rgb(245, 241, 241)" : "#fd9090"};
  color: ${(props) => (props.own ? "black" : "white")};
  max-width: 300px;
`;

export const MessageBottom = styled.div`
  font-size: 12px;
  margin-top: 10px;
`;
