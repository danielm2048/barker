import { Link } from "react-router-dom";
import styled from "styled-components";

import homeHeader from "../images/header3.png";

export const HomeHeader = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 95vh;
	background-image: url(${homeHeader});
	background-repeat: no-repeat;
	background-size: contain;
	background-position: right;
	background-color: #eed3cc;

	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;

	& h1 {
		margin-top: 9rem;
	}

	@media screen and (max-width: 768px) {
		background-size: cover;
		background-position-x: right;
	}
`;

export const HomeTitle = styled.h1`
	margin-left: 60px;
	font-size: 3.5vw;
	word-wrap: break-word;
	white-space: pre-wrap;
	text-align: start;
	/* color: #f4f4f4; */

	@media screen and (max-width: 768px) {
		font-size: 8vw;
	}
`;

export const HomeLink = styled(Link)`
	margin-left: 60px;
	background-color: black;
	color: white;
	border-radius: 10px;
	border: 2px black solid;
	font-size: 18px;
	padding: 5px;
	text-decoration: none;
`;
