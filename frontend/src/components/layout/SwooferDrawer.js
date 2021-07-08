import { Link } from "react-router-dom";
import { Drawer, DrawerContent } from "../../styles/StyledDrawer";
import Button from "../../styles/StyledButton";
import { Close } from "../../styles/StyledModal";
import { HeartIcon } from "../../styles/StyledIcons";
import { Award, AtSign, Phone, User, Users, X } from "@styled-icons/feather";

import Slideshow from "../Slideshow";

const SwooferDrawer = ({ dog, drawerOpen, setDrawerOpen, setIsClicked }) => {
	return (
		<Drawer open={drawerOpen}>
			<Close
				onClick={() => setDrawerOpen(false)}
				style={{ right: 35, top: 25 }}
			>
				<X size="32" title="Close" />
			</Close>

			<DrawerContent>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						width: "50%",
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

					<div
						style={{
							display: "flex",
							justifyContent: "space-evenly",
							alignItems: "center",
						}}
					>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								width: "60%",
							}}
						>
							<h1 style={{ marginBottom: 5 }}>
								<Link
									to={`/profile/${dog.contact.id}`}
									style={{
										color: "black",
										textDecoration: "none",
										fontWeight: "bold",
									}}
									title="Click here to learn more about the owner"
								>
									{dog.contact.name}
								</Link>
								{dog.contact.isOrg ? <Users size="36" /> : <User size="36" />}
							</h1>
							{dog.contact.phone && (
								<h3>
									<Phone size="28" />
									{dog.contact.phone}
								</h3>
							)}
							<h3>
								<AtSign size="28" /> {dog.contact.email}
							</h3>
							<p style={{ width: "60%" }}>{dog.contact.info}</p>
						</div>
						<Button
							circle
							onClick={() => {
								setDrawerOpen(false);
								setTimeout(() => {
									setIsClicked(true, "right");
								}, 100);
							}}
						>
							<HeartIcon size="24" />
						</Button>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
};

export default SwooferDrawer;
