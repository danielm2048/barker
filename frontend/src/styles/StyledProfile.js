import profileHead from "../images/profileHead.png";

import styled from "styled-components";

export const ProfileImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-inline: 100px;
  margin-top: 20px;
  box-shadow: 2px 2px 4px #000000;
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: flex-end;
  background-image: url(${profileHead});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right;
  color: #ffffff;
  opacity: 0.8;
  height: 30vh;
`;

export const ProfileHeaderData = styled.div`
  display: "flex";
  flex-direction: "column";
  text-shadow: 2px 2px 4px #000000;
`;

export const ProfileBody = styled.div`
  height: 58vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;
export const ProfileAbout = styled.div`
  width: 25%;
  height: 30vh;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 15px;
  background-color: rgb(176 176 179 / 26%);

  h2 {
    text-align: center;
  }
`;
export const ProfileContent = styled.div`
  width: 50%;
  h2 {
    text-align: center;
  }
`;
