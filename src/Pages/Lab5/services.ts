// Define the Feistel function (in this case, a simple XOR operation)
function feistelFunction(left: number, right: number, roundKey: number): [number, number] {
    const newLeft = right;
    const newRight = left ^ (right + roundKey);
    return [newLeft, newRight];
}

// Pad text to a multiple of blockLength
function padText(text: string, blockLength: number): string {
    const paddingLength = blockLength - (text.length % blockLength);
    if (paddingLength !== blockLength) {
        const padding = String.fromCharCode(paddingLength);
        return text + padding.repeat(paddingLength);
    }
    return text;
}

// Remove padding from text
function unpadText(text: string): string | null {
    const paddingLength = text.charCodeAt(text.length - 1);
    if (paddingLength >= 1 && paddingLength <= text.length) {
        return text.slice(0, -paddingLength);
    }
    return null; // Padding is invalid
}

// Encrypt function
export function feistelEncrypt(plaintext: string, numRounds: number, key: number): string {
    const blockLength = 2; // Feistel works on 2-character blocks
    let ciphertext = '';

    plaintext = padText(plaintext, blockLength);

    for (let i = 0; i < plaintext.length; i += blockLength) {
        let [left, right] = [plaintext.charCodeAt(i), plaintext.charCodeAt(i + 1)];

        for (let round = 0; round < numRounds; round++) {
            [left, right] = feistelFunction(left, right, key);
        }

        ciphertext += String.fromCharCode(left, right);
    }

    return ciphertext;
}

// Decrypt function
export function feistelDecrypt(ciphertext: string, numRounds: number, key: number): string {
    const blockLength = 2;
    let plaintext = '';

    for (let i = 0; i < ciphertext.length; i += blockLength) {
        let [left, right] = [ciphertext.charCodeAt(i), ciphertext.charCodeAt(i + 1)];

        for (let round = 0; round < numRounds; round++) {
            const roundKey = key; // Same key is used for decryption
            [right, left] = feistelFunction(right, left, roundKey);
        }

        const block = String.fromCharCode(left, right);
        plaintext += block;
    }

    const unpaddedText = unpadText(plaintext);
    if (unpaddedText !== null) {
        return unpaddedText;
    } else {
        console.error("Invalid padding");
        return ''; // Handle the error as needed
    }
}