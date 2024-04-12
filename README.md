# faucet-tx-frame

Frame that displays a receipt of a transaction with a generated image.

## 📦 installation

once you have cloned the repository, you can install the dependencies by running the following command:

```bash
npm install # using npm
yarn install # using yarn
pnpm install # using pnpm
bun install # using bun
```

## 🚀 usage

the first step is to setup the **environment variables** for the project:

```bash
cp .env.example .env
```

make sure to populate the `.env` file with the correct values:

```bash
BASE_URL= # deployed vercel url
PUBLIC_BOT_ADDRESS= # the address of the bot for deeplink with xmtp apps
REDIS_CONNECTION_STRING= # redis connection string for caching
```

once everything is ready, in order to start the development server you must run the following command:

```bash
npm run dev # using npm
yarn dev # using yarn
pnpm dev # using pnpm
bun dev # using bun
```

once the app is running, you can construct an URL with the following format:

```
url/?networkId={networkId}&txLink={txLink}
```

where:

- `{networkId}` network id
- `{txLink}` link of the transaction

## 📜 license

this project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
