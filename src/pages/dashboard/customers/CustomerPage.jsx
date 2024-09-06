import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import ModalComponent from "./components/ModalComponent";
import CustomerApi from "../../../apis/CustomersApi";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

function CustomerPage() {
  const { items } = useSelector((state) => state.customers);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalTitle, setModaltitle] = useState("");
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "id",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [isCreate, setIsCreate] = useState(false);

  const fetchCustomers = async () => {
    await CustomerApi.getCustomers();
  };

  const handleCreateCustomers = async (customer) => {
    try {
      await CustomerApi.createCustomers(customer);
      toast.success("Pelanggan Berhasil Dibuat!", {
        position: "top-center",
        autoClose: 4000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      fetchCustomers();
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  const handleEditCustomers = async (customer) => {
    try {
      await CustomerApi.editCustomer(customer);
      toast.success("Pelanggan Berhasil Diubah!", {
        position: "top-center",
        autoClose: 4000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      fetchCustomers();
    } catch (error) {
      console.error("Error editing customer:", error);
    }
  };

  const handleDeleteCustomers = async (customer) => {
    try {
      await CustomerApi.deleteCustomers(customer);
      toast.success("Pelanggan Berhasil Dihapus!", {
        position: "top-center",
        autoClose: 4000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const sort = (items, { column, direction }) => {
    return [...items].sort((a, b) => {
      const first = a[column];
      const second = b[column];
      let cmp = first < second ? -1 : 1;

      if (direction === "descending") {
        cmp *= -1;
      }
      return cmp;
    });
  };

  const handleSortChange = ({ column, direction }) => {
    setSortDescriptor({ column, direction });
  };

  const sortedCustomers = sort(items, sortDescriptor);
  const pages = Math.ceil(sortedCustomers.length / rowsPerPage);

  const sortedItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedCustomers.slice(start, end);
  }, [page, sortedCustomers]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    const dayName = new Intl.DateTimeFormat("id-ID", { weekday: "long" }).format(date);
    const day = date.getDate();
    const monthName = new Intl.DateTimeFormat("id-ID", { month: "short" }).format(date);
    const year = date.getFullYear();
    const time = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  
    return `${dayName}, ${day} ${monthName} ${year} (${time})`;
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      <div className="flex flex-1 justify-center m-8">
        <Card shadow="">
          <CardHeader className="flex justify-between mt-2">
            <h1 className="text-xl font-bold p-2">Daftar Pelanggan</h1>
            <Button
              color="primary"
              onPress={() => {
                setModaltitle("Tambah Pelanggan");
                setIsDeleteModal(false);
                setSelectedCustomer(null);
                setIsCreate(true);
                onOpen();
              }}
            >
              <ion-icon name="add-circle" size="small"></ion-icon>
              <span className="font-semibold">Tambah Pelanggan</span>
            </Button>
          </CardHeader>
          <CardBody>
            <Table
              color="primary"
              selectionMode="single"
              sortDescriptor={sortDescriptor}
              onSortChange={handleSortChange}
              aria-label="customers-table"
              bottomContent={
                <div className="flex w-full justify-center">
                  <Pagination
                    loop
                    isCompact
                    showControls
                    // showShadow
                    size="sm"
                    color="primary"
                    variant="light"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                  />
                </div>
              }
            >
              <TableHeader>
                {/* <TableColumn allowsSorting key="id">
                  Id Pelanggan
                </TableColumn> */}
                <TableColumn allowsSorting key="name">
                  Nama
                </TableColumn>
                <TableColumn allowsSorting key="phoneNumber">
                  Nomor Telpon
                </TableColumn>
                <TableColumn allowsSorting key="address">
                  Alamat
                </TableColumn>
                <TableColumn allowsSorting key="createdAt">
                  Dibuat pada
                </TableColumn>
                <TableColumn allowsSorting key="updatedAt">
                  Diubah pada
                </TableColumn>
                <TableColumn>Aksi</TableColumn>
              </TableHeader>
              <TableBody emptyContent={"Tidak ada data."}>
                {sortedItems.map((customer) => {
                  return (
                    <TableRow key={customer.id}>
                      {/* <TableCell>{customer.id}</TableCell> */}
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.phoneNumber}</TableCell>
                      <TableCell>{customer.address}</TableCell>
                      <TableCell>{formatDate(customer?.createdAt)}</TableCell>
                      <TableCell>{formatDate(customer?.updatedAt)}</TableCell>
                      <TableCell className="space-x-2">
                        <Button
                          variant="flat"
                          color="primary"
                          size="sm"
                          onPress={() => {
                            setSelectedCustomer(customer);
                            setModaltitle("Edit Pelanggan");
                            setIsDeleteModal(false);
                            setIsCreate(false);
                            onOpen();
                          }}
                        >
                          <ion-icon name="pencil" size="small"></ion-icon>
                          Edit
                        </Button>
                        <Button
                          variant="flat"
                          color="danger"
                          size="sm"
                          onPress={() => {
                            setModaltitle("Hapus Pelanggan");
                            setIsDeleteModal(true);
                            setSelectedCustomer(customer);
                            setIsCreate(false);
                            onOpen();
                          }}
                        >
                          <ion-icon
                            style={{ color: "red" }}
                            name="trash"
                            size="small"
                          ></ion-icon>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
      <ModalComponent
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={modalTitle}
        isDeleteModal={isDeleteModal}
        customer={selectedCustomer}
        handleCreateCustomer={handleCreateCustomers}
        handleDeleteCustomer={handleDeleteCustomers}
        handleEditCustomer={handleEditCustomers}
        isCreate={isCreate}
      />
      <ToastContainer />
    </>
  );
}

export default CustomerPage;
