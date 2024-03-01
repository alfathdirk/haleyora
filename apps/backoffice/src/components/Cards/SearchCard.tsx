"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import Image from "next/image";

interface SearchCardProps {
  onSearch: (searchTerm: string) => void;
}

const SearchCard: React.FC<SearchCardProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [searchTerm, onSearch]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Form>
        <InputGroup>
          <InputGroup.Text id="search-icon">
            <Image
              src="./assets/svg/search.svg"
              width={16}
              height={16}
              alt=""
            />
          </InputGroup.Text>
          <FormControl
            placeholder="Search..."
            aria-label="Search"
            aria-describedby="search-icon"
            className="border-2 border-[#ced4da]"
            onChange={handleInputChange}
          />
        </InputGroup>
      </Form>
    </>
  );
};

export default SearchCard;
