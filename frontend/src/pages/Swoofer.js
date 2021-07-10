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
	CornerDownLeft,
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
	const [lastDog, setLastDog] = useState([]);
	const setIsClicked = useChoiceStore((state) => state.setIsClicked);
	const { setDogAndOpen } = useDrawerStore();
	const [filterModal, setFilterModal] = useState(false);

	const [topDog, setTopDog] = useState(null);
	const [topDogIndex, setTopDogIndex] = useState(null);

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

	useEffect(() => {
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
	}, [topDogIndex, filter]);

	if (isLoading || !data) {
		return <Loader />;
	}

	return (
		<>
			<Wrapper
				onVote={(vote) => {
					setLastDog((pervArray) => [topDogIndex, ...pervArray]);

					vote ? mutate({ dogId: topDog.id }) : console.log(vote);
				}}
				setTopDogIndex={setTopDogIndex}
			>
				{data.map((pet, i) => (
					<Item key={i} whileTap={{ scale: 1.15 }} pic={pet.pics[0]}>
						<CardInfo>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "start",
								}}
							>
								<h1>
									<span>Name:</span>
									{pet.name}{" "}
									{pet.contact.isOrg ? <Badge size="26" color="#007eff" /> : ""}
								</h1>
								<h2>
									<span>Age: </span>
									{pet.age >= 12
										? `${pet.age / 12} Years Old`
										: `${pet.age} Months Old `}
								</h2>
								<h3>
									<span>Breed: </span>
									{pet.breed}
								</h3>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									height: 30,
									marginTop: "3px",
								}}
							>
								<div>
									<p style={{ fontWeight: "bold" }}>
										<span>Location: </span>
										{pet.city}
									</p>
									<p>
										<span>Gender: </span> {pet.gender ? "Female" : "Male"}
									</p>
								</div>
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
				}}
			>
				{/* Needs to be fixed 👇 */}
				<Button
					onClick={() => setTopDog(data[topDogIndex + 1])}
					style={{ marginLeft: 50 }}
					color="transparent"
				>
					<CornerDownLeft size="24" />
				</Button>
				<hr style={{ transform: "rotate(90dg)" }} />
				<Button
					onClick={() => setFilterModal(true)}
					style={{ marginRight: 50 }}
					color="transparent"
				>
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
