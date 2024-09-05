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
      setError({ message: "Please fill out all required fields" });
      return;
    }

    console.log("RMMALSMALMSA, ", formData);
    

    handleCreateTransaction(formData);
    onOpenChange(false); 
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>
              {error.message && <p style={{ color: "red" }}>{error.message}</p>}
              <form onSubmit={handleSubmit}>
                <Input
                  autoFocus
                  label="Customer ID"
                  name="customerId"
                  placeholder="Enter customer ID"
                  variant="bordered"
                  value={formData.customerId}
                  onChange={(e) => handleChange(e)}
                />
                <Input
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
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" type="submit" onPress={handleSubmit}>
                Buat Transaksi
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ModalComponent;
