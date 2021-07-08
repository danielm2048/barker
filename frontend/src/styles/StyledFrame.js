import styled from "styled-components";
import { motion } from "framer-motion";

import Stack from "../components/Stack";

export const StackFrame = styled.div`
	width: 100%;
	height: 100%;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
`;

export const CardFrame = styled(motion.div)`
	position: absolute;
	z-index: 2;
	cursor: grab;

	&:active {
		cursor: grabbing;
	}
`;

export const CardInfo = styled.div`
	display: flex;
	flex-direction: column;
	width: 90%;
	text-align: left;
	margin-top: 80%;

	h1 {
		font-size: 26px;
		margin: 3px 0;
	}

	h2 {
		font-size: 22px;
		margin: 0 0 0 10px;
		font-weight: normal;
	}

	h3 {
		font-size: 20px;
		margin: 0 0 0 auto;
		font-weight: normal;
	}

	span {
		text-transform: capitalize;
		font-size: 16px;
		opacity: 0.8;
	}

	p {
		display: -webkit-box;
		font-size: 16px;
		word-wrap: break-word;
		/* text-overflow: ellipsis; */
		overflow: hidden;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		margin: 5px 0;
	}
`;

export const Wrapper = styled(Stack)`
	background: #eed3cc;
`;

export const Item = styled.div`
	background: #f9fafb;
	background-image: url(${(props) => props.pic});
	background-size: 95% 65%;
	background-repeat: no-repeat;
	background-position: center 10px;
	width: 350px;
	height: 500px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 80px;
	text-shadow: 0 10px 10px #d1d5db;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
	border-radius: 8px;
	transform: ${() => {
		let rotation = Math.random() * (5 - -5) + -5;
		return `rotate(${rotation}deg)`;
	}};
`;

export const SlideshowContainer = styled.div`
	width: 50%;
	height: 75%;
	/* overflow: hidden; */
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;

	margin: 150px 0;

	img {
		position: absolute;
		max-width: 55vh;
		max-height: 55vh;
		margin-left: auto;
		margin-right: auto;
		left: 0;
		right: 0;
	}

	button {
		z-index: 4;
	}
`;
