# Tx Receipt Frame 🧾

> 💬 **Try it:** Message `faucetbot.eth`

## Usage

Once the app is running, you can construct an URL with the following format:

```
http://localhost:3001/?txLink={txLink}&networkLogo={networkLogo}&amount={amount}&networkName={networkName}&tokenName={tokenName}
```

- `txLink`: Direct link to view the transaction.
- `networkLogo`: Image URL of the network's logo.
- `amount`: Transaction amount.
- `networkName`: Name of the blockchain network.
- `tokenName`: Name of the token involved.

## Development

To kickstart the tutorial, you'll need to clone the repository containing the bot code. Follow these steps:

```bash
git clone https://github.com/fabriguespe/tx-receipt-frame.git
cd tx-receipt-frame
# copy env variables template
cp .env.example .env
```

**Set the variables**

```bash
REDIS_CONNECTION_STRING= # redis string url
BASE_URL= # base url for the frame
```

> ⚠️ Bot kit is not compatible with `bun` yet. Use `npm` or `yarn`

```bash
# install dependencies
yarn install

# running the bot
yarn build
yarn start

# to run with hot-reload
yarn build:watch
yarn start:watch
```
