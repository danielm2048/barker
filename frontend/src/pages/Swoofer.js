import { useEffect, useState } from "react";
import axios from "axios";

import { useChoiceStore, useDrawerStore } from "../store";
import useSaveDog from "../hooks/useSaveDog";

import Loader from "../components/Loader";

import Button from "../styles/StyledButton";
import { Wrapper, Item, CardInfo } from "../styles/StyledFrame";

import {
	ArrowLeft,
	MoreVertical,
	RotateCcw,
	Filter,
} from "@styled-icons/feather";
import { Badge } from "@styled-icons/zondicons/Badge";
import { HeartIcon } from "../styles/StyledIcons";
import { SwooferButtons } from "../styles/StyledLayout";
import FilterModal from "../components/layout/FilterModal";

const Swoofer = () => {
	const { mutate } = useSaveDog();

	const [data, setData] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [filter, setFilter] = useState(false);
	const setIsClicked = useChoiceStore((state) => state.setIsClicked);
	const { setDogAndOpen } = useDrawerStore();
	const [filterModal, setFilterModal] = useState(false);

	const [topDog, setTopDog] = useState(null);
	const [topDogIndex, setTopDogIndex] = useState(null);
	const [goBack, setGoBack] = useState(false);

	useEffect(() => {
		async function fetch() {
			setIsLoading(true);
			if (filter) {
				const { data } = await axios.get(`/api/dogs/${filter}`);
				setData(data);
			} else {
				const { data } = await axios.get(`/api/dogs/`);
				setData(data);
			}
			setTopDogIndex(null);
			setIsLoading(false);
		}
		fetch();
	}, [filter]);

	useEffect(() => {
		if (data) {
			if (topDogIndex === null) {
				setTopDogIndex(data.length - 1);
				setTopDog(data[data.length - 1]);
			} else if (topDogIndex !== data.length - 1) {
				setTopDog(data[topDogIndex]);
			}
		}
	}, [topDogIndex, data]);

	if (isLoading || !data) {
		return <Loader />;
	}

	return (
		<>
			<Wrapper
				onVote={(vote) => {
					async function fetch() {
						if (topDogIndex === 0) {
							setIsLoading(true);
							if (filter) {
								const { data } = await axios.get(`/api/dogs/${filter}`);
								setData(data);
							} else {
								const { data } = await axios.get(`/api/dogs/`);
								setData(data);
							}
							setTopDogIndex(null);
							setIsLoading(false);
						}
					}
					fetch();
					vote ? mutate({ dogId: topDog.id }) : console.log(vote);
				}}
				setTopDogIndex={setTopDogIndex}
				goBack={goBack}
				setGoBack={setGoBack}
			>
				{data.map((dog, i) => (
					<Item
						key={i}
						whileTap={{ scale: 1.15 }}
						pic={dog.pics[0]}
						id={dog.id}
					>
						<CardInfo>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "start",
								}}
							>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										height: 30,
										width: "100%",
										marginTop: "3px",
									}}
								>
									<h1>
										<span>Name:</span>
										{dog.name}{" "}
										{dog.contact.isOrg ? (
											<Badge size="26" color="#007eff" />
										) : (
											""
										)}
									</h1>

									<Button
										color="transparent"
										onClick={() => setDogAndOpen(topDog, false)}
										style={{ width: 60, height: 60 }}
									>
										<MoreVertical
											size="30"
											style={{
												fill: "black",
											}}
										/>
									</Button>
								</div>
								<h2>
									<span>Age: </span>
									{dog.age >= 12
										? `${dog.age / 12} Years Old`
										: `${dog.age} Months Old `}
								</h2>
								<h3>
									<span>Breed: </span>
									{dog.breed}
								</h3>
							</div>
							<div>
								<p style={{ fontWeight: "bold" }}>
									<span>Location: </span>
									{dog.city}
								</p>
								<p>
									<span>Gender: </span> {dog.gender ? "Female" : "Male"}
								</p>
							</div>
						</CardInfo>
					</Item>
				))}
			</Wrapper>

			<SwooferButtons top="50">
				<Button
					style={{ boxShadow: "2px 2px 4px #000000" }}
					circle
					onClick={() => setIsClicked(true, "left")}
				>
					<ArrowLeft size="24" />
				</Button>
				<Button
					style={{ boxShadow: "2px 2px 4px #000000" }}
					circle
					onClick={() => setIsClicked(true, "right")}
				>
					<HeartIcon size="24" />
				</Button>
			</SwooferButtons>

			<SwooferButtons
				top="88"
				style={{
					backgroundColor: "#f4f4f4",
					borderRadius: 10,
					width: "20%",
					margin: "0 40%",
					boxShadow: "2px 2px 4px #000000",
					justifyContent: "space-evenly",
				}}
			>
				<Button onClick={() => setGoBack(true)} color="transparent">
					<RotateCcw size="24" />
				</Button>
				<hr style={{ transform: "rotate(90dg)", margin: 0 }} />
				<Button onClick={() => setFilterModal(true)} color="transparent">
					<Filter size="24" />
				</Button>
			</SwooferButtons>

			<FilterModal
				filter={filter}
				setFilter={setFilter}
				openModal={filterModal}
				setOpenModal={setFilterModal}
			/>
		</>
	);
};

export default Swoofer;
