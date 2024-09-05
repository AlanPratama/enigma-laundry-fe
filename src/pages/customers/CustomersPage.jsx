// import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import dummyCustomers from "./dummyCustomers";
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

function CustomersPage() {
  const [customers, setCustomers] = useState([]);
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

  /**
   * Kena cors
  const fetchCustomers = async () => {
    const apiUrl = "http://localhost:8080/api/v1";

    const login = await axios.post(
      `${apiUrl}/auth/login`,
      {
        username: "admin",
        password: "password",
      },
      { withCredentials: true }
    );
    const token = login.data?.token;

    if (token) {
      const result = await axios.get(`${apiUrl}/customers`, {
        headers: {
          Authorization: `${token}`,
        },
        withCredentials: true,
      });

      if (result) {
        setCustomers(result);
      }
    }
  };
  */

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

  const sortedCustomers = sort(customers, sortDescriptor);
  const pages = Math.ceil(sortedCustomers.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedCustomers.slice(start, end);
  }, [page, sortedCustomers]);

  useEffect(() => {
    // setCustomers(fetchCustomers());
    setCustomers(dummyCustomers);
  }, []);

  return (
    <>
      <div className="flex flex-1 justify-center m-8">
        <Card>
          <CardHeader className="flex justify-between mt-2">
            <h1 className="text-xl font-bold p-2">Daftar Pelanggan</h1>
            <Button
              color="primary"
              onPress={() => {
                setModaltitle("Tambah Pelanggan");
                setIsDeleteModal(false);
                setSelectedCustomer(null);
                onOpen();
              }}
            >
              <ion-icon name="document-text-outline"></ion-icon>
              <span>Tambah Pelanggan</span>
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
                    showShadow
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
                <TableColumn allowsSorting key="id">
                  Id Pelanggan
                </TableColumn>
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
                {items.map((customer) => {
                  return (
                    <TableRow key={customer.id}>
                      <TableCell>{customer.id}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.phoneNumber}</TableCell>
                      <TableCell>{customer.address}</TableCell>
                      <TableCell>
                        {new Date(customer.createdAt).toLocaleDateString()}{" "}
                        {new Date(customer.createdAt).toLocaleTimeString()}
                      </TableCell>
                      <TableCell>
                        {new Date(customer.updatedAt).toLocaleDateString()}{" "}
                        {new Date(customer.updatedAt).toLocaleTimeString()}
                      </TableCell>
                      <TableCell>
                        {/* 
                          Tombol lihat detail 
                          <Button isIconOnly variant="light">
                            <ion-icon name="eye-outline"></ion-icon>
                          </Button> 
                        */}
                        <Button
                          isIconOnly
                          variant="light"
                          onPress={() => {
                            setSelectedCustomer(customer);
                            setModaltitle("Edit Pelanggan");
                            setIsDeleteModal(false);
                            onOpen();
                          }}
                        >
                          <ion-icon name="pencil-outline"></ion-icon>
                        </Button>
                        <Button
                          isIconOnly
                          variant="light"
                          onPress={() => {
                            setModaltitle("Hapus Pelanggan");
                            setIsDeleteModal(true);
                            setSelectedCustomer(customer);
                            onOpen();
                          }}
                        >
                          <ion-icon
                            style={{ color: "red" }}
                            name="trash-outline"
                          ></ion-icon>
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
      />
    </>
  );
}

export default CustomersPage;
