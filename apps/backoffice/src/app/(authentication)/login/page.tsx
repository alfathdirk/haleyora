/* eslint-disable jsx-a11y/alt-text */
import { Col, Row, Image, Container } from "react-bootstrap";
import LoginForm from "@/app/(authentication)/login/login";

export default function Page() {
  return (
    <Container>
      <Row>
        <Col
          xs={12}
          md={7}
          className="d-flex align-items-center justify-content-center"
        >
          <Image
            src="./assets/img/general/login-image.png"
            style={{ width: "530px", height: "550px" }}
            fluid
          />
        </Col>
        <Col
          xs={12}
          md={5}
          className="align-items-center d-flex justify-content-center"
        >
          <div className=" w-100">
            <Image
              src="./assets/img/general/haleyora-logo.png"
              style={{ width: "200px" }}
              fluid
            />
            <h3
              style={{
                marginTop: "12px",
                marginBottom: "12px",
                fontWeight: "bold",
              }}
            >
              Welcome back
            </h3>
            <p style={{ marginBottom: "24px", color: "#787486" }}>
              Please enter your email & password
            </p>
            <LoginForm />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
