import styled from "styled-components";
import dogNotFound from "../images/dogNotFound.jpg";

const NotFoundPage = styled.div`
  width: 100%;
  height: 88vh;
  background-image: url(${dogNotFound});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-color: #97d4cc;
  overflow-y: hidden;
`;

export default NotFoundPage;
