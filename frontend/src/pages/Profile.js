import { useParams } from "react-router-dom";
import useProfile from "../hooks/useProfile";
import Loader from "../components/Loader";
import NotFound from "./NotFound";
import {
	ProfileImg,
	ProfileHeader,
	ProfileHeaderData,
} from "../styles/StyledProfile";

function Profile() {
	const { id } = useParams();

	const { data, isLoading, isError } = useProfile(id);

	if (isLoading) {
		return <Loader />;
	}
	if (isError) {
		return <NotFound />;
	}
	if (data) {
		console.log(data);
	}
	return (
		<ProfileHeader>
			<ProfileImg src={data.pic} alt="user profile pic" />
			<ProfileHeaderData>
				<h1>{data.name}</h1>
				<p>
					{data.email} | {data.phone && <span>{data.phone} | </span>}
					{data.city}
				</p>
			</ProfileHeaderData>
		</ProfileHeader>
	);
}

export default Profile;
