import styled from "styled-components";

export const StyledCard = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  max-width: 100%;
  margin: 20px;
  overflow: hidden;
  width: 700px;
  z-index: 1;

  h2 {
    letter-spacing: 1px;
    margin: 10px 0;
  }

  h6 {
    opacity: 0.6;
    margin: 0;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
`;

export const CardPreview = styled.div`
  background-image: url(${(props) => props.pic});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  padding: 90px;
  max-width: 300px;
`;

export const CardInfo = styled.div`
  padding: 30px;
  position: relative;
  width: 100%;
`;

export const CardMoreInfo = styled.div`
  padding: 12px 25px;
  position: absolute;
  bottom: 30px;
  right: 15px;
  font-size: 16px;

  span {
    opacity: 0.6;
    letter-spacing: 1px;
    color: ${(props) => (props.color ? props.color : "black")};
  }

  svg {
    fill: ${(props) => (props.color ? props.color : "black")};
  }
`;

export const CardButtonsContainer = styled.div`
  z-index: 0;
  position: absolute;
  top: 2.5rem;
  left: 2.5rem;
  border-radius: 100%;
  width: 0rem;
  height: 0rem;
  transform: translate(-50%, -50%);
  transition: 0.25s cubic-bezier(0.25, 0, 0, 1);
`;

export const CardButton = styled.button`
  --background: #3c3b3d;
  --text: white;

  display: grid;
  place-items: center;
  position: absolute;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 100%;
  background: var(--background);
  color: var(--text);
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: 0.25s cubic-bezier(0.25, 0, 0, 1);
  box-shadow: 0 0 0rem -0.25rem var(--background);
  &:hover {
    background: var(--text);
    color: var(--background);
    box-shadow: 0 0 1rem -0.25rem var(--background);
  }

  &:hover svg {
    fill: var(--background);
  }
  &:first-child:nth-last-child(1),
  &:first-child:nth-last-child(1) ~ * {
    //If there is 1 child
    &:nth-child(1) {
      left: 25%;
      top: 25%;
    }
  }
  &:first-child:nth-last-child(2),
  &:first-child:nth-last-child(2) ~ * {
    //If there are 2 children
    &:nth-child(1) {
      left: 37.5%;
      top: 18.75%;
    }
    &:nth-child(2) {
      left: 18.75%;
      top: 37.5%;
    }
  }
  &:first-child:nth-last-child(3),
  &:first-child:nth-last-child(3) ~ * {
    //If there are 3 children
    &:nth-child(1) {
      left: 50%;
      top: 15.625%;
    }
    &:nth-child(2) {
      left: 25%;
      top: 25%;
    }
    &:nth-child(3) {
      left: 15.625%;
      top: 50%;
    }
  }
  &:first-child:nth-last-child(4), //If there are 4 children, if first child is also 4th item from bottom get self, and
              &:first-child:nth-last-child(4) ~ * {
    //If there are 4 children, if first child is also 4th item from bottom get siblings
    &:nth-child(1) {
      left: 62.5%;
      top: 18.75%;
    }
    &:nth-child(2) {
      left: 37.5%;
      top: 18.75%;
    }
    &:nth-child(3) {
      left: 18.75%;
      top: 37.5%;
    }
    &:nth-child(4) {
      left: 18.75%;
      top: 62.5%;
    }
  }
`;

export const CardContainer = styled.div`
  position: relative;
  margin-bottom: 20px;

  &:hover ${CardButtonsContainer}, ${CardButtonsContainer}:focus-within {
    //Hover or a button inside is focused
    width: 10rem;
    height: 10rem;
  }
`;
