import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useState } from "react";

function ModalComponent({
  isOpen,
  onOpenChange,
  title,
  transaction,
  isCreate,
  handleCreateTransaction,
}) {
  const [formData, setFormData] = useState({
    customerId: "",
    billDetails: [{ product: { id: "" }, qty: 0 }],
  });
  const [error, setError] = useState({});

  const handleChange = (e, field, index = null) => {
    const { name, value } = e.target;

    if (index !== null) {
      const updatedBillDetails = [...formData.billDetails];
      updatedBillDetails[index] = {
        ...updatedBillDetails[index],
        [field]: field === "product" ? { id: value } : value,
      };
      setFormData({
        ...formData,
        billDetails: updatedBillDetails,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = () => {
    if (
      !formData.customerId ||
      !formData.billDetails[0].product.id ||
      formData.billDetails[0].qty <= 0
    ) {
      setError({ message: "Tidak boleh ada tabel yang kosong" });
      return;
    }

    console.log("RMMALSMALMSA, ", formData);

    handleCreateTransaction(formData);
    onOpenChange(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent className="w-full max-w-4xl">
        {(onClose) => (
          <>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>
              {error.message && <p style={{ color: "red" }}>{error.message}</p>}
              {isCreate && (
                <form onSubmit={handleSubmit}>
                  <Input
                    className="pb-8"
                    autoFocus
                    label="Customer ID"
                    name="customerId"
                    placeholder="Enter customer ID"
                    variant="bordered"
                    value={formData.customerId}
                    onChange={(e) => handleChange(e)}
                  />
                  <Input
                    className="pb-8"
                    label="Product ID"
                    placeholder="Enter Product ID"
                    variant="bordered"
                    value={formData.billDetails[0].product.id}
                    onChange={(e) => handleChange(e, "product", 0)}
                  />
                  <Input
                    label="Quantity"
                    placeholder="Enter Quantity"
                    variant="bordered"
                    type="number"
                    value={formData.billDetails[0].qty}
                    onChange={(e) => handleChange(e, "qty", 0)}
                  />
                </form>
              )}
              {!isCreate && transaction && (
                <div className="p-4">
                <h3 className="font-bold text-xl mb-2 text-primary">Customer Details</h3>
                <div className="bg-gray-100 p-4 rounded-md shadow-md">
                  <p className="text-lg font-semibold">Name: <span className="font-normal">{transaction.customer.name}</span></p>
                  <p className="text-lg font-semibold">Phone: <span className="font-normal">{transaction.customer.phoneNumber}</span></p>
                  <p className="text-lg font-semibold">Address: <span className="font-normal">{transaction.customer.address}</span></p>
                </div>
              
                <h3 className="font-bold text-xl mt-6 mb-2 text-primary">Bill Details</h3>
                <div className="bg-gray-100 p-4 rounded-md shadow-md">
                  {transaction.billDetails.map((bill, index) => (
                    <div key={index} className="mb-4">
                      <p className="text-lg font-semibold">Product: <span className="font-normal">{bill.product.name}</span></p>
                      <p className="text-lg font-semibold">Price: <span className="font-normal">{bill.product.price}</span></p>
                      <p className="text-lg font-semibold">Type: <span className="font-normal">{bill.product.type}</span></p>
                      <p className="text-lg font-semibold">Quantity: <span className="font-normal">{bill.qty}</span></p>
                    </div>
                  ))}
                </div>
              </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              {isCreate && (
                <Button color="primary" type="submit" onPress={handleSubmit}>
                  Buat Transaksi
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ModalComponent;
