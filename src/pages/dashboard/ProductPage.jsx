import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { useForm } from "react-hook-form"


import { useAsyncList } from "@react-stately/data";
import { useState } from "react";
import { AddCircle, BagAddOutline, KeypadOutline, PricetagOutline, Search } from "react-ionicons";
import axiosInstance from "../../apis/axiosInstance";

const productList = [
  {
    id: "58e0c367-af5e-4b9e-ae56-75f3b53a0096",
    name: "Cuci + Setrika",
    price: 11000,
    type: "Kg",
    createdAt: "2024-09-05T16:16:01.943311054+07:00",
    updatedAt: "2024-09-05T16:16:01.943311098+07:00",
  },
  {
    id: "e2f7be9c-0b63-4064-bf53-6830b40fd63b",
    name: "Cuci",
    price: 7000,
    type: "Kg",
    createdAt: "2024-09-05T16:16:01.94331114+07:00",
    updatedAt: "2024-09-05T16:16:01.943311175+07:00",
  },
];

const AddProductModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async () => {
    alert("Hi!");
  }
  
  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        variant="solid"
        size="md"
        className="rounded-xl font-semibold"
      >
        <AddCircle color={"#fff"} /> Tambah Product
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <ModalContent>
              <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                Tambah Produk
              </ModalHeader>
              <ModalBody>
                <>
                  <div className="my-0.5 flex justify-start items-center gap-2 rounded-xl shadow border-t border-gray-100 pl-2">
                    <BagAddOutline
                      color={"#606060"}
                      // className="absolute top-2.5 left-3"
                      onClick={() => alert("Hi!")}
                    />
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      placeholder="Nama produk..."
                      className="w-full px-3 py-2 rounded-r-xl"
                    />
                  </div>
                  <span className="text-red-500 text-sm">{errors.name && "Nama harus diisi"}</span>
                  <div className="my-0.5 flex justify-start items-center gap-2 rounded-xl shadow border-t border-gray-100 pl-2">
                    <PricetagOutline
                      color={"#606060"}
                      // className="absolute top-2.5 left-3"
                      onClick={() => alert("Hi!")}
                    />
                    <input
                      {...register("price", { required: true, min: 0 })}
                      type="number"
                      min={0}
                      placeholder="Harga produk..."
                      className="w-full px-3 py-2 rounded-r-xl"
                    />
                  </div>
                  <span className="text-red-500 text-sm">{errors.price && "Harga harus diisi"}</span>
                  <div className="my-0.5 flex justify-start items-center gap-2 rounded-xl shadow border-t border-gray-100 pl-2">
                    <KeypadOutline
                      color={"#606060"}
                      // className="absolute top-2.5 left-3"
                      onClick={() => alert("Hi!")}
                    />
                    <input
                      {...register("type", { required: true })}
                      type="text"
                      placeholder="Type produk..."
                      className="w-full px-3 py-2 rounded-r-xl"
                    />
                  </div>
                  <span className="text-red-500 text-sm">{errors.type && "Tipe harus diisi"}</span>
                </>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </ModalFooter>
              </form>
            </ModalContent>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

const ProductPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // const fetch = async () => {
  //   const res
  // }

  let list = useAsyncList({
    async load() {
      const res = await axiosInstance.get("/products");
      console.log(res.data);
       
      let json = productList;
      setIsLoading(false);

      return {
        items: json,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  return (
    <div>
      <div className="my-4 flex justify-between items-center">
        <div className="">
          <AddProductModal />
        </div>
        <div className="relative w-auto">
          <Search
            color={"#606060"}
            className="absolute top-2.5 right-3"
            onClick={() => alert("Hi!")}
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full border shadow px-3 py-2 rounded-xl"
          />
        </div>
      </div>
      <Table
        aria-label="Example table with client side sorting"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        classNames={{
          table: "min-h-auto",
        }}
      >
        <TableHeader>
          <TableColumn key="name" allowsSorting>
            Name
          </TableColumn>
          <TableColumn key="price" allowsSorting>
            Price
          </TableColumn>
          <TableColumn key="type" allowsSorting>
            Type
          </TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody
          items={list.items}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item) => {
            return (
              <TableRow key={item.id}>
                {/* Kolom Data */}
                <TableCell>{item.name}</TableCell>
                <TableCell>Rp {item.price.toLocaleString("id-ID")}</TableCell>
                <TableCell>{item.type}</TableCell>
                {/* Kolom Action */}
                <TableCell className="flex justify-start items-center gap-2">
                  <Button
                    variant="flat"
                    color="primary"
                    size="sm"
                    onPress={() => handleEdit(item.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="flat"
                    color="danger"
                    size="sm"
                    onPress={() => handleEdit(item.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="flat"
                    color="success"
                    size="sm"
                    onPress={() => handleEdit(item.id)}
                  >
                    Order
                  </Button>
                </TableCell>
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductPage;
