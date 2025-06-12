import { Helmet } from "react-helmet-async";

import Logo from "@/assets/images/logo.png";
import Router from "@/router/index";

import { MotionLazy } from "./components/animate/motion-lazy";
import Toast from "./components/toast";
import { AntdAdapter } from "./theme/adapter/antd.adapter";
import { ThemeProvider } from "./theme/theme-provider";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
	const [message, setMessage] = useState("");
	useEffect(() => {
		// axios.get("")// url API
		// .then(response => setMessage(response.data.message))
		// .catch(error => console.error("Erreur:", error));
	}, []);




	return (
		<ThemeProvider adapters={[AntdAdapter]}>
			<MotionLazy>
				<Helmet>
					<title>Wooden Touch</title> //titre de la page
					<link rel="icon" href={Logo} />
				</Helmet>
				<Toast />

				<Router />
			</MotionLazy>
			<div>{message}</div>
		</ThemeProvider>
	);

	//return <div>{message}</div>;
}

export default App;
