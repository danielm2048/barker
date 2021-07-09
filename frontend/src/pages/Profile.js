import { useParams } from "react-router-dom";
import useProfile from "../hooks/useProfile";
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
import Typography from "@material-ui/core/Typography";

function Profile() {
  const { id } = useParams();

  const { data, isLoading, isError } = useProfile(id);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <NotFound />;
  }
  if (data) {
    console.log(data);
  }
  return (
    <div>
      <ProfileHeader>
        <ProfileImg src={data.pic} alt="user profile pic" />
        <ProfileHeaderData>
          <h1>
            {data.name}{" "}
            {data.isOrganization ? <Badge size="46" color="#007eff" /> : ""}
          </h1>
          <p>
            {data.email} | {data.phone && <span>{data.phone} | </span>}
            {data.city}
          </p>
        </ProfileHeaderData>
      </ProfileHeader>
      <ProfileBody>
        <ProfileAbout>
          <h2>About</h2>
        </ProfileAbout>
        <ProfileContent>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore size="30" color="gray" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <h2>My Dogs</h2>
            </AccordionSummary>
            <AccordionDetails>My Dog list</AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore size="30" color="gray" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <h2>My Saved Dogs</h2>
            </AccordionSummary>
            <AccordionDetails>My Saved Dog list</AccordionDetails>
          </Accordion>
        </ProfileContent>
      </ProfileBody>
    </div>
  );
}

export default Profile;
