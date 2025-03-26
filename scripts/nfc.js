// Supported ?
export function isNFCAvailable() {
	return 'NDEFReader' in window
}

// Read
export function readNFC() {
	return new Promise((resolve, reject) => {
		const ndef = new NDEFReader();
		ndef.scan().then((message) => {
			resolve(message);
		}).catch((error) => {
			reject(error);
		});
	});
}

// NFC stuff
export async function writeNFC(url) {
	try{
		const ndef = new NDEFReader();
		await ndef.write({ records: [{ recordType: "url", data: url }] });
	} catch (e){
		throw e;
	}
}