import {
  CardContainer,
  StyledCard,
  CardPreview,
  CardInfo,
  CardMoreInfo,
  CardButtonsContainer,
  CardButton,
} from "../styles/StyledCard";

import { MessageCircle, Edit3, X, MoreVertical } from "@styled-icons/feather";
import { Fire } from "@styled-icons/remix-line";

const DogCard = ({ dog }) => {
  return (
    <CardContainer>
      <StyledCard>
        <CardPreview pic={dog.pics[0]} />
        <CardInfo>
          <h6>
            {dog.age >= 12
              ? `${dog.age / 12} Years Old`
              : `${dog.age} Months Old `}
          </h6>
          <h2>{dog.name}</h2>
          <CardMoreInfo color={dog.savedBy >= 15 ? "red" : ""}>
            <span>
              Saved by {dog.savedBy} People
              {dog.savedBy >= 15 && <Fire size="20" />}
            </span>
          </CardMoreInfo>
        </CardInfo>
      </StyledCard>

      <CardButtonsContainer>
        <CardButton>
          <Edit3 size="20" />
        </CardButton>
        <CardButton>
          <MessageCircle size="20" />
        </CardButton>
        <CardButton>
          <X size="20" />
        </CardButton>
        <CardButton>
          <MoreVertical size="20" />
        </CardButton>
      </CardButtonsContainer>
    </CardContainer>
  );
};

export default DogCard;
