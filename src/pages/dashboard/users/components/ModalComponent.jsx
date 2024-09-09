import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@nextui-org/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function ModalComponent({ isOpen, onOpenChange, title, isDeleteModal, user, handleCreateUser, handleDeleteUser, handleEditUser, isCreate }) {
	const [formData, setFormData] = useState({ ...user });
	const [errors, setErrors] = useState({});

	console.log(user);

	const validateForm = () => {
		const newErrors = {};

		if (!formData.name || formData.name.trim() === "") {
			newErrors.name = "Nama harus diisi";
		}

		if (!formData.email || formData.email.trim() === "") {
			newErrors.email = "Nomor telpon harus diisi";
		}

		if (!formData.username || formData.username.trim() === "") {
			newErrors.username = "Username harus diisi";
		}

		if (!formData.role || formData.role.trim() === "") {
			newErrors.role = "Role harus diisi";
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
				handleCreateUser(formData);
				setFormData({});
			} else if (!isCreate) {
				handleEditUser(formData);
				setFormData({});
			}

			onOpenChange(false);
		}
	};

	const handleDelete = () => {
		handleDeleteUser(user);
		onOpenChange(false);
	};

	console.log(isCreate);
	console.log(formData);

	useEffect(() => {
		if (isCreate) {
			setFormData({});
		} else if (!isDeleteModal || !isCreate) {
			setFormData({ ...user });
		}
	}, [isOpen]);

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			placement='center'
			onClose={() => {
				setFormData({});
			}}
			data-testid='user-modal'
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
						<ModalBody>
							{!isDeleteModal ? (
								<form onSubmit={handleSubmit} className='space-y-4'>
									<Input
										autoFocus
										isRequired
										label='Nama'
										name='name'
										variant='flat'
										value={formData.name}
										onChange={handleInputChange}
										isInvalid={!!errors.name}
										errorMessage={errors.name}
										data-testid='user-modal-name-input'
									/>
									<Input
										isRequired
										label='E-mail'
										name='email'
										variant='flat'
										value={formData.email}
										onChange={handleInputChange}
										isInvalid={!!errors.email}
										errorMessage={errors.email}
										data-testid='user-modal-phone-input'
									/>
									<Input
										isRequired
										label='Username'
										name='username'
										variant='flat'
										value={formData.username}
										onChange={handleInputChange}
										isInvalid={!!errors.username}
										errorMessage={errors.username}
										data-testid='user-modal-username-input'
									/>
									<Select
										isRequired
										label='Role'
										name='role'
										variant='flat'
										selectedKeys={[formData.role]}
										onChange={handleInputChange}
										isInvalid={!!errors.role}
										errorMessage={errors.role}
										data-testid='user-modal-role-input'
									>
										<SelectItem key={"admin"} value={"admin"} textValue={"Admin"}>
											Admin
										</SelectItem>
										<SelectItem key={"employee"} value={"employee"} textValue={"Employee"}>
											Employee
										</SelectItem>
									</Select>
								</form>
							) : (
								<p>
									Yakin ingin menghapus pelanggan <span className='text-blue-600'>{user.name}</span>?
								</p>
							)}
						</ModalBody>
						<ModalFooter>
							<Button data-testid={isDeleteModal ? "cancel-delete-button" : "user-modal-close-button"} color='danger' variant='light' onPress={onClose}>
								Batal
							</Button>
							<Button
								color='primary'
								type={!isDeleteModal ? "submit" : "button"}
								onClick={() => {
									if (!isDeleteModal) {
										handleSubmit();
									} else {
										handleDelete();
									}
								}}
								data-testid={isDeleteModal ? "confirm-delete-button" : "user-modal-submit"}
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
	user: PropTypes.object,
	handleCreateUser: PropTypes.func,
	handleDeleteUser: PropTypes.func,
	handleEditUser: PropTypes.func,
	isCreate: PropTypes.bool.isRequired,
};

export default ModalComponent;
