import { Card, CardBody, CardHeader } from "@nextui-org/card";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { AddCircle, EyeOutline } from "react-ionicons";
import { useSelector } from "react-redux";
import TransactionApi from "../../../apis/TransactionsApi";
import ModalComponent from "./components/ModalComponent";

function BillPage() {
  const data = useSelector((state) => state.transactions);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isCreate, setIsCreate] = useState(false);

  const getTransactions = async () => {
    await TransactionApi.getTransactions();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const handleCreateTransactions = async (transaction) => {
    try {
      console.log("LSKALKSLA: ", transaction);

      await TransactionApi.createTransactions(transaction);
      getTransactions();
    } catch (error) {
      console.log("Error creating customers", error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const dayName = new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
    }).format(date);
    const day = date.getDate();
    const monthName = new Intl.DateTimeFormat("id-ID", {
      month: "short",
    }).format(date);
    const year = date.getFullYear();
    const time = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${dayName}, ${day} ${monthName} ${year} (${time})`;
  };

  return (
    <div className="flex justify-center items-start pt-6 px-3 h-screen">
      <Card className="w-full">
        <CardHeader className="flex justify-between mt-2">
          <h1 className="font-bold text-start text-xl p-2">
            Daftar Transaksi
          </h1>
          <Button
            color="primary"
            onPress={() => {
              setModalTitle("Tambah Transaksi");
              setSelectedTransaction(null);
              setIsCreate(true);
              onOpen();
            }}
          >
            <AddCircle color="white" /> Tambah
            Transaksi
          </Button>
        </CardHeader>
        <CardBody>
          <Table isStriped aria-label="Transaction Table">
            <TableHeader>
              <TableColumn>ID Transaksi</TableColumn>
              <TableColumn>Customer</TableColumn>
              <TableColumn>User</TableColumn>
              <TableColumn>No Hp Customer</TableColumn>
              <TableColumn>Tanggal Transaksi</TableColumn>
              <TableColumn>Aksi</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"Tidak ada transaksi."}>
              {data &&
                data.items.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>{transaction.customer.name}</TableCell>
                    <TableCell>{transaction.user.name}</TableCell>
                    <TableCell>{transaction.customer.phoneNumber}</TableCell>
                    <TableCell>
                      {/* {new Date(transaction.billDate).toLocaleDateString()}{" "}
                      {new Date(transaction.billDate).toLocaleTimeString("en-GB")} */}
                      {formatDate(transaction.billDate)}
                    </TableCell>
                    <TableCell>
                      <Button
                        className="mx-1"
                        variant="flat"
                        color="primary"
                        onPress={() => {
                          setSelectedTransaction(transaction);
                          setModalTitle("Detail Transaksi");
                          setIsCreate(false);
                          onOpen();
                        }}
                      >
                        <EyeOutline color="blue" /> Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
      {/* Modal */}
      <ModalComponent
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={modalTitle}
        isCreate={isCreate}
        transaction={selectedTransaction}
        handleCreateTransaction={handleCreateTransactions}
      />
    </div>
  );
}

export default BillPage;
