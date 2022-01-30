import { sha256 } from '@ethersproject/sha2';
import { ethers } from 'ethers';
import { Buffer } from 'buffer';

export const getSignedContract = (address, contractABI) => {
  const { ethereum } = window;

  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(address, contractABI, signer);
  }

  return null;
};

export const updateProviderAndContract = (
  address,
  contractABI,
  setProvider,
  setContract
) => {
  const { ethereum } = window;

  if (!ethereum) return;

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(address, contractABI, signer);

  setProvider(provider);
  setContract(contract);
};

export const checkIfWalletIsConnected = async (setCurrentAccount) => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      console.log('Make sure you have metamask!');
      return;
    } else {
      console.log('We have the ethereum object', ethereum);
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      setCurrentAccount(account.toLowerCase());
    }
  } catch (error) {
    console.log(error);
  }
};

export const connectWallet = async (setCurrentAccount) => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      alert('Get MetaMask!');
      return;
    }

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

    setCurrentAccount(accounts[0].toLowerCase());
  } catch (error) {
    console.log(error);
  }
};

// export const mintNft = async (contract, tokenURI, price) => {
//   try {
//     if (!contract) {
//       return;
//     }

//     const txn = await contract.mintNft(tokenURI, price);
//     await txn.wait();
//   } catch (error) {
//     console.log(error);
//   }
// };
export const mintNft = async (contract, tokenURI, medId, tokenHash) => {
  try {
    if (!contract) {
      return;
    }

    const txn = await contract.mintNft(tokenURI, medId, tokenHash);
    await txn.wait();
    console.log(`Hash record for medID ${medId} created `);
    alert(`Hash record for medID ${medId} created `);
  } catch (error) {
    console.log(error);
  }
};

export const buyNft = async (contract, tokenId, price) => {
  try {
    if (!contract) {
      return;
    }

    const txn = await contract.buyNft(tokenId, {
      value: ethers.utils.parseEther(price.toString()),
    });
    await txn.wait();
  } catch (error) {
    console.log(error);
  }
};
export const getURI = async (contract, medId) => {
  try {
    if (!contract) {
      return;
    }

    const URI = await contract.getURI(medId);
    // console.log(URI);
    return { fileUrl: URI[0], hash: URI[1] };
  } catch (error) {
    console.log(error);
  }
};

export const getFileData = (url) =>
  fetch(url)
    .then((response) => {
      if (response.ok) return response.blob();
      else {
        alert('Invalid File URL');
        throw Error;
      }
    })
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsArrayBuffer(blob);
        })
    )
    .catch((error) => {
      console.log(error);
      throw error;
    });

export const getFileHash = (fileData) => {
  const tempData = Buffer && Buffer.from(fileData);
  return sha256(tempData);
};
