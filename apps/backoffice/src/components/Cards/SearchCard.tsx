"use client";

import { Form, FormControl, Image, InputGroup } from "react-bootstrap";

export default function SearchCard() {
  return (
    <>
      <Form>
        <InputGroup>
          <InputGroup.Text id="search-icon">
            <Image
              src="./assets/svg/search.svg"
              style={{ width: "17px" }}
              alt=""
            />
          </InputGroup.Text>
          <FormControl
            placeholder="Search..."
            aria-label="Search"
            aria-describedby="search-icon"
            style={{ border: "2px solid #ced4da", borderRadius: "0.375rem" }}
          />
        </InputGroup>
      </Form>
    </>
  );
}
