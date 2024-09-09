import { Button, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

import UserApi from "../../../apis/UsersApi";
import ModalComponent from "./components/ModalComponent";

function UserPage() {
	const { items } = useSelector((state) => state.users);
	const [selectedUser, setSelectedUser] = useState(null);
	const [modalTitle, setModalTitle] = useState("");
	const [isDeleteModal, setIsDeleteModal] = useState(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [sortDescriptor, setSortDescriptor] = useState({
		column: "id",
		direction: "descending",
	});
	const [page, setPage] = useState(1);
	const rowsPerPage = 5;
	const [isCreate, setIsCreate] = useState(false);

	const fetchUsers = async () => {
		await UserApi.getUsers();
	};

	const handleCreateUsers = async (user) => {
		try {
			await UserApi.createUsers(user);
			toast.success("User Berhasil Dibuat!", {
				position: "top-center",
				autoClose: 4000,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			fetchUsers();
		} catch (error) {
			console.error("Error creating user:", error);
		}
	};

	const handleEditUsers = async (user) => {
		try {
			await UserApi.editUser(user);
			toast.success("User Berhasil Diubah!", {
				position: "top-center",
				autoClose: 4000,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			fetchUsers();
		} catch (error) {
			console.error("Error editing user:", error);
		}
	};

	const handleDeleteUsers = async (user) => {
		try {
			await UserApi.deleteUsers(user);
			toast.success("User Berhasil Dihapus!", {
				position: "top-center",
				autoClose: 4000,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			fetchUsers();
		} catch (error) {
			console.error("Error deleting user:", error);
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

	const sortedUsers = sort(items, sortDescriptor);
	const pages = Math.ceil(sortedUsers.length / rowsPerPage);

	const sortedItems = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return sortedUsers.slice(start, end);
	}, [page, sortedUsers]);

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<>
			<div className='m-8'>
				<div className='flex justify-between mb-4'>
					<h1 className='text-xl font-bold p-2' data-testid='user-title'>
						Users
					</h1>
					<Button
						color='primary'
						onPress={() => {
							setModalTitle("Tambah User");
							setIsDeleteModal(false);
							setSelectedUser(null);
							setIsCreate(true);
							onOpen();
						}}
						data-testid='add-user-button'
					>
						<ion-icon name='add-circle' size='small'></ion-icon>
						<span className='font-semibold'>Tambah User</span>
					</Button>
				</div>
				<Table
					color='primary'
					selectionMode='single'
					sortDescriptor={sortDescriptor}
					onSortChange={handleSortChange}
					aria-label='users-table'
					bottomContent={
						<div className='flex w-full justify-center items-center'>
							<Pagination
								loop
								isCompact
								showControls
								// showShadow
								size='sm'
								className='flex items-center'
								color='primary'
								variant='light'
								page={page}
								total={pages}
								onChange={(page) => setPage(page)}
							/>
						</div>
					}
				>
					<TableHeader>
						<TableColumn allowsSorting key='no'>
							No
						</TableColumn>
						<TableColumn allowsSorting key='name'>
							Nama
						</TableColumn>
						<TableColumn allowsSorting key='email'>
							Email
						</TableColumn>
						<TableColumn allowsSorting key='username'>
							Username
						</TableColumn>
						<TableColumn allowsSorting key='role'>
							Role
						</TableColumn>
						<TableColumn>Aksi</TableColumn>
					</TableHeader>
					<TableBody emptyContent={"Tidak ada data."}>
						{sortedItems.map((user, index) => {
							return (
								<TableRow key={user.id}>
									<TableCell>{(page - 1) * rowsPerPage + (index + 1)}</TableCell>
									<TableCell>{user.name}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>{user.username}</TableCell>
									<TableCell>{user.role}</TableCell>
									<TableCell className='flex justify-start items-center gap-2 h-[56px]'>
										<Button
											variant='flat'
											color='primary'
											size='sm'
											onPress={() => {
												setSelectedUser(user);
												setModalTitle("Edit Pelanggan");
												setIsDeleteModal(false);
												setIsCreate(false);
												onOpen();
											}}
											data-testid={`edit-user-button-${user.id}`}
										>
											<ion-icon name='pencil' size='small'></ion-icon>
											Edit
										</Button>
										<Button
											variant='flat'
											color='danger'
											size='sm'
											onPress={() => {
												setModalTitle("Hapus Pelanggan");
												setIsDeleteModal(true);
												setSelectedUser(user);
												setIsCreate(false);
												onOpen();
											}}
											data-testid={`delete-user-button-${user.id}`}
										>
											<ion-icon style={{ color: "red" }} name='trash' size='small'></ion-icon>
											Delete
										</Button>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>
			<ModalComponent
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				title={modalTitle}
				isDeleteModal={isDeleteModal}
				user={selectedUser}
				handleCreateUser={handleCreateUsers}
				handleDeleteUser={handleDeleteUsers}
				handleEditUser={handleEditUsers}
				isCreate={isCreate}
			/>
			<ToastContainer />
		</>
	);
}

export default UserPage;
