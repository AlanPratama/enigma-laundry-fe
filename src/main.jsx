import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";

import store from "./redux/store";
import { App } from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
	<NextUIProvider>
		<Provider store={store}>
			<App />
		</Provider>
	</NextUIProvider>
);
