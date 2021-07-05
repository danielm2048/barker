import styled from "styled-components";

export const ProfileImg = styled.img`
  max-width: 200px;
  border-radius: 50%;
  margin-inline: 100px;
  margin-top: 20px;
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: flex-end;
  background-color: #ffffff;
  background-image: linear-gradient(
    180deg,
    rgb(233, 187, 187) 59%,
    rgb(248, 137, 137) 100%
  );
  color: #ffffff;
`;

export const ProfileHeaderData = styled.div`
  display: "flex";
  flexdirection: "column";
`;
