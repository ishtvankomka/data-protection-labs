export const alphabet: string = "АБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ 0123456789";

export function charToNumber(char: string): number {
    const index = alphabet.indexOf(char);
    if (index === -1) {
        throw new Error(`Character '${char}' not found in the alphabet.`);
    }
    return index + 1;
}

function numberToChar(number: number): string {
    const adjustedNumber = (number - 1) % alphabet.length;
    const modulo = adjustedNumber < 0 ? alphabet.length + adjustedNumber : adjustedNumber;
    return alphabet[modulo];
}

export function encryptRSA(plaintext: string, publicKey: number, modulus: number): number[] {
    const encryptedData: number[] = [];
    for (const char of plaintext) {
        const charNumber = charToNumber(char);
        const encryptedChar = BigInt(charNumber) ** BigInt(publicKey) % BigInt(modulus);
        encryptedData.push(Number(encryptedChar));
    }
    return encryptedData;
}

export function decryptRSA(encryptedData: number[], privateKey: number, modulus: number): string {
    let decryptedText = "";
    for (const encryptedChar of encryptedData) {
        const decryptedCharNumber = Number((BigInt(encryptedChar) ** BigInt(privateKey) % BigInt(modulus)).toString());
        const decryptedChar = numberToChar(decryptedCharNumber);
        decryptedText += decryptedChar;
    }
    return decryptedText;
}

function isPrime(n: number): boolean {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
}

function gcd(a: number, b: number): number {
    if (b === 0) return a;
    return gcd(b, a % b);
}

export function generateRSAKeys(p: number, q: number): { publicKey: number; privateKey: number; modulus: number } {
    if (!isPrime(p) || !isPrime(q)) {
        throw new Error("Both p and q must be prime numbers.");
    }

    const modulus = p * q;

    const phi = (p - 1) * (q - 1);

    let publicKey = 2;
    while (publicKey < phi && gcd(publicKey, phi) !== 1) {
        publicKey++;
    }

    let privateKey = 1;
    while ((privateKey * publicKey) % phi !== 1) {
        privateKey++;
    }

    return { publicKey, privateKey, modulus };
}