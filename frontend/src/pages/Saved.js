import DogCard from "../components/DogCard";
import Loader from "../components/Loader";

import useSaved from "../hooks/useSaved";

const Saved = () => {
  const { data, isLoading, isError } = useSaved();

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
      <h1>Saved Dogs</h1>
      {data.map((dog, i) => (
        <DogCard key={i} dog={dog} />
      ))}
    </div>
  );
};

export default Saved;
