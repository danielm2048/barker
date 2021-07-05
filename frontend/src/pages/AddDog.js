import { useEffect, useRef, useState } from "react";

import { ModalButton } from "../styles/StyledModal";
import { DogAddForm, DogAddBody } from "../styles/StyledForm";
import { SpinnerIcon } from "../styles/StyledIcons";

import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { Paw } from "@styled-icons/ionicons-solid";

import CitySelect from "../components/form/CitySelect";
import InputFile from "../components/form/InputFile";
import Loader from "../components/Loader";

import useAuth from "../hooks/useAuth";
import useAddDog from "../hooks/useAddDog";

import { useToastStore } from "../store";

const AddDog = () => {
  const { data, isLoading, isError } = useAuth();

  const setToast = useToastStore((state) => state.setToast);

  if (isError) {
    console.error("Something went wrong.. Please try again");
  }
  if (isLoading) {
    <Loader />;
  }

  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [info, setInfo] = useState("");

  const uploadedImage = useRef(null);
  const dog = useAddDog();

  useEffect(() => {
    if (dog.isSuccess) {
      setName("");
      setBreed("");
      setAge("");
      setLocation("");
      setInfo("");
      // Please fix me!!!
      uploadedImage.current = null;

      setToast("success", "You added a dog!");
    }
  }, [dog.isSuccess]);

  return (
    <DogAddBody>
      <DogAddForm>
        <h1>Let's Add a Dog! </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const formData = new FormData();
            formData.append("pic", uploadedImage.current.files[0]);
            formData.append("name", name);
            formData.append("breed", breed);
            formData.append("age", age);
            formData.append("info", info);
            formData.append("locationId", location._id);
            formData.append("userId", data.id);

            dog.mutate(formData);
          }}
        >
          <TextField
            required
            label="Enter Dog Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            fullWidth={true}
            className="text-field"
          />
          <TextField
            required
            label="Enter Dog Breed"
            value={breed}
            onChange={(e) => {
              setBreed(e.target.value);
            }}
            fullWidth={true}
            className="text-field"
          />
          <FormControl fullWidth={true}>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
            >
              <MenuItem value={0.01}>1 Month</MenuItem>
              <MenuItem value={0.02}>2 Month</MenuItem>
              <MenuItem value={0.03}>3 Month</MenuItem>
              <MenuItem value={0.04}>4 Month</MenuItem>
              <MenuItem value={0.05}>5 Month</MenuItem>
              <MenuItem value={0.06}>6 Month</MenuItem>
              <MenuItem value={0.07}>7 Month</MenuItem>
              <MenuItem value={0.08}>8 Month</MenuItem>
              <MenuItem value={0.09}>9 Month</MenuItem>
              <MenuItem value={0.1}>10 Month</MenuItem>
              <MenuItem value={0.11}>11 Month</MenuItem>
              <MenuItem value={1}>1 Years Old</MenuItem>
              <MenuItem value={2}>2 Years Old</MenuItem>
              <MenuItem value={3}>3 Years Old</MenuItem>
              <MenuItem value={4}>4 Years Old</MenuItem>
              <MenuItem value={5}>5 Years Old</MenuItem>
              <MenuItem value={6}>6 Years Old</MenuItem>
              <MenuItem value={7}>7 Years Old</MenuItem>
              <MenuItem value={8}>8 Years Old</MenuItem>
              <MenuItem value={9}>9 Years Old</MenuItem>
              <MenuItem value={10}>10 Years Old</MenuItem>
              <MenuItem value={11}>11 Years Old</MenuItem>
              <MenuItem value={12}>12 Years Old</MenuItem>
              <MenuItem value={13}>13 Years Old</MenuItem>
              <MenuItem value={14}>14 Years Old</MenuItem>
              <MenuItem value={15}>15 Years Old</MenuItem>
              <MenuItem value={16}>16 Years Old</MenuItem>
              <MenuItem value={17}>17 Years Old</MenuItem>
              <MenuItem value={18}>18 Years Old</MenuItem>
              <MenuItem value={19}>19 Years Old</MenuItem>
              <MenuItem value={20}>20 Years Old</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            label="Tell Us a Bit About The Dog"
            value={info}
            onChange={(e) => {
              setInfo(e.target.value);
            }}
            name="numberformat"
            fullWidth={true}
            className="text-field"
            multiline={true}
            style={{ paddingBottom: "10px", paddingTop: "10px" }}
          />
          <CitySelect
            className="text-field"
            location={location}
            setLocation={setLocation}
          />
          <InputFile uploadedImage={uploadedImage} required={true} />
          <ModalButton type="submit" disabled={dog.isLoading}>
            {dog.isLoading ? (
              <SpinnerIcon size="24" />
            ) : (
              <span>
                Add Dog <Paw size="24" />
              </span>
            )}
          </ModalButton>
        </form>
      </DogAddForm>
    </DogAddBody>
  );
};

export default AddDog;
