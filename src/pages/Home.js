import React from "react";

// goki wallet import
import { ConnectWalletButton } from "@gokiprotocol/walletkit";
import { PendingTransaction } from "@saberhq/solana-contrib";
import { createInitMintInstructions } from "@saberhq/token-utils";
import { useConnectedWallet, useSolana } from "@saberhq/use-solana";
import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";
import invariant from "tiny-invariant";

function Home() {
	const { walletProviderInfo, disconnect, providerMut, network, setNetwork } =
		useSolana();
	const wallet = useConnectedWallet();
	const [balance, setBalance] = useState(null);

	const refetchSOL = useCallback(async () => {
		if (wallet && providerMut) {
			setBalance(await providerMut.connection.getBalance(wallet.publicKey));
		}
	}, [providerMut, wallet]);

	useEffect(() => {
		void refetchSOL();
	}, [refetchSOL]);

	return (
		<section className="flex flex-col flex-1 items-center p-4">
			<h1 className="text-3xl md:text-4xl font-bold text-center my-10">
				Welcome to Solvent Connect Wallet App.
			</h1>

			{!wallet && <ConnectWalletButton />}

			{wallet ? (
				<div className="rounded-md bg-blue-300 min-h-10 min-w-[300px] w-2/4 p-5 my-6 text-md break-words">
					<h3 className="text-xl text-center mb-4">
						Wallet Connected Successfully
					</h3>
					<ul className="flex flex-col space-y-2">
						{console.log(wallet)}
						<li>Wallet key: {wallet?.publicKey?.toString()}</li>
						<li>Provider: {walletProviderInfo?.name}</li>
						<li>Network: {network}</li>
						<li>
							Balance:{" "}
							{typeof balance === "number"
								? `${(balance / LAMPORTS_PER_SOL).toLocaleString()} SOL`
								: "--"}
						</li>
					</ul>
					<div className="mt-6 flex flex-col items-center flex-wrap md:flex-row md:justify-center">
						<button onClick={disconnect} className="action-buttons">
							Disconnect
						</button>
						<button
							className="action-buttons"
							onClick={() => {
								setNetwork("devnet");
							}}
						>
							Switch to Devnet
						</button>
						<button
							className="action-buttons"
							disabled={!providerMut}
							onClick={async () => {
								invariant(providerMut, "providerMut");
								const txSig = await providerMut.connection.requestAirdrop(
									providerMut.wallet.publicKey,
									LAMPORTS_PER_SOL
								);
								await new PendingTransaction(
									providerMut.connection,
									txSig
								).wait();
								await refetchSOL();
							}}
						>
							Request 1 SOL
						</button>
						<button
							className="action-buttons"
							disabled={!providerMut}
							onClick={async () => {
								invariant(providerMut, "providerMut");
								const tx = await createInitMintInstructions({
									provider: providerMut,
									mintKP: Keypair.generate(),
									decimals: 9,
								});
								await tx.confirm();
								await refetchSOL();
							}}
						>
							Send Transaction
						</button>
					</div>
				</div>
			) : (
				<div className="rounded-md bg-blue-300 min-h-10 min-w-20 p-5 mt-20 text-xl">
					<p>Connect a wallet above.</p>
				</div>
			)}
		</section>
	);
}

export default Home;
