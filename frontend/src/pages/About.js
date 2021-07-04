import { Link } from "react-router-dom";

const About = () => {
	return (
		<div>
			<h1>Hi World! We are Barker!</h1>
			<p>
				A young and passionate team, hoping to give the world a better way to
				introduce a new member into the family. Adopting a pet can be a
				difficult and long procedure. You and your future pet deserve better. We
				hope you enjoy our small project! If you have any questions feel free to
				contact us <Link to="/contact">here!</Link>
			</p>
		</div>
	);
};

export default About;
