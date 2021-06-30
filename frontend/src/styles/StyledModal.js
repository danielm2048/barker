import styled, { keyframes } from "styled-components";

export const Modal = styled.div`
	display: ${(props) => (props.modal ? "block" : "none")};
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgb(0, 0, 0);
	background-color: rgba(0, 0, 0, 0.4);
	padding-top: 60px;
`;

const animatezoom = keyframes`
  from {
      transform: scale(0)
    } 
  to {
      transform: scale(1)
    }
`;

export const ModalContent = styled.div`
	background-color: #fefefe;
	margin: 5% auto 15% auto;
	border: 1px solid #888;
	width: 40%;
	-webkit-animation: ${animatezoom} 0.6s;
	animation: ${animatezoom} 0.6s;
	@media screen and (max-width: 768px) {
		width: 80%;
	}
`;

export const ModalImgContainer = styled.div`
	text-align: center;
	margin: 24px 0 12px 0;
	position: relative;
`;

export const ModalImg = styled.img`
	width: 60%;
`;

export const Close = styled.span`
	position: absolute;
	right: 25px;
	top: 0;
	color: #000;
	font-size: 30px;
	font-weight: bold;
	&:hover,
	&:focus {
		color: red;
		cursor: pointer;
	}
`;

export const ModalActions = styled.div`
	padding: 16px;
`;

export const ModalButton = styled.button`
	background-color: #eed3cc;
	color: white;
	padding: 14px 20px;
	margin: 8px 0;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	width: 100%;
	font-size: 16px;
	&:hover {
		opacity: 0.8;
	}
`;

export const ModalInput = styled.input`
	width: 100%;
	padding: 12px 4px;
	margin: 8px 0;
	display: inline-block;
	border: 1px solid #ccc;
`;

export const ModalTextArea = styled.textarea`
	width: 100%;
	padding: 12px 20px;
	margin: 8px 0;
	display: inline-block;
	border: 1px solid #ccc;
	resize: vertical;
`;

const errorAnimate = keyframes`
    0% { opacity: 0;}
    99% { opacity: 0.99;width: 100%; height: 100%;}
    100% { opacity: 1;width: 100%; height: 100%;}
`;

export const ModalError = styled.div`
	width: 100%;
	padding: 16px 20px;
	margin: 12px 0;
	display: inline-block;
	/* text-align: center; */
	background-color: #f44336;
	color: white;
	animation: ${errorAnimate} 1s;
`;

export const TextButton = styled.button`
	width: 100%;
	margin: 0 auto 20px auto;
	background: none;
	border: none;
	padding: 0;
	outline: none;
	color: #069;
	cursor: pointer;
`;
