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
import { useForm } from "react-hook-form";

import { useEffect, useRef, useState } from "react";
import {
  AddCircle,
  BagAddOutline,
  KeypadOutline,
  PricetagOutline,
  Search,
} from "react-ionicons";
import { useSelector } from "react-redux";
import ProductApi from "../../apis/ProductsApi";

const AddProductModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const cancelRef = useRef();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    const productData = {
      name: watch("name"),
      price: parseInt(watch("price")),
      type: watch("type"),
    };
    console.log(productData);

    await ProductApi.createProduct(productData);
    cancelRef.current.click();
  };

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
                      />
                      <input
                        {...register("name", { required: true })}
                        type="text"
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
                        {...register("price", { required: true, min: 0 })}
                        type="number"
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
            </ModalContent>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};


const ProductPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [productUpdate, setProductUpdate] = useState({});
  const [modalType, setModalType] = useState("update");
  const { items } = useSelector((state) => state.products);
  
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "id",
    direction: "descending",
  });

  const getProduct = async () => {
    await ProductApi.getProducts();
    setIsLoading(false);
  };

  const handleUpdateModal = (item) => {
    setProductUpdate(item)
    setModalType("update");
    console.log("upda:", item);
    
    onOpenChange(true)
  }
  
  const handleDeleteModal = (product) => {
    setModalType("delete");
    setProductUpdate(product)
    onOpenChange(true)
  }

  useEffect(() => {
    getProduct();
  }, []);

  const handleSort = ({ items, sortDescriptor }) => {
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
  };



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
    setValue("name", productUpdate.name);
    setValue("price", productUpdate.price);
    setValue("type", productUpdate.type);
  }, [productUpdate]);

  const onSubmit = async () => {
    if(modalType === "update") {
      const productData = {
        id: productUpdate.id,
        name: watch("name"),
        price: parseInt(watch("price")),
        type: watch("type"),
      };
      console.log(productData);
  
      await ProductApi.updateProduct(productData);
    } else {
      await ProductApi.deleteProduct(productUpdate.id)
    }
    cancelRef.current.click();
  };


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
        onSortChange={handleSort}
        sortDescriptor={sortDescriptor}
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
          items={items}
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
                    onPress={() => handleUpdateModal(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="flat"
                    color="danger"
                    size="sm"
                    onPress={() => handleDeleteModal(item)}
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

      <div>
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
                  {modalType === "update" ? "Edit" : "Hapus"} Produk
                </ModalHeader>
                <ModalBody>
                  {
                    modalType === "update" ? (
                      <>
                    <div className="my-0.5 flex justify-start items-center gap-2 rounded-xl shadow border-t border-gray-100 pl-2">
                      <BagAddOutline
                        color={"#606060"}
                      />
                      <input
                        type="text"
                        {...register("name", { required: true })}
                        defaultValue={productUpdate.name}
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
                        defaultValue={productUpdate.price}
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
                        defaultValue={productUpdate.type}
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
                    ): (
                      <>
                        <p>Apakah kamu yakin akan menghapus produk ini <span className="text-blue-600 font-medium">{productUpdate.name}</span>? </p>
                      </>
                    )
                  }
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
            </ModalContent>
          )}
        </ModalContent>
      </Modal>
    </div>
    </div>
  );
};

export default ProductPage;
