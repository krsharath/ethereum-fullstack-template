import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { getURI, getFileData, getFileHash } from '../utils/common';

import 'react-toastify/dist/ReactToastify.css';

export default function ConsumerPage({ provider, contract }) {
  const [tokenURI, setTokenURI] = useState('');
  const [price, setPrice] = useState(1);
  const [medicineHash, setMedicineHash] = React.useState('');
  const [verified, setVerified] = React.useState(false);
  const [resultMessage, setResultMessage] = React.useState('');
  const [clickedVerify, setClickedVerify] = React.useState(false);

  useEffect(() => {
    if (!contract) {
      return;
    }
    provider.once('block', () => {
      contract.on('Transfer', onMintCompletion);
    });
  }, [contract]);

  const onMintCompletion = (fromAddress, toAddress, tokenId) => {
    toast.success(
      `🦄 NFT with tokenId ${tokenId} was successfully minted by $${toAddress}!`,
      {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
    setTokenURI('');
    setPrice(1);
  };

  const onVerify = () => {
    if (!medicineHash) {
      setClickedVerify(false);
      alert('Please Enter medicine Hash');
      return;
    }
    getURI(contract, medicineHash)
      .then((chainData) => {
        console.log(chainData);
        chainData.fileUrl
          ? getFileData(chainData.fileUrl).then((data) => {
              setClickedVerify(true);
              const fileHash = getFileHash(data);
              if (chainData.hash === fileHash) {
                setVerified(true);
                setResultMessage('Success!');
              } else {
                setVerified(false);
                setResultMessage('Failure!');
              }
            })
          : console.log('Token does not exist');
      })
      .catch((error) => {
        setClickedVerify(true);
        console.log(error);
        setVerified(false);
        setResultMessage('Token not found');
        console.log('Token Id does not exist');
      });
  };

  return (
    <div>
      <br />
      <br />
      <section className="text-gray-600 body-font">
        <div
          className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col"
          style={{ margin: 'auto' }}
        >
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Verify Medicine Data
          </h2>
          <div className="relative mb-4">
            <label className="leading-7 text-sm text-gray-600">
              Enter your Medicine#
            </label>
            <input
              type="text"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              value={medicineHash}
              onChange={(e) => setMedicineHash(e.target.value)}
            />
          </div>
          <button
            className="mt-4 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={onVerify}
          >
            Verify
          </button>
          {clickedVerify && (
            <div
              style={{
                height: 40,
                width: '50%',
                background: verified ? '#469621' : '#e30040',
                margin: '16px auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                color: '#ffffff',
                fontWeight: 'bold',
                borderRadius: 8,
              }}
            >
              {resultMessage}
            </div>
          )}
        </div>
      </section>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
