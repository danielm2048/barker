import { useParams } from "react-router-dom";

import useProfile from "../hooks/useProfile";
import useAuth from "../hooks/useAuth";

import DogCard from "../components/DogCard";
import Loader from "../components/Loader";
import NotFound from "./NotFound";

import {
  ProfileImg,
  ProfileHeader,
  ProfileHeaderData,
  ProfileBody,
  ProfileAbout,
  ProfileContent,
} from "../styles/StyledProfile";

import { Badge } from "@styled-icons/zondicons/Badge";
import { ExpandMore } from "@styled-icons/material-rounded/ExpandMore";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

function Profile() {
  const { id } = useParams();

  const { data, isLoading, isError } = useProfile(id);
  const {
    data: userData,
    isLoading: userIsLoading,
    isError: userIsError,
  } = useAuth();

  if (isLoading || userIsLoading) {
    return <Loader />;
  }
  if (isError || userIsError) {
    return <NotFound />;
  }

  return (
    <div>
      <ProfileHeader>
        <ProfileImg src={data.pic} alt="user profile pic" />
        <ProfileHeaderData>
          <h1>
            {data.name}
            {data.isOrganization ? <Badge size="46" color="#007eff" /> : ""}
          </h1>
          <p>
            {data.email} | {data.phone && <span>{data.phone} | </span>}
            {data.city}
          </p>
        </ProfileHeaderData>
      </ProfileHeader>
      <ProfileBody>
        {data.info && (
          <ProfileAbout>
            <h2>About</h2>
            <p>{data.info}</p>
          </ProfileAbout>
        )}
        <ProfileContent>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore size="30" color="gray" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              {id === userData.id ? (
                <h2>My Dogs</h2>
              ) : (
                <h2>{data.name} Dogs</h2>
              )}
            </AccordionSummary>
            <AccordionDetails
              style={{
                display: "flex",
                flexDirection: "column",
                width: "90%",
                margin: "0 auto",
              }}
            >
              {data.dogs.map((dog, i) => (
                <DogCard
                  key={i}
                  dog={dog}
                  isDogMine={id === userData.id}
                  editDog={true}
                />
              ))}
            </AccordionDetails>
          </Accordion>
        </ProfileContent>
      </ProfileBody>
    </div>
  );
}

export default Profile;
