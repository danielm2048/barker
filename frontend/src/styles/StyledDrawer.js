import styled from "styled-components";

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
	margin-right: 30px;

	p {
		width: 40%;
		word-wrap: break-word;
		margin: 20px 0;
	}
`;
