import React from "react";

// goki wallet import
import { WalletKitProvider } from "@gokiprotocol/walletkit";

// React components
import Header from "./components/Header";

// React pages
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
	return (
		<div className="min-h-screen flex flex-col text-black">
			<WalletKitProvider
				defaultNetwork="devnet"
				app={{
					name: "Solvent Connect Wallet",
				}}
			>
				<Header />
				<Home />
				<Footer />
			</WalletKitProvider>
		</div>
	);
}

export default App;
