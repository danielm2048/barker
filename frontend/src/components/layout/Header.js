import { HomeLink, HomeHeader, HomeTitle } from "../../styles/StyledLayout";

const Header = () => {
	return (
		<HomeHeader>
			<HomeTitle>{"Adopt A \nFriend \nToday"}</HomeTitle>
			<HomeLink to="/swoofer">Get Swoofing</HomeLink>
		</HomeHeader>
	);
};

export default Header;
