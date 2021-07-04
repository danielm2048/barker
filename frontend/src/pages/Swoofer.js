import useDogs from "../hooks/useDogs";
import { useChoiceStore } from "../store";

import Loader from "../components/Loader";

import Button from "../styles/StyledButton";
import { Wrapper, Item, CardInfo } from "../styles/StyledFrame";

import { ArrowLeft } from "@styled-icons/feather";
import { HeartIcon } from "../styles/StyledIcons";

const Swoofer = () => {
	const { isLoading, isError, error, data } = useDogs("Kefar Sava");

	const setIsClicked = useChoiceStore((state) => state.setIsClicked);

	if (isLoading || !data) {
		return <Loader />;
	}

	if (isError) {
		console.error(error);
	}

	return (
		<>
			<Wrapper onVote={(item, vote) => console.log(item.props, vote)}>
				{data.map((pet, i) => (
					<Item key={i} whileTap={{ scale: 1.15 }} pic={pet.pics[0]}>
						<CardInfo>
							<div style={{ display: "flex", alignItems: "baseline" }}>
								<h1>{pet.name}, </h1>
								<h2>{pet.age}</h2>
								<h3>{pet.breed}</h3>
							</div>
							<span>{pet.city.toLowerCase()}</span>
							<p>{pet.info}</p>
						</CardInfo>
					</Item>
				))}
			</Wrapper>

			<div
				style={{
					position: "absolute",
					top: "50%",
					width: "100%",
					display: "flex",
					justifyContent: "space-around",
					zIndex: 1,
				}}
			>
				<Button circle onClick={() => setIsClicked(true, "left")}>
					<ArrowLeft size="24" />
				</Button>
				<Button circle onClick={() => setIsClicked(true, "right")}>
					<HeartIcon size="24" />
				</Button>
			</div>
		</>
	);
};

export default Swoofer;
