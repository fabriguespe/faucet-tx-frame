import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import fs from "fs";
import { join } from "path";
import { getRedisClient } from "@/lib/redis";

export interface Network {
  networkId: string;
  networkName: string;
  networkLogo: string;
  tokenName: string;
  dripAmount: number;
  address: string;
  isERC20: boolean;
  erc20Address?: string;
  erc20Decimals?: number;
  isActive: boolean;
  balance: string;
}

const interFontPath = join(process.cwd(), "Inter-Regular.ttf");
const interFontData = fs.readFileSync(interFontPath);

const interSemiboldFontPath = join(process.cwd(), "Inter-SemiBold.ttf");
const interSemiboldFontData = fs.readFileSync(interSemiboldFontPath);

export async function GET(req: NextRequest) {
  const networkId = req.nextUrl.searchParams.get("networkId");
  const redisClient = await getRedisClient();
  const cachedSupportedNetworksData = await redisClient.get(
    "supported-networks"
  );
  if (!cachedSupportedNetworksData) {
    throw new Error("No supported networks found in cache");
  }
  const cachedSupportedNetworks = JSON.parse(cachedSupportedNetworksData);
  const network = cachedSupportedNetworks.supportedNetworks.find(
    (n: Network) => n.networkId === networkId
  );
  if (!network) {
    return new ImageResponse(
      (
        <div
          style={{
            alignItems: "center",
            background: "black",
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            height: "100%",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: 60,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              lineHeight: 1.4,
              marginTop: 30,
              padding: "0 120px",
              whiteSpace: "pre-wrap",
            }}
          >
            {`Invalid network!`}
          </div>
        </div>
      ),
      {
        width: 500,
        height: 500,
        fonts: [
          {
            data: interFontData,
            name: "Inter-SemiBold.ttf",
            style: "normal",
            weight: 400,
          },
        ],
      }
    );
  }
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "white",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          width: "100%",
          padding: "48px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
            }}
          >
            <img
              src={network.networkLogo!}
              style={{
                width: "40px",
              }}
            />
            <div style={{ fontSize: "20px" }}>{network.networkName}</div>
          </div>
          <div style={{ fontSize: "48px", display: "flex" }}>
            You just received{" "}
            <div
              style={{
                fontFamily: "Inter-SemiBold",
                display: "flex",
                marginLeft: "8px",
              }}
            >
              {" "}
              {network.dripAmount} {network.tokenName}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 955,
      height: 500,
      fonts: [
        {
          data: interFontData,
          name: "Inter-Regular",
        },
        {
          data: interSemiboldFontData,
          name: "Inter-SemiBold",
        },
      ],
    }
  );
}
