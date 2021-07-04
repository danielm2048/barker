import { useModalStore } from "../store";
import useAuth from "../hooks/useAuth";

import Header from "../components/layout/Header";
import Loader from "../components/Loader";

const Home = () => {
	const { data: user, isLoading } = useAuth();

	const openModal = useModalStore((state) => state.open);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div>
			<Header user={user} openModal={openModal} />
		</div>
	);
};

export default Home;
