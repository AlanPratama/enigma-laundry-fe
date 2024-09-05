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

function ModalComponent({
  isOpen,
  onOpenChange,
  title,
  isDeleteModal,
  customer,
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              {!isDeleteModal ? (
                <>
                  <Input
                    autoFocus
                    isRequired
                    label="Nama"
                    variant="flat"
                    value={customer && customer.name}
                  />
                  <Input
                    autoFocus
                    isRequired
                    label="Nomor Telpon"
                    variant="flat"
                    value={customer && customer.phoneNumber}
                  />
                  <Input
                    autoFocus
                    isRequired
                    label="Alamat"
                    variant="flat"
                    value={customer && customer.address}
                  />
                </>
              ) : (
                <h1>Are you sure nigga?</h1>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Batal
              </Button>
              <Button color="primary" onPress={onClose}>
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
};

export default ModalComponent;
