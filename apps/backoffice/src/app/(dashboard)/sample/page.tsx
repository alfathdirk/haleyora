"use client";

import { useEffect, useState } from "react";

import BreadCrumb from "@/components/breadcrumb";
import { EmployeesTable } from "@/components/Tables/employees-table/table";
import { DirectusContext } from "@/provider/Directus";

import { readItems } from "@directus/sdk";
import { useContext } from "react";
import { faker } from '@faker-js/faker';
import directus from "@/lib/directus";

const breadcrumbItems = [{ title: "Employees", link: "/dashboard/employees" }];

export default function Page() {
  const { client } = useContext(DirectusContext);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result: any = async () => {
          for (let i = 0; i < 10; i++) {
            await client.items('course').createOne({
                title: faker.lorem.sentence(),
                content: faker.lorem.paragraph(),
                publish_date: faker.date.recent(),
            });
        }
        }

        // Map over the result data and convert specific keys to lowercase
        const processedData = result.map((item: any) => ({
          ...item,
          name: item.Name,
          country: item.Country,
          company: item.Company,
          Gender: item.Gender.toUpperCase(),
          status: item.status.toUpperCase(),
        }));

        setEmployees(processedData);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    }

    fetchData();
  }, []);

  console.log({ employees });

  return (
    <>
      <div className="flex-1 p-4 pt-6 space-y-4 md:p-8">
        Seeding
      </div>
    </>
  );
}
