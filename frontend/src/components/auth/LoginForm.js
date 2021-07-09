import React, { useState } from "react";
import useLogin from "../../hooks/useLogin";
import {
  ModalActions,
  ModalButton,
  ModalError,
} from "../../styles/StyledModal";
import { SpinnerIcon } from "../../styles/StyledIcons";
import { useTokenStore } from "../../store";
import TextField from "@material-ui/core/TextField";

const LoginForm = () => {
  const setAccessToken = useTokenStore((state) => state.setAccessToken);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useLogin(setAccessToken);

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

          login.mutate({ email, password });
          if (login.isSuccess) {
            setEmail("");
            setPassword("");
          }
        }}
        autoComplete="off"
      >
        <ModalActions>
          {login.isError ? (
            <ModalError>
              <strong>{login.error.response.data}</strong>
            </ModalError>
          ) : null}

          <TextField
            required
            id="email"
            label="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth={true}
          />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
          />
          <div style={{ margin: "10px" }}>
            <ModalButton disabled={login.isLoading} type="submit">
              {login.isLoading ? <SpinnerIcon size="24" /> : "Login"}
            </ModalButton>
          </div>
        </ModalActions>
      </form>
    </div>
  );
};

export default LoginForm;
