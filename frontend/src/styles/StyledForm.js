import styled from "styled-components";
import AddDogPic from "../images/pngDog.png";

export const DogAddForm = styled.div`
  margin: 0 auto;
  width: 40%;
  padding: 50px;
  background-color: #ccc1be82;
`;

export const DogAddBody = styled.div`
  width: 100%;
  height: 90vh;
  color: #4a382e;
  background-image: url(${AddDogPic});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: left;
  background-color: #cdc3bf;
`;
