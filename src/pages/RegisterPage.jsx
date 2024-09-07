import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import AuthApi from "../apis/AuthApi";

const RegisterPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

	const onSubmit = async (data) => {
		await toast.promise(AuthApi.register(data), {
			pending: "Register...",
			success: "Register successful 👌",
			error: "Register failed 🤯",
		});
		toast.info("Login to your account");
		navigate("/login", { replace: true, state: { from: "/register" } });
	};

	return (
		<div className='relative'>
			<img
				src='https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260'
				className='absolute inset-0 object-cover w-full h-full'
				alt='Background Photo'
			/>
			<div className='min-h-screen relative bg-opacity-75 bg-indigo-700'>
				<svg className='absolute inset-x-0 bottom-0 text-white' viewBox='0 0 1160 163'>
					<path
						fill='currentColor'
						d='M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z'
					/>
				</svg>
				<div className='relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
					<div className='flex flex-col items-center justify-between xl:flex-row'>
						<div className='w-full max-w-xl mb-12 xl:mb-0 xl:w-2/3'>
							<h2 className='max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none'>
								Simple, Fast, and Reliable <br className='hidden md:block' />
								<span className='text-3xl'>– Register to make new account</span>
							</h2>
							<p className='max-w-xl mb-4 text-base text-gray-200 md:text-lg'>
								Welcome to Enigma Laundry. Please register first to access our premium laundry services that are easy, fast, and efficient. Keep your clothes
								fresh with just one click!
							</p>
						</div>
						<div className='w-full max-w-xl xl:px-8 xl:w-5/12'>
							<div className='bg-white rounded shadow-2xl p-7 sm:p-10'>
								<h3 className='mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl'>Register new account</h3>
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className='mb-1 sm:mb-4'>
										<label htmlFor='name' className='inline-block mb-1 font-medium'>
											Name
										</label>
										<input
											placeholder='Input name...'
											type='text'
											className='flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-indigo-400 focus:outline-none focus:shadow-outline'
											id='name'
											name='name'
											{...register("name", { required: true })}
										/>
										{errors.name && <span className='text-red-500 font-medium'>Name required</span>}
									</div>
									<div className='mb-1 sm:mb-4'>
										<label htmlFor='email' className='inline-block mb-1 font-medium'>
											Email
										</label>
										<input
											placeholder='Input email...'
											type='email'
											className='flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-indigo-400 focus:outline-none focus:shadow-outline'
											id='email'
											name='email'
											{...register("email", { required: true })}
										/>
										{errors.email && <span className='text-red-500 font-medium'>Email required</span>}
									</div>
									<div className='mb-1 sm:mb-4'>
										<label htmlFor='username' className='inline-block mb-1 font-medium'>
											Username
										</label>
										<input
											placeholder='Input username...'
											type='text'
											className='flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-indigo-400 focus:outline-none focus:shadow-outline'
											id='username'
											name='username'
											{...register("username", { required: true })}
										/>
										{errors.username && <span className='text-red-500 font-medium'>Username required</span>}
									</div>
									<div className='mb-1 sm:mb-4'>
										<label htmlFor='password' className='inline-block mb-1 font-medium'>
											Password
										</label>
										<div className='relative'>
											<input
												placeholder='Input password...'
												type={showPassword ? "text" : "password"}
												className='flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-indigo-400 focus:outline-none focus:shadow-outline'
												id='password'
												name='password'
												{...register("password", { required: true })}
											/>
											<button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute top-3.5 right-3.5'>
												{showPassword ? <ion-icon name='eye' /> : <ion-icon name='eye-off' />}
											</button>
										</div>
										{errors.password && <span className='text-red-500 font-medium'>{errors.password.message}</span>}
									</div>
									<div className='mb-1 sm:mb-4'>
										<label htmlFor='confirmPassword' className='inline-block mb-1 font-medium'>
											Confirm Password
										</label>
										<div className='relative'>
											<input
												placeholder='Input confirmPassword...'
												type={showConfirmPassword ? "text" : "password"}
												className='flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-indigo-400 focus:outline-none focus:shadow-outline'
												id='confirmPassword'
												name='confirmPassword'
												{...register("confirmPassword", {
													required: true,
													validate: (val) => {
														if (watch("password") != val) {
															return "Your passwords do no match";
														}
													},
												})}
											/>
											<button type='button' onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='absolute top-3.5 right-3.5'>
												{showConfirmPassword ? <ion-icon name='eye' /> : <ion-icon name='eye-off' />}
											</button>
										</div>
										{errors.confirmPassword && <span className='text-red-500 font-medium'>{errors.confirmPassword.message}</span>}
									</div>
									<div className='mt-4 mb-2 sm:mb-4'>
										<button
											type='submit'
											className='inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-indigo-700 hover:bg-indigo-800 focus:shadow-outline focus:outline-none'
										>
											Log In
										</button>
									</div>
									<div className='flex justify-between'>
										<p className='text-xs text-gray-600 sm:text-sm'>© Enigma Laundry</p>
										<p className='text-xs text-gray-600 sm:text-sm'>
											Already have an account?{" "}
											<Link to={"/login"} className='text-primary'>
												Login here
											</Link>
										</p>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
