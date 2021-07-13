import DogCard from "../components/DogCard";
import Loader from "../components/Loader";

import useSaved from "../hooks/useSaved";
// import useSaveDog from "../hooks/useSaved";
import useUnsaveDog from "../hooks/useUnsaveDog";
import useAddConversation from "../hooks/chat/useAddConversation";

import { useDrawerStore } from "../store";

const Saved = () => {
	const { data, isLoading, isError } = useSaved();
	// const { mutate: saveDog } = useSaveDog();
	const { mutate: unsaveDog } = useUnsaveDog();
	const { mutate: addConversation } = useAddConversation();

	const setDogAndOpen = useDrawerStore((state) => state.setDogAndOpen);

	if (isLoading || !data) {
		return <Loader />;
	}

	if (isError) {
		console.error("Error");
	}

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<h1>{!data.length ? "No saved dogs!" : "Saved Dogs"}</h1>
			{data.map((dog, i) => (
				<DogCard
					key={i}
					dog={dog}
					messageOwner={addConversation}
					unsaveDog={unsaveDog}
					setDogAndOpen={setDogAndOpen}
					isDogMine={false}
				/>
			))}
		</div>
	);
};

export default Saved;
