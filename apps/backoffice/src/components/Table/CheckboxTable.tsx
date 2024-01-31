import React from "react";
import { Table, Form, Image } from "react-bootstrap";
import HeaderProfileNav from "../Dashboard/Header/HeaderProfileNav";

interface RowData {
  column1: string;
  column2: string;
  column3: string;
  column4: string;
  column5: string;
}

interface CheckboxTableProps {
  data: RowData[];
}

const CheckboxTable: React.FC<CheckboxTableProps> = ({ data }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th style={{ paddingTop: "12px", paddingBottom: "12px" }}>
            <Form.Check type="checkbox" />
          </th>
          <th style={{ paddingTop: "12px", paddingBottom: "12px" }}>Name</th>
          <th style={{ paddingTop: "12px", paddingBottom: "12px" }}>
            Employee ID 2
          </th>
          <th style={{ paddingTop: "12px", paddingBottom: "12px" }}>Role</th>
          <th style={{ paddingTop: "12px", paddingBottom: "12px" }}>Status</th>
          <th style={{ paddingTop: "12px", paddingBottom: "12px" }}>Lesson</th>
          <th style={{ paddingTop: "12px", paddingBottom: "12px" }}></th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>
              <Form.Check type="checkbox" />
            </td>
            <td>
              <div className="d-flex">
                <div style={{ paddingTop: "6px" }}>
                  <HeaderProfileNav />
                </div>
                <div>
                  <p style={{ marginBottom: "-1px" }}>{row.column1}</p>
                  <p style={{ color: "#6B788E" }}>{row.column1}</p>
                </div>
              </div>
            </td>
            <td>
              <p
                style={{
                  backgroundColor: "#F5F6F7",
                  width: "max-content",
                  paddingLeft: "4px",
                  paddingRight: "4px",
                }}
                className="rounded"
              >
                {row.column2}
              </p>
            </td>
            <td>
              <div>
                <p style={{ marginBottom: "-1px" }}> {row.column3}</p>
                <p style={{ color: "#6B788E", fontSize: "12px" }}>
                  {" "}
                  {row.column3}{" "}
                </p>
              </div>
            </td>
            <td>
              <div
                style={{
                  color: "#12B76A",
                  backgroundColor: "#ECFDF3",
                  paddingLeft: "4px",
                  paddingRight: "4px",
                  width: "max-content",
                }}
                className="rounded d-flex align-items-center"
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    backgroundColor: "#12B76A",
                    marginRight: "8px",
                  }}
                  className="rounded "
                />
                {row.column4}
              </div>
            </td>
            <td>
              <div className="d-flex">
                <div
                  style={{
                    color: "#000",
                    backgroundColor: "#F5F6F7",
                    paddingLeft: "4px",
                    paddingRight: "4px",
                    width: "max-content",
                    marginRight: "12px",
                  }}
                  className="rounded d-flex align-items-center"
                >
                  {row.column5}
                </div>
                <div
                  style={{
                    color: "#6A1039",
                    backgroundColor: "#F7E8EF",
                    paddingLeft: "4px",
                    paddingRight: "4px",
                    width: "max-content",
                    marginRight: "12px",
                  }}
                  className="rounded d-flex align-items-center"
                >
                  {row.column5}
                </div>
                <div
                  style={{
                    color: "#000",
                    backgroundColor: "#F5F6F7",
                    paddingLeft: "4px",
                    paddingRight: "4px",
                    width: "max-content",
                  }}
                  className="rounded d-flex align-items-center"
                >
                  {row.column5}
                </div>
              </div>
            </td>
            <td>
              <Image
                src="./assets/svg/Dropdown.svg"
                style={{ width: "17px", cursor: "pointer" }}
                alt=""
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CheckboxTable;
