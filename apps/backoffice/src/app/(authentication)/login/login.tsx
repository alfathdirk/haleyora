"use client";

import {
  Alert,
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";
import axios from "axios";
import Link from "next/link";
import InputGroupText from "react-bootstrap/InputGroupText";
import { AuthContext } from "@/provider/Auth";
import { faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { DirectusContext } from "@/provider/Directus";
import { readUsers } from "@directus/sdk";
import { useRouter } from "next/navigation";

export default function Login() {
  const { login } = useContext(AuthContext);
  const { client } = useContext(DirectusContext);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const loginForm = async (e: SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setSubmitting(true);
    try {
      await login("admin@example.com", "1");
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
      <Form onSubmit={loginForm} style={{ paddingRight: "100px" }}>
        <InputGroup className="mb-3">
          <InputGroupText>
            <FontAwesomeIcon img={faUser} fixedWidth />
          </InputGroupText>
          <FormControl
            name="username"
            required
            disabled={submitting}
            placeholder="Username"
            aria-label="Username"
            defaultValue=""
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroupText>
            <FontAwesomeIcon img={faLock} fixedWidth />
          </InputGroupText>
          <FormControl
            type={showPassword ? "text" : "password"}
            name="password"
            required
            placeholder="Password"
            aria-label="Password"
            defaultValue=""
          />
          <InputGroupText
            style={{ cursor: "pointer" }}
            onClick={togglePasswordVisibility}
          >
            <FontAwesomeIcon img={showPassword ? faEyeSlash : faEye} />
          </InputGroupText>
        </InputGroup>

        <Col className="align-items-center">
          <div className="text-end mb-3 ">
            <Link className="px-0 text-dark" href="#">
              <p>Forgot password?</p>
            </Link>
          </div>
          <div>
            <Button
              className="px-4 py-2 w-100"
              variant="dark"
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
            </Button>
          </div>
        </Col>
      </Form>
    </>
  );
}

