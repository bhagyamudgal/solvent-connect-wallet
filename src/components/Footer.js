import React from "react";

function Footer() {
	return (
		<div className="h-14 px-4 py-2 flex items-center bg-blue-600 text-white">
			<span className="text-md font-normal mx-auto">
				Developed by{" "}
                <a
                    className="underline underline-offset-4 decoration-wavy hover:text-black"
					href="https://www.bhagyamudgal.me"
					target="_blank"
					rel="noopener noreferrer"
				>
					Bhagya Mudgal
				</a>{" "}
			</span>
		</div>
	);
}

export default Footer;
