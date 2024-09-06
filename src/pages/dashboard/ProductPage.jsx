import {
  Button,
  Card,
  CardBody,
  CardHeader,
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
import { useForm } from "react-hook-form";

import { useEffect, useRef, useState } from "react";
import {
  AddCircle,
  BagAddOutline,
  BagHandleOutline,
  KeypadOutline,
  PencilOutline,
  PricetagOutline,
  TrashBinOutline,
} from "react-ionicons";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProductApi from "../../apis/ProductsApi";

const ProductPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [productChange, setProductChange] = useState({});
  const [modalType, setModalType] = useState("update");
  const { items } = useSelector((state) => state.products);

  const getProduct = async () => {
    await ProductApi.getProducts();
    setIsLoading(false);
  };

  const handleCreateModal = () => {
    setModalType("create");
    setValue("name", "");
    setValue("price", "");
    setValue("type", "");
    onOpen();
  };

  const handleUpdateModal = (item) => {
    setProductChange(item);
    setModalType("update");
    console.log(item);

    onOpen();
  };

  const handleDeleteModal = (product) => {
    setModalType("delete");
    setProductChange(product);
    onOpen();
  };

  useEffect(() => {
    getProduct();
  }, []);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const cancelRef = useRef();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("name", productChange.name);
    setValue("price", productChange.price);
    setValue("type", productChange.type);
  }, [productChange, setValue]);

  const onSubmit = async () => {
    if (modalType === "delete") {
      await ProductApi.deleteProduct(productChange.id);
      toast.success("Produk Berhasil Dihapus!", {
        position: "top-center",
        autoClose: 4000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      const productData = {
        id: productChange.id,
        name: watch("name"),
        price: parseInt(watch("price")),
        type: watch("type"),
      };
      setValue("name", "");
      setValue("price", "");
      setValue("type", "");
      console.log(productData);

      if (modalType === "create") await ProductApi.createProduct(productData);
      else await ProductApi.updateProduct(productData);

      const message =
        modalType === "create"
          ? "Produk Berhasil Ditambahkan!"
          : "Produk Berhasil Diubah!";

      toast.success(message, {
        position: "top-center",
        autoClose: 4000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    cancelRef.current.click();
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
        <CardHeader className="flex justify-between mt-2 px-7">
          <h1 className="font-bold text-start text-xl">Daftar Produk</h1>
          <div className="flex justify-center items-center gap-4">
            {/* <div className="relative w-auto">
          <Search
            color={"#606060"}
            className="absolute top-3.5 right-3"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full border shadow px-3 py-3 rounded-xl"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div> */}
            {/* <AddProductModal /> */}
            <Button
              onPress={handleCreateModal}
              color="primary"
              variant="solid"
              size="md"
              className="rounded-xl font-semibold"
            >
              <AddCircle color={"#fff"} /> Tambah Product
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <Table
            aria-label="Example table with client side sorting"
            classNames={{
              table: "min-h-auto",
            }}
          >
            <TableHeader>
              <TableColumn key="name">Nama</TableColumn>
              <TableColumn key="price">Harga</TableColumn>
              <TableColumn key="type">Tipe</TableColumn>
              <TableColumn key="type">Dibuat Pada</TableColumn>
              <TableColumn key="type">Diubah Pada</TableColumn>
              <TableColumn>Aksi</TableColumn>
            </TableHeader>
            <TableBody
              items={items}
              isLoading={isLoading}
              loadingContent={<Spinner label="Loading..." />}
            >
              {(item) => {
                return (
                  <TableRow key={item.id}>
                    {/* Kolom Data */}
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      Rp {item.price.toLocaleString("id-ID")}
                    </TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{formatDate(item.createdAt)}</TableCell>
                    <TableCell>{formatDate(item.updatedAt)}</TableCell>
                    {/* Kolom Action */}
                    <TableCell className="flex justify-start items-center gap-2">
                      <Button
                        variant="flat"
                        color="primary"
                        size="sm"
                        onPress={() => handleUpdateModal(item)}
                      >
                        <PencilOutline color="blue" height="15px" /> Edit
                      </Button>
                      <Button
                        variant="flat"
                        color="danger"
                        size="sm"
                        onPress={() => handleDeleteModal(item)}
                      >
                        <TrashBinOutline color="red" height="15px" /> Delete
                      </Button>
                      <Button
                        variant="flat"
                        color="success"
                        size="sm"
                        // onPress={() => handleEdit(item.id)}
                      >
                        <BagHandleOutline color="green" height="15px" />
                        Order
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <div>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isDismissable={false}
          isKeyboardDismissDisabled={false}
        >
          <ModalContent>
            {(onClose) => (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalHeader className="flex flex-col gap-1">
                    {modalType === "create"
                      ? "Tambah"
                      : modalType === "update"
                      ? "Edit"
                      : "Hapus"}{" "}
                    Produk
                  </ModalHeader>
                  <ModalBody>
                    {modalType === "delete" ? (
                      <div>
                        <p>
                          Apakah kamu yakin akan menghapus produk ini{" "}
                          <span className="text-red-500 font-semibold">
                            {productChange.name}
                          </span>
                          ?{" "}
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="my-0.5 flex justify-start items-center gap-2 rounded-xl shadow border-t border-gray-100 pl-2">
                          <BagAddOutline color={"#606060"} />
                          <input
                            type="text"
                            {...register("name", { required: true })}
                            defaultValue={productChange.name}
                            placeholder="Nama produk..."
                            className="w-full px-3 py-2 rounded-r-xl"
                          />
                        </div>
                        <span className="text-red-500 text-sm">
                          {errors.name && "Nama harus diisi"}
                        </span>
                        <div className="my-0.5 flex justify-start items-center gap-2 rounded-xl shadow border-t border-gray-100 pl-2">
                          <PricetagOutline
                            color={"#606060"}
                            // className="absolute top-2.5 left-3"
                          />
                          <input
                            type="number"
                            defaultValue={productChange.price}
                            {...register("price", { required: true, min: 0 })}
                            min={0}
                            placeholder="Harga produk..."
                            className="w-full px-3 py-2 rounded-r-xl"
                          />
                        </div>
                        <span className="text-red-500 text-sm">
                          {errors.price && "Harga harus diisi"}
                        </span>
                        <div className="my-0.5 flex justify-start items-center gap-2 rounded-xl shadow border-t border-gray-100 pl-2">
                          <KeypadOutline
                            color={"#606060"}
                            // className="absolute top-2.5 left-3"
                          />
                          <input
                            defaultValue={productChange.type}
                            {...register("type", { required: true })}
                            type="text"
                            placeholder="Type produk..."
                            className="w-full px-3 py-2 rounded-r-xl"
                          />
                        </div>
                        <span className="text-red-500 text-sm">
                          {errors.type && "Tipe harus diisi"}
                        </span>
                      </>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      ref={cancelRef}
                      variant="light"
                      onPress={onClose}
                    >
                      Close
                    </Button>
                    <Button color="primary" type="submit">
                      Submit
                    </Button>
                  </ModalFooter>
                </form>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default ProductPage;
