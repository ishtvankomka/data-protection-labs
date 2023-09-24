import React, { useEffect, useState } from 'react';

const alphabet: string = "абвгдеєжзиіїйклмнопрстуфхцчшщьюяАБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ -,.;!?";
const shift: number = 3;

const textToNumbers = (text: string): string => {
    let numbers: number[] = [];
    for (let i: number = 0; i < text.length; i++) {
        const alphabetNumber: number = alphabet.indexOf(text[i]) + 1;
        numbers.push(alphabetNumber);
    }
    return numbers.join(', ');
}

const encrypt = (text: string): string => {
    let encryptedText: string = "";

    for (let i: number = 0; i < text.length; i++) {
        const char: string = text[i];
        const charIndex: number = alphabet.indexOf(char);

        if (charIndex === -1) {
            encryptedText += text[i];
        } else {
            const newIndex: number = (charIndex + shift) % alphabet.length;
            const encryptedChar: string = alphabet[newIndex];
            encryptedText += encryptedChar;
        }
    }

    return encryptedText;
}

const decrypt = (encryptedText: string): string => {
    let decryptedText: string = "";

    for (let i: number = 0; i < encryptedText.length; i++) {
        const char: string = encryptedText[i];
        const charIndex: number = alphabet.indexOf(char);

        if (charIndex === -1) {
            decryptedText += encryptedText[i];
        } else {
            let newIndex: number = charIndex - shift;
            if (newIndex < 0) {
                newIndex += alphabet.length;
            }
            const decryptedChar: string = alphabet[newIndex];
            decryptedText += decryptedChar;
        }
    }

    return decryptedText;
}


export const Lab1: React.FC = () => {
    const [inputEncrypt, setInputEncrypt] = useState('')
    const [outputEncrypt, setOutputEncrypt] = useState('...')
    const [unicodeEncrypt, setUnicodeEncrypt] = useState('...')
    useEffect(() => {
        if (inputEncrypt.length) {
            const encrypted = encrypt(inputEncrypt)
            setOutputEncrypt(encrypted)
            setUnicodeEncrypt(textToNumbers(encrypted))
        } else {
            setOutputEncrypt('...')
            setUnicodeEncrypt('...')
        }
    }, [inputEncrypt])

    const [inputDecrypt, setInputDecrypt] = useState('')
    const [outputDecrypt, setOutputDecrypt] = useState('...')
    const [unicodeDecrypt, setUnicodeDecrypt] = useState('...')
    useEffect(() => {
        if (inputDecrypt.length) {
            const decrypted = decrypt(inputDecrypt)
            setOutputDecrypt(decrypted)
            setUnicodeDecrypt(textToNumbers(decrypted))
        } else {
            setOutputDecrypt('...')
            setUnicodeDecrypt('...')
        }
    }, [inputDecrypt])

    return (
        <div className='lab'>
            <h1>Lab 1</h1>
            <div className="container">
                <div className="sub-container">
                    <p className="headings">Encrypt: </p>
                    <input
                        type="text"
                        placeholder="Type here"
                        value={inputEncrypt}
                        onChange={(e) => { setInputEncrypt(e.target.value) }}
                    />
                </div>
                <div className="sub-container">
                    <p className="headings">Encrypted:</p>
                    <p>{outputEncrypt}</p>
                </div>
                <div className="sub-container">
                    <p className="headings">Charcodes:</p>
                    <p>{unicodeEncrypt}</p>
                </div>
            </div>
            <div className="container">
                <div className="sub-container">
                    <p className="headings">Decrypt: </p>
                    <input
                        type="text"
                        placeholder="Type here"
                        value={inputDecrypt}
                        onChange={(e) => { setInputDecrypt(e.target.value) }}
                    />
                </div>
                <div className="sub-container">
                    <p className="headings">Decrypted:</p>
                    <p>{outputDecrypt}</p>
                </div>
                <div className="sub-container">
                    <p className="headings">Charcodes:</p>
                    <p>{unicodeDecrypt}</p>
                </div>
            </div>
        </div>
    )
}