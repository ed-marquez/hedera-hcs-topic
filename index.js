console.clear();

require("dotenv").config();

const { Client, AccountId, PrivateKey, TopicCreateTransaction, TopicMessageQuery, TopicMessageSubmitTransaction } = require("@hashgraph/sdk");

const network = process.env.NETWORK;
const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromStringECDSA(process.env.OPERATOR_KEY);
const client = Client.forNetwork(network).setOperator(operatorId, operatorKey);

async function main() {
	// // Create a new consensus topic
	const newTopic = await new TopicCreateTransaction().execute(client);
	const newTopicReceipt = await newTopic.getReceipt(client);
	const newTopicId = newTopicReceipt.topicId;
	console.log(`- Transaction status: ${newTopicReceipt.status.toString()} \n`);
	console.log(`- New Topic ID: ${newTopicId.toString()} \n`);

	// Wait 5 seconds between topic creation and subscription creation
	await new Promise((resolve) => setTimeout(resolve, 5000));

	// // Subscribe to the consensus topic
	new TopicMessageQuery().setTopicId(newTopicId).subscribe(client, null, (message) => {
		let messageAsString = Buffer.from(message.contents, "utf8").toString();
		console.log(`${message.consensusTimestamp.toDate()} Received: ${messageAsString}`);
	});

	// // Submit 10 messages to the new topic using a for loop
	for (let i = 0; i < 10; i++) {
		const newMessage = `Hello Hedera! #${i + 1}`;
		const newMessageTx = await new TopicMessageSubmitTransaction().setTopicId(newTopicId).setMessage(newMessage).execute(client);
	}

	// Check the topic messages on HashScan
	const hashscanUrl = `https://hashscan.io/${network}`;
	console.log(`- Check the topic messages on HashScan: \n ${hashscanUrl}/topic/${newTopicId.toString()} \n`);
}
main();
