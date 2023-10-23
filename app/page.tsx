"use client";

import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CONTRACT_ADDRESS } from "~/constants/addresses";

export default function Home() {
  const address = useAddress();
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: counter, isLoading } = useContractRead(contract, "getCounter");
  const { data: owner, isLoading: ownerLoading } = useContractRead(
    contract,
    "owner"
  );
  const [numberOfCounter, setNumberOfCounter] = useState(0);

  useEffect(() => {
    setNumberOfCounter(+Number(counter).toFixed());
  }, [counter]);

  const isOwner = owner === address;

  return (
    <main className="bg-zinc-900 flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="p-4 w-[614px] rounded-lg flex flex-col items-center gap-2">
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col -gap-1">
            <h2 className="text-3xl font-bold text-white">Counter DApp</h2>
            <span className={`text-sm text-white font-medium ${address ? "flex" : "hidden"}`}>
              {ownerLoading ? "..." : isOwner ? owner : "You are not the owner of this contract."}
            </span>
            <span className={`text-sm text-white font-medium ${address ? "hidden" : "flex"}`}>
              Connect you wallet to interact with the counter.
            </span>
          </div>
          <ConnectWallet />
        </div>

        <div
          className={`mt-12 flex-row-reverse items-center gap-8 ${
            address ? "flex" : "hidden"
          }`}
        >
          <Web3Button
            className="!py-0 !px-0 !min-h-0 !min-w-0 !w-14 !h-14 !text-white !bg-gray-500 !font-semibold !text-3xl !rounded-full"
            contractAddress={CONTRACT_ADDRESS}
            action={(contract) => contract.call("increment")}
            onError={(error) => alert(error.message)}
            onSuccess={() => toast.success("Counter incremented 😁")}
          >
            +
          </Web3Button>
          <p className="text-white text-[48px] font-semibold">
            {isLoading ? "Loading..." : numberOfCounter}
          </p>
          <Web3Button
            className="!py-0 !px-0 !min-h-0 !min-w-0 !w-14 !h-14 !text-white !bg-gray-500 !font-semibold !text-3xl !rounded-full"
            contractAddress={CONTRACT_ADDRESS}
            action={(contract) => contract.call("decrement")}
            onError={(error) => alert(error.message)}
            onSuccess={() => toast.success("Counter decremented 😁")}
          >
            -
          </Web3Button>
        </div>
      </div>

      {isOwner && (
        <Web3Button
          contractAddress={CONTRACT_ADDRESS}
          action={(contract) => contract.call("reset")}
          onError={(error) => toast.error(error.message)}
          onSuccess={() => toast.success("Counter rested 😁")}
        >
          Reset Counter
        </Web3Button>
      )}
    </main>
  );
}
