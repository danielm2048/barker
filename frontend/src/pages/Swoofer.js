import { useEffect, useState } from "react";
import axios from "axios";

import { ClickContext } from "../context";

import Loader from "../components/Loader";

import Button from "../styles/StyledButton";
import { Wrapper, Item, CardInfo } from "../styles/StyledFrame";

const Swoofer = () => {
	const [pets, setPets] = useState([]);
	const [loading, setLoading] = useState(false);
	const [isClicked, setIsClicked] = useState({
		clicked: false,
		direction: null,
	});

	useEffect(() => {
		const fetchPets = async () => {
			setLoading(true);

			try {
				const { data } = await axios.get("/api/dogs/?location=ROSH HAAYIN");

				setPets(data);
			} catch (err) {
				console.error(err);
				alert(
					"Sorry, we couldn't generate a question right now.. Please try again later"
				);
			}

			setLoading(false);
		};
		fetchPets();
	}, []);

	return (
		<>
			<ClickContext.Provider value={{ isClicked, setIsClicked }}>
				{loading || !pets.length ? (
					<Loader />
				) : (
					<Wrapper onVote={(item, vote) => console.log(item.props, vote)}>
						{pets.map((pet, i) => (
							<Item key={i} whileTap={{ scale: 1.15 }} pic={pet.pics[0]}>
								{/* <CardImg src={pet.pics[0]} alt="the pet" /> */}
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
				)}
			</ClickContext.Provider>

			<div
				style={{
					height: 150,
					width: 200,
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<Button
					circle
					onClick={() => setIsClicked({ clicked: true, direction: "left" })}
				>
					🤔
				</Button>
				<Button
					circle
					onClick={() => setIsClicked({ clicked: true, direction: "right" })}
				>
					😍
				</Button>
			</div>
		</>
	);
};

export default Swoofer;
