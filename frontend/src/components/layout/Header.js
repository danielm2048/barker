import { HomeLink, HomeHeader, HomeTitle } from "../../styles/StyledLayout";

const Header = ({ user, openModal }) => {
	const handleClick = (e) => {
		if (!user) {
			e.preventDefault();

			openModal();
		}
	};
	return (
		<HomeHeader>
			<HomeTitle>{"Adopt A \nFriend \nToday"}</HomeTitle>
			<HomeLink onClick={handleClick} to="/swoofer">
				Get Swoofing
			</HomeLink>
		</HomeHeader>
	);
};

export default Header;
