import FilterCard from "@/components/Cards/FilterCard";
import SearchCard from "@/components/Cards/SearchCard";
import Pagination from "@/components/Pagination/Pagination";
import CheckboxTable from "@/components/Table/CheckboxTable";
import CheckboxTableAdmin from "@/components/Table/CheckboxTableAdmin";
import { Image } from "react-bootstrap";

export default function UserAdminPage() {
  const exampleData = [
    {
      column1: "Value 1A",
      column2: "Value 1B",
      column3: "Value 1C",
      column4: "Value 1D",
      column5: "Value 1E",
    },
    {
      column1: "Value 2A",
      column2: "Value 2B",
      column3: "Value 2C",
      column4: "Value 2D",
      column5: "Value 2E",
    },
    {
      column1: "Value 2A",
      column2: "Value 2B",
      column3: "Value 2C",
      column4: "Value 2D",
      column5: "Value 2E",
    },
  ];
  return (
    <div>
      <h1>User Admin page</h1>
      <div style={{ marginTop: "26px" }}>
        <div
          className="d-flex justify-content-between align-items-center "
          style={{ marginBottom: "24px" }}
        >
          <FilterCard label={"Filter"} src={"./assets/svg/filter-icon.svg"} />
          <div className="d-flex">
            <div
              style={{
                paddingRight: "24px",
                marginRight: "24px",
                borderRight: "1px solid #787486",
              }}
            >
              <SearchCard />
            </div>
            <Image
              src="./assets/svg/menu-blue.svg"
              style={{ width: "36px", marginRight: "24px" }}
              alt=""
            />
            <Image
              src="./assets/svg/menu.svg"
              style={{ width: "24px" }}
              alt=""
            />
          </div>
        </div>
      </div>
      <div style={{ marginBottom: "24px" }}>
        <CheckboxTableAdmin data={exampleData} />
      </div>
      {/* <div>
        <Pagination meta={exampleData} />
      </div> */}
    </div>
  );
}
