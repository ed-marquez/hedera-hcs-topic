console.clear();

const { PrivateKey } = require("@hashgraph/sdk");

async function main() {
	let newEvmAddressArray = [];
	let newAccountAliasArray = [];
	const numAccountsToCreate = 1;

	for (let i = 0; i < numAccountsToCreate; i++) {
		//Create the account alias
		const newPrivateKey = PrivateKey.generateECDSA();
		const newPublicKey = newPrivateKey.publicKey;
		const newEvmAddress = newPublicKey.toEvmAddress();
		const newAccountAlias = newPublicKey.toAccountId(0, 0);

		newEvmAddressArray.push(newEvmAddress);
		newAccountAliasArray.push(newAccountAlias);

		console.log(`- New private key (DER Encoded): ${newPrivateKey} \n`);
		console.log(`- New public key (DER Encoded): ${newPublicKey} \n`);
		console.log(`- New EVM Address: 0x${newEvmAddress} \n`);
		// console.log(`- New account alias: ${newAccountAlias} \n`);
		// console.log(`- New private key (RAW): 0x${newPrivateKey.toStringRaw()} \n`);
		// console.log(`- New public key (RAW): 0x${newPublicKey.toStringRaw()} \n`);
		console.log(`============================================================ \n`);
	}
}
main();
