import { Link } from "react-router-dom";

import about from "../images/about.png";

const About = () => {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "start",
				backgroundImage: `url(${about})`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "100% 100%",
				backgroundPosition: "right",
				height: "88vh",
				// width: "100%",
			}}
		>
			<div style={{ marginLeft: 100, color: "white" }}>
				<h1>Hi World! We are Barker!</h1>
				<p style={{ width: 500, fontSize: 22 }}>
					A young and passionate team, hoping to give the world a better way to
					introduce a new member into the family.
					<br />
					Adopting a pet can be a difficult and long procedure.
					<br />
					You and your future pet deserve better.
					<br />
					We hope you enjoy our small project! If you have any questions feel
					free to contact us{" "}
					<Link
						style={{
							color: "white",
							textDecoration: "none",
							fontWeight: "bold",
						}}
						to="/contact"
					>
						here
					</Link>
				</p>
			</div>
		</div>
	);
};

export default About;
