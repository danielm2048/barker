import styled from "styled-components";

const SlideButton = styled.button`
	outline: none;
	border: none;
	width: 60px;
	height: 40px;
	background-color: ${(props) => (props.color ? props.color : "")};
	border-radius: ${(props) => (props.circle ? "50%" : "10px")};
	font-size: 26px;
	cursor: pointer;
`;

export default SlideButton;
