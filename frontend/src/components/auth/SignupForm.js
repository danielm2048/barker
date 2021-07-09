import React, { useEffect, useRef, useState } from "react";
import useSignup from "../../hooks/useSignup";
import useCities from "../../hooks/useCities";
import {
  ModalActions,
  ModalButton,
  ModalError,
} from "../../styles/StyledModal";
import { SpinnerIcon } from "../../styles/StyledIcons";
import { useTokenStore } from "../../store";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "../form/Select";
import InputFile from "../form/InputFile";
import Loader from "../Loader";

const SignupForm = () => {
  const {
    data: citiesData,
    isLoading: citiesLoading,
    isError: citiesError,
  } = useCities();

  const setAccessToken = useTokenStore((state) => state.setAccessToken);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [isOrganization, setIsOrganization] = useState(false);
  const [phone, setPhone] = useState("");

  const uploadedImage = useRef(null);

  const signup = useSignup(setAccessToken);

  useEffect(() => {
    if (signup.isSuccess) {
      setName("");
      setPassword("");
      setEmail("");
      setLocation("");
      setPhone("");
    }
  }, [signup.isSuccess]);

  if (citiesError) {
    console.error("Can't get cities...");
    // Add display for user!!!
  }

  if (citiesLoading) {
    return <Loader />;
  }

  return (
    <div
      style={{
        width: "60%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        marginBottom: "50px",
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData();
          formData.append("pic", uploadedImage.current.files[0]);
          formData.append("name", name);
          formData.append("password", password);
          formData.append("email", email);
          formData.append("locationId", location._id);
          formData.append("phone", phone);
          formData.append("isOrganization", isOrganization);

          signup.mutate(formData);
        }}
      >
        <ModalActions>
          {signup.error ? (
            <ModalError>
              <strong>{signup.error.response.data}</strong>
            </ModalError>
          ) : null}
          <TextField
            required
            label="Enter Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            fullWidth={true}
            className="text-field"
          />
          <TextField
            required
            label="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth={true}
            className="text-field"
          />
          <TextField
            required
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            className="text-field"
          />
          <TextField
            label="Phone Number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            name="numberformat"
            fullWidth={true}
            className="text-field"
          />
          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              style={{ paddingTop: "10px" }}
              className="text-field"
            >
              Are you an organization?
            </FormLabel>
            <RadioGroup
              row
              aria-label="isOrg"
              name="isOrg"
              value={isOrganization}
              onChange={(e) => setIsOrganization(e.target.value === "true")}
            >
              <FormControlLabel
                value={false}
                control={<Radio color="primary" />}
                label="No"
              />
              <FormControlLabel
                value={true}
                control={<Radio color="primary" />}
                label="Yes"
              />
            </RadioGroup>
          </FormControl>
          <Select
            className="text-field"
            value={location}
            setValue={setLocation}
            data={citiesData}
            label="City"
          />
          <InputFile uploadedImage={uploadedImage} required={false} />
          <ModalButton type="submit" disabled={signup.isLoading}>
            {signup.isLoading ? <SpinnerIcon size="24" /> : "Signup"}
          </ModalButton>
        </ModalActions>
      </form>
    </div>
  );
};

export default SignupForm;
