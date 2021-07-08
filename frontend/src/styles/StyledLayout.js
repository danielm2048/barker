import { Link } from "react-router-dom";
import styled from "styled-components";

import homeHeader from "../images/header3.png";

export const Main = styled.div`
  display: block;
  padding: 0.1px;
  position: relative;
  min-height: 100vh;
`;

export const Canvas = styled.div`
  height: 100%;
  width: ${(props) => (props.drawer ? "100%" : 0)};
  position: fixed;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.9);
  overflow-y: auto;
  overflow-x: hidden;
  opacity: ${(props) => (props.drawer ? 0.8 : 0)};
  transition: opacity 0.5s;
`;

export const HomeHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
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
  padding: 8px;
  text-decoration: none;
`;

export const SwooferButtons = styled.div`
  position: absolute;
  top: ${(props) => props.top}%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  z-index: 1;
`;
