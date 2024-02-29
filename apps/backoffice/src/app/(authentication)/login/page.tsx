/* eslint-disable jsx-a11y/alt-text */
import { Col, Row, Container } from "react-bootstrap";
import LoginForm from "@/app/(authentication)/login/login";
import Image from "next/image";

export default function Page() {
  return (
    <Container>
      <div className="flex">
        <div className="w-[60%] flex justify-center items-center">
          <Image
            src="/assets/svg/logo-login.svg"
            alt="icon-login"
            width={550}
            height={550}
          />
        </div>
        <div className="w-[40%] flex justify-center items-center ">
          <div className="w-full flex flex-col gap-2">
            <Image
              src="/assets/svg/logo-haleyora.svg"
              alt="icon-haleyora"
              width={200}
              height={10}
            />
            <p className="text-3xl font-bold">Welcome back</p>
            <p className="text-[#787486] mb-8">
              Please enter your email & password
            </p>
            <LoginForm />
          </div>
        </div>
      </div>
    </Container>
  );
}
