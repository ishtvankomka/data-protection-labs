import React, { useEffect, useState } from 'react';
import { decryptRSA, encryptRSA, generateRSAKeys } from './services';

export const Lab3: React.FC = () => {
    const p = 13;
    const q = 41;

    const [modulus, setModulus] = useState<number>()
    const [publicKey, setPublicKey] = useState<number>()
    const [privateKey, setPrivateKey] = useState<number>()

    useEffect(() => {
        const { publicKey: public_key, privateKey: private_key, modulus: modulus_val } = generateRSAKeys(p, q)
        setModulus(modulus_val)
        setPublicKey(public_key)
        setPrivateKey(private_key)
    }, [])

    const [inputEncrypt, setInputEncrypt] = useState('')
    const [outputEncrypt, setOutputEncrypt] = useState('...')
    useEffect(() => {
        if (inputEncrypt.length && publicKey && modulus) {
            const encrypted = encryptRSA(inputEncrypt, publicKey, modulus)
            setOutputEncrypt(encrypted.toString())
        } else {
            setOutputEncrypt('...')
        }
    }, [inputEncrypt, publicKey, modulus])


    const [inputDecrypt, setInputDecrypt] = useState('')
    const [outputDecrypt, setOutputDecrypt] = useState('...')
    useEffect(() => {
        if (inputDecrypt.length && privateKey && modulus) {
            const formatInputDescrypt = (input: string) => {
                const numbersArray = input.replaceAll(',', ' ').replaceAll('  ', ' ').split(' ')
                    .map((e: string) => Number(e))
                    .filter((e) => e)
                return numbersArray
            }
            const formattedDecrypt = formatInputDescrypt(inputDecrypt)
            const decrypted = decryptRSA(formattedDecrypt, privateKey, modulus)
            setOutputDecrypt(decrypted)
        } else {
            setOutputDecrypt('...')
        }
    }, [inputDecrypt, privateKey, modulus])

    return (
        <div className='lab'>
            <h1>Lab 3</h1>
            <div className='lab-task'>
                <h2>Task 1</h2>
                <div className="container">
                    <div className="sub-container">
                        <p className="headings">Public key:</p>
                        <p>{publicKey}</p>
                    </div>
                    <div className="sub-container">
                        <p className="headings">Private key:</p>
                        <p>{privateKey}</p>
                    </div>
                </div>
            </div>
            <div className='lab-task'>
                <h2>Task 2</h2>
                <div className="container">
                    <div className="sub-container">
                        <p className="headings">Encrypt: </p>
                        <input
                            type="text"
                            placeholder="Type here"
                            value={inputEncrypt}
                            onChange={(e) => { setInputEncrypt(e.target.value.toUpperCase()) }}
                        />
                    </div>
                    <div className="sub-container">
                        <p className="headings">Encrypted:</p>
                        <p>{outputEncrypt}</p>
                    </div>
                </div>
            </div>

            <div className='lab-task'>
                <h2>Task 3</h2>
                <div className="container">
                    <div className="sub-container">
                        <p className="headings">Decrypt: </p>
                        <input
                            type="text"
                            placeholder="Type here"
                            value={inputDecrypt}
                            onChange={(e) => { setInputDecrypt(e.target.value.replace(/[^0-9,]/g, '')) }}
                        />
                    </div>
                    <div className="sub-container">
                        <p className="headings">Decrypted:</p>
                        <p>{outputDecrypt}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}