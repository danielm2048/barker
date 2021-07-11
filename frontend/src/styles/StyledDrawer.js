import styled from "styled-components";
import { Link } from "react-router-dom";

export const Drawer = styled.div`
	position: fixed;
	bottom: 0;
	height: ${(props) => (props.open ? "90vh" : "0px")};
	width: 100vw;

	background-color: #f4f4f4;
	transition: 0.2s;
	border-radius: 15px 15px 0 0;
	z-index: 5;
`;

export const DrawerContent = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	height: 100%;
	overflow-y: hidden;
	margin-right: 100px;
	margin-left: 100px;

	h2,
	h3,
	h4,
	p {
		margin: 5px 0;
	}

	p {
		width: 40%;
		word-wrap: break-word;
	}
`;

export const LinkButton = styled(Link)`
	cursor: pointer;
	display: inline-block;
	margin: 5px 0px;
	position: relative;
	text-align: center;
	text-decoration: none;
	width: 50%;
	touch-action: manipulation;
	font-size: 16px;
	line-height: 20px;
	font-weight: 600;
	border-radius: 8px;
	border-width: 1px;
	border-style: solid;
	outline: none;
	padding: 10px 20px;
	transition: box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s,
		-webkit-transform 0.1s ease 0s, transform 0.1s ease 0s;
	-webkit-tap-highlight-color: transparent;
	border-color: rgb(34, 34, 34);
	background: rgb(255, 255, 255);
	color: rgb(34, 34, 34);
`;
