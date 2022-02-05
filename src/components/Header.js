import React from "react";

function Header() {
	return (
		<div className="h-20 px-4 py-2 flex items-center bg-blue-600 text-white">
			<a
				href="/"
				className="text-2xl font-semibold mx-auto sm:mx-0 sm:text-3xl hover:text-black"
			>
				Solvent Connect Wallet
			</a>
		</div>
	);
}

export default Header;
