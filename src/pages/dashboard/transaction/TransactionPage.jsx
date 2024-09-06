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
import { useSelector } from "react-redux";
import TransactionApi from "../../../apis/TransactionsApi";
import ModalComponent from "./components/ModalComponent";
import { AddCircleOutline, EyeOutline } from "react-ionicons";

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

  return (
    <div className="flex justify-center items-start pt-12 h-screen">
      <Card className="w-11/12">
        <CardHeader className="flex justify-between mt-2">
          <h1 className="font-bold text-start text-xl p-2">
            Transaction Table
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
            <AddCircleOutline name="add-circle-outline" color="white" /> Tambah
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
                      {new Date(transaction.billDate).toLocaleDateString()}{" "}
                      {new Date(transaction.billDate).toLocaleTimeString("en-GB")}
                    </TableCell>
                    <TableCell>
                      <Button
                        className="mx-1"
                        color="primary"
                        onPress={() => {
                          setSelectedTransaction(transaction);
                          setModalTitle("Detail Transaksi");
                          setIsCreate(false);
                          onOpen();
                        }}
                      >
                        <EyeOutline color="white" /> Detail
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
