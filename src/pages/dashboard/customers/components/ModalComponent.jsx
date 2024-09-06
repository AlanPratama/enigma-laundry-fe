import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function ModalComponent({
  isOpen,
  onOpenChange,
  title,
  isDeleteModal,
  customer,
  handleCreateCustomer,
  handleDeleteCustomer,
  handleEditCustomer,
  isCreate,
}) {
  const [formData, setFormData] = useState({ ...customer });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim() === "") {
      newErrors.name = "Nama harus diisi";
    }

    const phonePattern = /^[0-9]{10,15}$/;
    if (!formData.phoneNumber || !phonePattern.test(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "Masukan nomor telpon yang valid (10 sampai 15 digit)";
    }

    if (!formData.address || formData.address.trim() === "") {
      newErrors.address = "Alamat harus diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (isCreate) {
        handleCreateCustomer(formData);
        setFormData({});
      } else if (!isCreate) {
        handleEditCustomer(formData);
        setFormData({});
      }

      onOpenChange(false);
    }
  };

  const handleDelete = () => {
    handleDeleteCustomer(customer);
    onOpenChange(false);
  };

  useEffect(() => {
    setFormData({ ...customer });
  }, [customer]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      onClose={() => {
        setFormData({});
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              {!isDeleteModal ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    autoFocus
                    isRequired
                    label="Nama"
                    name="name"
                    variant="flat"
                    value={formData.name}
                    onChange={handleInputChange}
                    isInvalid={!!errors.name}
                    errorMessage={errors.name}
                  />
                  <Input
                    isRequired
                    label="Nomor Telpon"
                    name="phoneNumber"
                    variant="flat"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    isInvalid={!!errors.phoneNumber}
                    errorMessage={errors.phoneNumber}
                  />
                  <Input
                    isRequired
                    label="Alamat"
                    name="address"
                    variant="flat"
                    value={formData.address}
                    onChange={handleInputChange}
                    isInvalid={!!errors.address}
                    errorMessage={errors.address}
                  />
                </form>
              ) : (
                <p>
                  Yakin ingin menghapus pelanggan{" "}
                  <span className="text-blue-600">{customer.name}</span>?
                </p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Batal
              </Button>
              <Button
                color="primary"
                type={!isDeleteModal ? "submit" : "button"}
                onClick={() => {
                  if (!isDeleteModal) {
                    handleSubmit();
                  } else {
                    handleDelete();
                  }
                }}
              >
                {!isDeleteModal ? "Simpan" : "Hapus"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

ModalComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  isDeleteModal: PropTypes.bool.isRequired,
  customer: PropTypes.object,
  handleCreateCustomer: PropTypes.func,
  handleDeleteCustomer: PropTypes.func,
  handleEditCustomer: PropTypes.func,
  isCreate: PropTypes.bool.isRequired,
};

export default ModalComponent;
