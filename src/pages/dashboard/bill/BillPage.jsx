import { Card, CardBody, CardHeader } from "@nextui-org/card";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function BillPage() {
  const [data, setData] = useState(null);
  const token = "";
  // const getDataFromAPI = async () => {
  //   try {
  //     const response = await axios.get("/api/v1/bills", {
  //       headers: {
  //         'Authorization' : `Bearer ${token}`
  //       }
  //     })
  //     setData(response.data)
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log("Error fetching data:", error);
  //   }
  // }

  // useEffect(() => {
  //   getDataFromAPI();
  // }, []);

  return (
    <div className="flex justify-center items-start pt-12 h-screen">
      <Card className="w-11/12">
        <CardHeader className="px-5 pt-8">
          <h1 className="font-bold text-start text-2xl">Transaction Table</h1>
        </CardHeader>
        <CardBody>
          <Table 
          isStriped 
          aria-label="Transaction Table"
          >
            <TableHeader>
              <TableColumn className="bg-blue-100 text-black">Customer</TableColumn>
              <TableColumn className="bg-green-100 text-black">User</TableColumn>
              <TableColumn className="bg-red-100 text-black">Bill Details</TableColumn>
              <TableColumn className="bg-yellow-100 text-black">Bill Dates</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>Dova Dogs Holder</TableCell>
                <TableCell>Zul The Sigma</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>Dova Dogs Holder</TableCell>
                <TableCell>Zul The Sigma</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell>Dova Dogs Holder</TableCell>
                <TableCell>Zul The Sigma</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}

export default BillPage;
