# Hedera EVM Address Generator and Topic Message Submitter

This repository provides an example of:

- Generating an EVM address on the Hedera network
- Funding the address with HBAR using the [Hedera Testnet faucet](https://portal.hedera.com/faucet)
- Creating a new consensus topic on Hedera, submitting messages to that topic, and inspecting the messages on [HashScan](https://hashscan.io/)

## Prerequisites

- Node.js

## Installation

### Try it in GitPod (Recommended):

- Click [here](https://gitpod.io/?autostart=true#https://github.com/ed-marquez/hedera-hcs-topic)

### Try it locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/ed-marquez/hedera-hcs-topic
   cd hedera-hcs-topic
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

## Steps to Execute

1. **Generate EVM Address and Keys:**

   Run the `key_evm_generator.js` script to generate a new set of ECDSA keys and associated EVM address.

   ```bash
   node key_evm_generator.js
   ```

   The output will include the new EVM address and keys. Note these values.

2. **Store Credentials:**

   In the root directory of the project, rename the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

   and store the credentials

   ```plaintext
   NETWORK=testnet
   OPERATOR_ID=<your-account-id>
   OPERATOR_KEY=<your-private-key>
   ```

3. **Fund your EVM Address:**

   Transfer testnet HBAR to the generated EVM address using the Hedera Testnet faucet at [Hedera Faucet](https://portal.hedera.com/faucet). This will create the actual Hedera account.

4. **Submit Messages to a Topic:**

   Run the `index.js` script to create a new topic and submit messages to it.

   ```bash
   node index.js
   ```

   The output will include the new topic ID and a URL to check the topic messages on [HashScan](https://hashscan.io/).

## Additional Information

- **HashScan:** You can monitor your topic and messages on HashScan by visiting the URL provided in the script output.
- **Hedera SDK Documentation:** For more details, refer to the [Hedera SDK Documentation](https://docs.hedera.com/hedera/sdks-and-apis/sdks).

## License

This project is licensed under the MIT License.
