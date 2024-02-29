"use client";

import {
  Alert,
  Col,
  Form,
  FormControl,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useContext, useState } from "react";
import Link from "next/link";
import InputGroupText from "react-bootstrap/InputGroupText";
import { AuthContext } from "@/provider/Auth";
import { faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
};

export default function Login() {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {},
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => loginForm(data);

  const loginForm = async (value: Inputs) => {
    setSubmitting(true);
    try {
      await login(value.username, value.password);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setSubmitting(false);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Alert
        variant="danger"
        show={error !== ""}
        onClose={() => setError("")}
        dismissible
      >
        {error}
      </Alert>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup className="mb-3">
          <InputGroupText>
            <FontAwesomeIcon icon={faUser} fixedWidth />
          </InputGroupText>
          <FormControl
            {...register("username", { required: true })}
            disabled={submitting}
            placeholder="Username"
            aria-label="Username"
            defaultValue=""
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroupText>
            <FontAwesomeIcon icon={faLock} fixedWidth />
          </InputGroupText>
          <FormControl
            type={showPassword ? "text" : "password"}
            {...register("password", { required: true })}
            placeholder="Password"
            aria-label="Password"
            defaultValue=""
          />
          <InputGroupText
            style={{ cursor: "pointer" }}
            onClick={togglePasswordVisibility}
          >
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </InputGroupText>
        </InputGroup>

        <Col className="align-items-center">
          <div className="text-end my-4 ">
            <Link className="px-0 text-dark" href="#">
              <p>Forgot password?</p>
            </Link>
          </div>
          <div>
            <button
              className="text-center py-2 w-full bg-black text-white rounded-md"
              type="submit"
              disabled={submitting}
            >
              {submitting ? (
                <Spinner animation="border" role="status" size="sm">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                "log in"
              )}
            </button>
          </div>
        </Col>
      </Form>
    </>
  );
}
