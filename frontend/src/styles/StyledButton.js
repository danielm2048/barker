import styled from "styled-components";

const Button = styled.button`
	outline: none;
	border: none;
	width: 75px;
	height: 75px;
	border-radius: ${(props) => (props.circle ? "50%" : "")};
	font-size: 26px;
	cursor: pointer;
`;

export default Button;
