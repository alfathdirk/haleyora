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

const CheckboxTableAdmin: React.FC<CheckboxTableProps> = ({ data }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th style={{ paddingTop: "12px", paddingBottom: "12px" }}>
            <Form.Check type="checkbox" />
          </th>
          <th style={{ paddingTop: "12px", paddingBottom: "12px" }}>Users</th>
          <th style={{ paddingTop: "12px", paddingBottom: "12px" }}>Status</th>
          <th style={{ paddingTop: "12px", paddingBottom: "12px" }}>Email</th>
          <th style={{ paddingTop: "12px", paddingBottom: "12px" }}>
            Last Login
          </th>
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
                {row.column2}
              </div>
            </td>
            <td>
              <div>
                <p>{row.column3}</p>
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
                {row.column3}
              </p>
            </td>
            <td>
              <div className="d-flex justify-content-between">
                <Image
                  src="./assets/svg/info.svg"
                  style={{ width: "24px", cursor: "pointer" }}
                  alt=""
                />
                <Image
                  src="./assets/svg/delete.svg"
                  style={{ width: "24px", cursor: "pointer" }}
                  alt=""
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CheckboxTableAdmin;
