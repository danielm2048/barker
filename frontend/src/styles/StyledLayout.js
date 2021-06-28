import styled from "styled-components";

import homeHeader from "../images/header.jpg";

export const HomeHeader = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 95vh;
	background-image: url(${homeHeader});
	background-repeat: no-repeat;
	background-size: 100% 100%;

	@media screen and (max-width: 768px) {
		background-size: cover;
		background-position-x: right;
	}
`;

export const HomeTitle = styled.h1`
	margin: 200px 0 0 60px;
	font-size: 3.5vw;
	word-wrap: break-word;
	white-space: pre-wrap;
	text-align: start;

	@media screen and (max-width: 768px) {
		font-size: 8vw;
	}
`;
