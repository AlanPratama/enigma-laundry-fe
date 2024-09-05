import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "react-ionicons";
import axiosInstance from "../apis/axiosInstance";
import axios from "axios";

export const LoginPage = () => {

  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axiosInstance.get("/products", { withCredentials: true })
      console.log(res.data);
    } catch (error) {
      console.log("LoginPage Error: ", error.message);
      
    }
  }

  console.log(watch("username"));
  

  return (
    <div className="relative">
      <img
        src="https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
        className="absolute inset-0 object-cover w-full h-full"
        alt=""
      />
      <div className="min-h-screen relative bg-opacity-75 bg-indigo-700">
        <svg
          className="absolute inset-x-0 bottom-0 text-white"
          viewBox="0 0 1160 163"
        >
          <path
            fill="currentColor"
            d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
          />
        </svg>
        <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex flex-col items-center justify-between xl:flex-row">
            <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                The quick, brown fox <br className="hidden md:block" />
                jumps over a lazy dog
              </h2>
              <p className="max-w-xl mb-4 text-base text-gray-200 md:text-lg">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudan, totam rem aperiam, eaque ipsa
                quae.
              </p>
            </div>
            <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
              <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                  Login to your account
                </h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-1 sm:mb-4">
                    <label
                      htmlFor="username"
                      className="inline-block mb-1 font-medium"
                    >
                      Username
                    </label>
                    <input
                      placeholder="Masukkan username..."
                      type="text"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-indigo-400 focus:outline-none focus:shadow-outline"
                      id="username"
                      name="username"
                      { ...register("username", { required: true }) }
                    />
                    {errors.username && <span className="text-red-500 font-medium">Username wajib diisi</span>}
                  </div>
                  <div className="mb-1 sm:mb-4">
                    <label
                      htmlFor="password"
                      className="inline-block mb-1 font-medium"
                    >
                      Password
                    </label>
                    <div className="relative">
                    <input
                      placeholder="Masukkan password..."
                      type={showPassword ? "text" : "password"}
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-indigo-400 focus:outline-none focus:shadow-outline"
                      id="password"
                      name="password"
                      { ...register("password", { required: true }) }
                    />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-3.5 right-3.5">
                        { showPassword ? <EyeOff color={"#505050"} /> : <Eye color="#505050" /> }
                      </button>
                    </div>
                    {errors.password && <span className="text-red-500 font-medium">Password wajib diisi</span>}

                  </div>
                  <div className="mt-4 mb-2 sm:mb-4">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-indigo-700 hover:bg-indigo-800 focus:shadow-outline focus:outline-none"
                    >
                      Submit
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 sm:text-sm">
                    Enigma Laundry
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};