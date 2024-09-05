import alan1 from "/alan1.jpg";
import alan2 from "/alan2.jpg";
import alan3 from "/alan3.jpg";
import logo from "/logo.png";

import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col justify-center md:pr-8 xl:pr-0 lg:max-w-lg">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-teal-accent-400">
            <img src={logo} />
          </div>
          <div className="max-w-xl mb-6">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              Let us take care
              <br className="hidden md:block" />
              of your{" "}
              <span className="inline-block text-deep-purple-accent-400">
                laundry needs
              </span>
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              We handle everything with care and attention, ensuring your
              clothes are treated with the best service possible, so you can
              enjoy fresh, clean results every time.
            </p>
          </div>
          <div>
            <button
              type="button"
              className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
              onClick={() => {
                handleNavigate("/dashboard");
              }}
            >
              Learn more
              <svg
                className="inline-block w-3 ml-2"
                fill="currentColor"
                viewBox="0 0 12 12"
              >
                <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center -mx-4 lg:pl-8">
          <div className="flex flex-col items-end px-3">
            <img
              className="object-fit mb-6 rounded shadow-lg h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56"
              src={alan1}
            />
            <img
              className="object-fit w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40"
              src={alan2}
              alt=""
            />
          </div>
          <div className="px-3">
            <img
              className="object-fit w-40 h-40 rounded shadow-lg sm:h-64 xl:h-80 sm:w-64 xl:w-80"
              src={alan3}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
