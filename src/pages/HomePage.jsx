import { Button } from "@nextui-org/react";
import vid from "/alan.gif";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <div>
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
            Anjay
          </p>
        </div>
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
            >
              <defs>
                <pattern
                  id="679d5905-e08c-4b91-a66c-84aefbb9d2f5"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#679d5905-e08c-4b91-a66c-84aefbb9d2f5)"
                width="52"
                height="24"
              />
            </svg>
            <span className="relative">ALAN</span>
          </span>{" "}
          MAU PELUK REI TAPI DITAMPOL <br />
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          Alan: &quot;Saya{" "}
          <span className="text-red-600 font-semibold">wibu</span> dan saya
          <span className="text-red-600 font-semibold"> bangga</span>&quot;
        </p>
        <Button
          className="mt-4"
          variant="solid"
          color="danger"
          onClick={() => {
            handleNavigate("/dashboard");
          }}
        >
          Selengkapnya
        </Button>
      </div>
      <div className="mx-auto lg:max-w-2xl">
        <div className="relative w-full transition-shadow duration-300">
          <img
            className="object-cover w-fit h-fit rounded shadow-lg mx-auto"
            src={vid}
            alt=""
            autoPlay
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
