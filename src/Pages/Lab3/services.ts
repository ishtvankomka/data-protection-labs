export const alphabet: string = "АБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ 0123456789";

// Function to convert a character to a number
export function charToNumber(char: string): number {
    const index = alphabet.indexOf(char);
    if (index === -1) {
        throw new Error(`Character '${char}' not found in the alphabet.`);
    }
    // Map the index to the range 1 to alphabet.length + 1
    return index + 1;
}

// Function to convert a number to a character
function numberToChar(number: number): string {
    // Map the number from 1 to alphabet.length + 1 back to the alphabet
    const adjustedNumber = (number - 1) % alphabet.length;
    const modulo = adjustedNumber < 0 ? alphabet.length + adjustedNumber : adjustedNumber;
    return alphabet[modulo];
}

// RSA encryption function
export function encryptRSA(plaintext: string, publicKey: number, modulus: number): number[] {
    const encryptedData: number[] = [];
    for (const char of plaintext) {
        const charNumber = charToNumber(char);
        const encryptedChar = BigInt(charNumber) ** BigInt(publicKey) % BigInt(modulus);
        encryptedData.push(Number(encryptedChar));
    }
    return encryptedData;
}

// RSA decryption function
export function decryptRSA(encryptedData: number[], privateKey: number, modulus: number): string {
    let decryptedText = "";
    for (const encryptedChar of encryptedData) {
        const decryptedCharNumber = Number((BigInt(encryptedChar) ** BigInt(privateKey) % BigInt(modulus)).toString());
        const decryptedChar = numberToChar(decryptedCharNumber);
        decryptedText += decryptedChar;
    }
    return decryptedText;
}


// Function to check if a number is prime (replace with your actual prime-checking logic)
function isPrime(n: number): boolean {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
}

// Function to find the greatest common divisor (GCD) of two numbers
function gcd(a: number, b: number): number {
    if (b === 0) return a;
    return gcd(b, a % b);
}

// Function to generate RSA keys based on p and q
export function generateRSAKeys(p: number, q: number): { publicKey: number; privateKey: number; modulus: number } {
    // Check if p and q are prime
    if (!isPrime(p) || !isPrime(q)) {
        throw new Error("Both p and q must be prime numbers.");
    }

    // Calculate modulus
    const modulus = p * q;

    // Calculate Euler's totient function
    const phi = (p - 1) * (q - 1);

    // Find public key (e) - typically a small prime number
    let publicKey = 2;
    while (publicKey < phi && gcd(publicKey, phi) !== 1) {
        publicKey++;
    }

    // Find private key (d) using the extended Euclidean algorithm
    let privateKey = 1;
    while ((privateKey * publicKey) % phi !== 1) {
        privateKey++;
    }

    return { publicKey, privateKey, modulus };
}

// Example usage
const p = 13; // Replace with your prime numbers
const q = 41; // Replace with your prime numbers

const keys = generateRSAKeys(p, q);
console.log("Public Key:", keys.publicKey);
console.log("Private Key:", keys.privateKey);
console.log("Modulus:", keys.modulus);


// Example usage
const publicKey = keys.publicKey; // You should replace these with your actual RSA keys
const privateKey = keys.privateKey; // You should replace these with your actual RSA keys
const modulus = keys.modulus;

const plaintext = "СБОР21";
const encryptedData = encryptRSA(plaintext, publicKey, modulus);
const decryptedText = decryptRSA([191, 139, 117, 270, 458, 346, 1, 79], privateKey, modulus);

console.log("Original Text:", plaintext);
console.log("Encrypted Data:", encryptedData);
console.log("Decrypted Text:", decryptedText);
