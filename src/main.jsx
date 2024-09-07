import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import store from "./redux/store";
import { App } from "./App";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
	<NextUIProvider>
		<Provider store={store}>
			<App />
			<ToastContainer position='top-center' closeOnClick pauseOnHover draggable />
		</Provider>
	</NextUIProvider>
);
