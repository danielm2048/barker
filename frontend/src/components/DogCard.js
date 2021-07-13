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

import { useDrawerStore } from "../store";

const DogCard = ({ dog, isDogMine, unsaveDog, editDog, messageOwner }) => {
	const setDogAndOpen = useDrawerStore((state) => state.setDogAndOpen);

	return (
		<CardContainer>
			<StyledCard>
				<CardPreview pic={dog.pics ? dog.pics[0] : dog.pictures[0]} />
				<CardInfo>
					<h6>
						{dog.age >= 12
							? `${dog.age / 12} Years Old`
							: `${dog.age} Months Old `}
					</h6>
					<h2>{dog.name}</h2>
					{dog.savedBy && (
						<CardMoreInfo color={dog.savedBy >= 15 ? "red" : ""}>
							<span>
								Saved by {dog.savedBy} People
								{dog.savedBy >= 15 && <Fire size="20" />}
							</span>
						</CardMoreInfo>
					)}
				</CardInfo>
			</StyledCard>
			<CardButtonsContainer>
				{editDog && (
					<CardButton>
						<Edit3 size="20" />
					</CardButton>
				)}
				{messageOwner && (
					<CardButton onClick={() => messageOwner({})}>
						<MessageCircle size="20" />
					</CardButton>
				)}
				{unsaveDog && (
					<CardButton onClick={() => unsaveDog({ dogId: dog.id })}>
						<X size="20" />
					</CardButton>
				)}

				<CardButton onClick={() => setDogAndOpen(dog, isDogMine)}>
					<MoreVertical size="20" />
				</CardButton>
			</CardButtonsContainer>
		</CardContainer>
	);
};

export default DogCard;
