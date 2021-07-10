import { Link } from "react-router-dom";
import { Drawer, DrawerContent } from "../../styles/StyledDrawer";
import Button from "../../styles/StyledButton";
import { Close } from "../../styles/StyledModal";
import { HeartIcon } from "../../styles/StyledIcons";
import { Award, AtSign, Phone, User, Users, X } from "@styled-icons/feather";

import Slideshow from "../Slideshow";
import { useDrawerStore, useChoiceStore } from "../../store";

import useAuth from "../../hooks/useAuth";
import useAddConversation from "../../hooks/chat/useAddConversation";

const SwooferDrawer = () => {
	const { open, setOpen, dog, isDogMine } = useDrawerStore();
	const setIsClicked = useChoiceStore((state) => state.setIsClicked);

	const { data: user } = useAuth();
	const { mutate: addConversation } = useAddConversation();

	if (!dog) {
		return null;
	}

	return (
		<Drawer open={open}>
			<Close onClick={() => setOpen(false)} style={{ right: 35, top: 25 }}>
				<X size="32" title="Close" />
			</Close>

			<DrawerContent>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						width: "50%",
						height: "55vh",
						margin: 10,
						padding: 10,
						boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
						borderRadius: 10,
					}}
				>
					<h1 style={{ marginBottom: 5 }}>
						{dog.name}
						<Award size="36" color="#f97e7e" />
					</h1>
					<h2>{dog.breed}</h2>
					<h3>
						{dog.age >= 12
							? `${dog.age / 12} Years Old`
							: `${dog.age} Months Old `}
					</h3>
					<p style={{ width: "60%" }}>{dog.info}</p>
					<span>{dog.gender ? "Female" : "Male"}</span>
				</div>

				<div>
					<Slideshow pics={dog.pics} />

					{!isDogMine && (
						<div
							style={{
								display: "flex",
								justifyContent: "space-evenly",
								alignItems: "center",
								margin: 10,
								boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
								borderRadius: 10,
							}}
						>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									width: "30%",
								}}
							>
								<h3 style={{ marginBottom: 5 }}>
									<Link
										to={`/profile/${dog.contact?.id}`}
										style={{
											color: "black",
											textDecoration: "none",
											fontWeight: "bold",
										}}
										title="Click here to learn more about the owner"
									>
										{dog.contact?.name}
									</Link>
									{dog.contact?.isOrg ? (
										<Users size="30" />
									) : (
										<User size="30" />
									)}
								</h3>
								{dog.contact?.phone && (
									<h4>
										<Phone size="28" />
										{dog.contact?.phone}
									</h4>
								)}
								<h4>
									<AtSign size="28" /> {dog.contact?.email}
								</h4>
								<p style={{ width: "60%" }}>{dog.contact?.info}</p>
								<Link
									to="/messenger"
									onClick={() =>
										addConversation({
											senderId: user.id,
											receiverId: dog.contact?.id,
										})
									}
								>
									Message owner
								</Link>
							</div>
							<Button
								circle
								onClick={() => {
									setOpen(false);
									setTimeout(() => {
										setIsClicked(true, "right");
									}, 100);
								}}
							>
								<HeartIcon size="24" />
							</Button>
						</div>
					)}
				</div>
			</DrawerContent>
		</Drawer>
	);
};

export default SwooferDrawer;
