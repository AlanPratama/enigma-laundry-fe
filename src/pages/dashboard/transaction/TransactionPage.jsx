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
    try{
      console.log("LSKALKSLA: ", transaction);
      
      await TransactionApi.createTransactions(transaction)
      getTransactions()
    } catch (error) {
      console.log("Error creating customers", error.message);
    }
  }

  // console.log(data);

  return (
    <div className="flex justify-center items-start pt-12 h-screen">
      <Card className="w-11/12">
        <CardHeader className="flex justify-between mt-2">
          <h1 className="font-bold text-start text-xl p-2">
            Transaction Table
          </h1>
          <Button color="primary" onPress={() => {
            setModalTitle("Tambah Transaksi")
            setSelectedTransaction(null)
            setIsCreate(true)
            onOpen();
          }}>
            <ion-icon name="home"></ion-icon> Tambah Transaksi
          </Button>
        </CardHeader>
        <CardBody>
          <Table isStriped aria-label="Transaction Table">
            <TableHeader>
              <TableColumn className="bg-blue-200 text-black">
                ID Transaksi
              </TableColumn>
              <TableColumn className="bg-blue-200 text-black">
                Customer
              </TableColumn>
              <TableColumn className="bg-blue-200 text-black">User</TableColumn>
              <TableColumn className="bg-blue-200 text-black">
                Bill Details
              </TableColumn>
              <TableColumn className="bg-blue-200 text-black">
                Transaction Date
              </TableColumn>
              <TableColumn className="bg-blue-200 text-black">Aksi</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"Tidak ada transaksi."}>
              {data &&
                data.items.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>{transaction.customer.name}</TableCell>
                    <TableCell>{transaction.user.name}</TableCell>
                    <TableCell>{transaction.user.email}</TableCell>
                    <TableCell>{transaction.billDate}</TableCell>
                    <TableCell>
                      <Button
                        className="mx-1"
                        color="primary"
                        onPress={() => {
                          alert("detail");
                        }}
                      >
                        Detail
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
      transaction={selectedTransaction}
      handleCreateTransaction={handleCreateTransactions}
      />
    </div>
  );
}

export default BillPage;
