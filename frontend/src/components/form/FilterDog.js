import { useEffect, useState } from "react";

import { ModalButton } from "../../styles/StyledModal";

import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Slider from "@material-ui/core/Slider";
import { Paw } from "@styled-icons/ionicons-solid";

import AutoCompleteSelect from "./Select";
import MultiSelect from "./MultiSelect";
import DogAge from "./DogAge";
import Loader from "../Loader";

import useCities from "../../hooks/useCities";
import useBreeds from "../../hooks/useBreeds";

const FilterDog = ({ filter, setFilter, setOpenModal }) => {
  const {
    data: citiesData,
    isLoading: citiesLoading,
    isError: citiesError,
  } = useCities();
  const {
    data: breedsData,
    isLoading: breedsLoading,
    isError: breedsError,
  } = useBreeds();

  const [breed, setBreed] = useState([]);
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [distance, setDistance] = useState(50);

  const handleSliderChange = (event, newValue) => {
    setDistance(newValue);
  };

  useEffect(() => {
    if (filter) {
      setBreed([]);
      setMinAge("");
      setMaxAge("");
      setLocation("");
      setGender("");
      setDistance(50);
      setOpenModal(false);
    }
  }, [filter, setOpenModal]);

  if (citiesError || breedsError) {
    console.error("Something went wrong.. Please try again");
  }

  if (citiesLoading || breedsLoading) {
    return <Loader />;
  }

  return (
    <div
      style={{
        width: "60%",
        justifyContent: "center",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>Search Filters</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          let query = `?distance=${distance}`;

          if (gender !== "") {
            query += `&gender=${gender}`;
          }
          if (minAge) {
            query += `&minAge=${minAge}`;
          }
          if (maxAge) {
            query += `&maxAge=${maxAge}`;
          }
          if (location) {
            query += `&location=${location}`;
          }
          if (breed.length) {
            query += `&breed=${JSON.stringify(breed)}`;
          }

          setFilter(query);
        }}
      >
        <MultiSelect
          values={breed}
          setValues={setBreed}
          data={breedsData}
          label="Breed"
        />
        <DogAge
          value={minAge}
          setValue={setMinAge}
          label="Min Age"
          required={false}
        />
        <DogAge
          value={maxAge}
          setValue={setMaxAge}
          label="Max Age"
          required={false}
        />
        <FormControl component="fieldset">
          <FormLabel
            component="legend"
            style={{ paddingTop: "10px" }}
            className="text-field"
          >
            Gender
          </FormLabel>
          <RadioGroup
            row
            aria-label="isOrg"
            name="isOrg"
            value={gender}
            onChange={(e) => setGender(e.target.value === "true")}
          >
            <FormControlLabel
              value={false}
              control={<Radio color="primary" />}
              label="Male"
            />
            <FormControlLabel
              value={true}
              control={<Radio color="primary" />}
              label="Female"
            />
          </RadioGroup>
        </FormControl>
        <AutoCompleteSelect
          className="text-field"
          value={location}
          setValue={setLocation}
          data={citiesData}
          label="City"
        />
        <p>Distance</p>
        <Slider
          value={distance}
          min={0}
          step={10}
          max={400}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
        />
        <ModalButton type="submit">
          <span>
            Filter Dogs <Paw size="24" />
          </span>
        </ModalButton>
      </form>
    </div>
  );
};

export default FilterDog;
