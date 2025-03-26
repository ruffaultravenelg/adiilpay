// Supported ?
export function isNFCReaderAvailable() {
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