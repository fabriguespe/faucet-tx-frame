import { BASE_URL } from "@/lib/constants";
import { fetchMetadata } from "frames.js/next";
import { checksumAddress } from "viem";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ searchParams }: Props) {
  const metadata = await fetchMetadata(
    new URL(
      `/frame?txLink=${searchParams.txLink}&networkLogo=${searchParams.networkLogo}&amount=${searchParams.amount}&networkName=${searchParams.networkName}&tokenName=${searchParams.tokenName}`,
      process.env.BASE_URL || "http://localhost:3001"
    )
  );
  return {
    title: "Faucet Bot",
    other: {
      ...metadata,
    },
  };
}

export default function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { txLink, networkLogo, networkName, amount, tokenName } =
    searchParams as any;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-black">
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="text-3xl text-center font-black">Faucet Bot</div>
          <div className="text-lg text-center font-semibold">
            Bot for requesting faucet token in any network.
          </div>
        </div>
        {txLink && networkName && (
          <div className="flex flex-col items-center justify-center space-y-2">
            <img
              className="rounded-lg"
              width={500}
              src={`${BASE_URL}/api/image?networkLogo=${networkLogo}&amount=${amount}&networkName=${networkName}&tokenName=${tokenName}`}
            />
            <div>
              <button className="bg-white rounded-lg text-black p-2">
                <a target="_blank" href={txLink}>
                  View transaction
                </a>
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-col mt-8 space-y-4 justify-center items-center">
          <div className="flex flex-row space-x-2">
            <p className="text-center font-medium">
              <a
                target="_blank"
                className="text-red-600"
                href={`https://converse.xyz/dm/${process.env.PUBLIC_BOT_ADDRESS}`}
              >
                Converse
              </a>
            </p>
            <p>•</p>
            <p className="text-center font-medium">
              <a
                target="_blank"
                className="text-blue-600"
                href={`https://go.cb-w.com/messaging?address=${process.env.PUBLIC_BOT_ADDRESS}`}
              >
                Coinbase Wallet
              </a>
            </p>
          </div>
          <div className="flex flex-row space-x-4 justify-center items-center">
            <p className="text-center text-sm">powered by</p>
            <img
              className="max-w-full h-auto w-32 md:w-1/12"
              src="https://learnweb3.io/static/logos/LW3_Light_Full_Logo.png"
            />
          </div>
          <div>
            <p className="text-center text-sm mt-16">
              Made with ❤️ by{" "}
              <a className="text-green-500" href="https://builders.garden">
                builders.garden
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
