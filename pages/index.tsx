import type { NextPage } from 'next'
import Head from 'next/head'
import { Disclosure } from '@headlessui/react'
import { 
  CogIcon,
  GlobeIcon,
  ChevronUpIcon
} from '@heroicons/react/outline'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Authereum from "authereum";
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import toast, { Toaster } from 'react-hot-toast'
import abi from '../abi.json'

const BlockChainIcon = () => {
  return (
    <svg className='w-20 h-20 text-white' fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 109.06 122.88"><path d="M34.43 47.86L52.8 37.6V18.31a9.233 9.233 0 01-5.46-3.16L17.91 32.18c.35.98.54 2.03.54 3.13 0 .92-.13 1.8-.38 2.64l16.36 9.91zm11.35-35.38a9.231 9.231 0 01-.59-3.25c0-2.55 1.03-4.86 2.7-6.53S51.87 0 54.42 0c2.55 0 4.86 1.03 6.53 2.7a9.205 9.205 0 012.7 6.53c0 1.12-.2 2.19-.56 3.18l29.57 17.1c.21-.25.42-.5.65-.73a9.205 9.205 0 016.53-2.7c2.55 0 4.86 1.03 6.53 2.7a9.205 9.205 0 012.7 6.53c0 2.55-1.03 4.85-2.7 6.52a9.194 9.194 0 01-5.32 2.62v33.91c2.07.27 3.92 1.22 5.32 2.62 1.67 1.67 2.7 3.98 2.7 6.52a9.222 9.222 0 01-9.23 9.23 9.205 9.205 0 01-7.15-3.39l-29.61 17.12c.36.99.56 2.06.56 3.18 0 2.55-1.03 4.86-2.7 6.53a9.205 9.205 0 01-6.53 2.7c-2.55 0-4.86-1.03-6.53-2.7s-2.7-3.98-2.7-6.53c0-1.14.21-2.24.59-3.25L16.35 93.38a9.205 9.205 0 01-7.13 3.36c-2.55 0-4.86-1.03-6.53-2.7C1.03 92.37 0 90.06 0 87.51s1.03-4.85 2.7-6.52a9.242 9.242 0 015.25-2.62V44.44a9.18 9.18 0 01-5.25-2.62A9.164 9.164 0 010 35.3c0-2.55 1.03-4.86 2.7-6.53a9.205 9.205 0 016.53-2.7 9.205 9.205 0 017.16 3.4l29.39-16.99zm15.76 2.61a9.192 9.192 0 01-5.55 3.23V37.6l18.33 10.62 16.85-9.74c-.37-.99-.56-2.07-.56-3.18 0-1.08.19-2.13.53-3.09l-29.6-17.12zm36.69 29.3a9.159 9.159 0 01-4.92-2.56c-.19-.19-.37-.38-.54-.59l-16.82 9.72v20.78l16.89 9.75c.15-.17.3-.34.46-.5a9.194 9.194 0 014.92-2.56V44.39h.01zm-7.07 46.27c-.36-.98-.55-2.04-.55-3.14 0-1.16.21-2.27.61-3.3l-16.34-9.43-18.89 10.98v18.79a9.192 9.192 0 015.55 3.23l29.62-17.13zm-43.82 17.06a9.233 9.233 0 015.46-3.16V85.68l-18.96-11-16.09 9.29c.45 1.09.71 2.29.71 3.55 0 1.12-.2 2.19-.56 3.18l29.44 17.02zM10.76 78.41c1.93.32 3.66 1.25 4.99 2.58.1.1.19.2.28.3l16.39-9.46V50.36L16.64 40.8c-.27.37-.57.71-.89 1.03a9.255 9.255 0 01-4.99 2.58v34zM9.24 41.34c.04 0 .08-.01.12-.01h.08a6 6 0 004.06-1.76 6.023 6.023 0 001.77-4.27c0-1.67-.68-3.18-1.77-4.27-1.09-1.09-2.6-1.77-4.27-1.77s-3.18.68-4.27 1.77a6.023 6.023 0 00-1.77 4.27c0 1.67.68 3.18 1.77 4.27a6.03 6.03 0 004.28 1.77zm49.44 68.05a6.023 6.023 0 00-4.27-1.77c-1.67 0-3.18.68-4.27 1.77-1.09 1.09-1.77 2.6-1.77 4.27s.68 3.18 1.77 4.27 2.6 1.77 4.27 1.77c1.67 0 3.18-.68 4.27-1.77 1.09-1.09 1.77-2.6 1.77-4.27s-.67-3.18-1.77-4.27zm0-104.43a6.023 6.023 0 00-4.27-1.77c-1.67 0-3.18.68-4.27 1.77s-1.77 2.6-1.77 4.27c0 1.67.68 3.18 1.77 4.27a6.023 6.023 0 004.27 1.77c1.67 0 3.18-.68 4.27-1.77a6.023 6.023 0 001.77-4.27c0-1.67-.67-3.18-1.77-4.27zm45.42 78.29a6.023 6.023 0 00-4.27-1.77c-1.67 0-3.18.68-4.27 1.77a6.023 6.023 0 00-1.77 4.27c0 1.67.68 3.18 1.77 4.27a6.023 6.023 0 004.27 1.77c1.67 0 3.18-.68 4.27-1.77a6.023 6.023 0 001.77-4.27c0-1.67-.67-3.18-1.77-4.27zm-90.6 0c-1.09-1.09-2.6-1.77-4.27-1.77s-3.18.68-4.27 1.77a6.023 6.023 0 00-1.77 4.27c0 1.67.68 3.18 1.77 4.27s2.6 1.77 4.27 1.77 3.18-.68 4.27-1.77a6.023 6.023 0 001.77-4.27 6.065 6.065 0 00-1.77-4.27zm80.95-45.22c.08.08.14.18.2.28.06.1.1.2.14.31.23.34.49.66.77.95a6.023 6.023 0 004.27 1.77c1.67 0 3.18-.68 4.27-1.77a6.023 6.023 0 001.77-4.27c0-1.67-.68-3.18-1.77-4.27a6.023 6.023 0 00-4.27-1.77c-1.67 0-3.18.68-4.27 1.77a6.023 6.023 0 00-1.77 4.27c.01.99.25 1.91.66 2.73zM35.41 71.49a1.687 1.687 0 01.43.88l17.13 10.07V62.56L35.41 52.11v19.38zm37.56-19.11L55.96 62.57v19.89l17.01-10.05V52.38zM54.39 39.99l-16.6 9.93 16.69 10.05 16.21-9.84-16.3-10.14z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
  )
}

const INFURA_ID = '460f40a260564ac4a4f4b3fffb032dad'

const Cards = [
  {
    icon: '/images/car.png',
    text: `
    Transportation for Loot Adventures.`,
    link: ''
  },
  {
    icon: '/images/art.png',
    text: `Art for everyone.`,
    link: ''
  },
  {
    icon: '/images/link.png',
    text: `All on-chain.`,
    link: ''
  }
]

const Twitter = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#fff" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
  )
}

const OpenSea = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 90 90" fill="none">
      <path d="M45 0C20.151 0 0 20.151 0 45C0 69.849 20.151 90 45 90C69.849 90 90 69.849 90 45C90 20.151 69.858 0 45 0ZM22.203 46.512L22.392 46.206L34.101 27.891C34.272 27.63 34.677 27.657 34.803 27.945C36.756 32.328 38.448 37.782 37.656 41.175C37.323 42.57 36.396 44.46 35.352 46.206C35.217 46.458 35.073 46.71 34.911 46.953C34.839 47.061 34.713 47.124 34.578 47.124H22.545C22.221 47.124 22.032 46.773 22.203 46.512ZM74.376 52.812C74.376 52.983 74.277 53.127 74.133 53.19C73.224 53.577 70.119 55.008 68.832 56.799C65.538 61.38 63.027 67.932 57.402 67.932H33.948C25.632 67.932 18.9 61.173 18.9 52.83V52.56C18.9 52.344 19.08 52.164 19.305 52.164H32.373C32.634 52.164 32.823 52.398 32.805 52.659C32.706 53.505 32.868 54.378 33.273 55.17C34.047 56.745 35.658 57.726 37.395 57.726H43.866V52.677H37.467C37.143 52.677 36.945 52.299 37.134 52.029C37.206 51.921 37.278 51.813 37.368 51.687C37.971 50.823 38.835 49.491 39.699 47.97C40.284 46.944 40.851 45.846 41.31 44.748C41.4 44.55 41.472 44.343 41.553 44.145C41.679 43.794 41.805 43.461 41.895 43.137C41.985 42.858 42.066 42.57 42.138 42.3C42.354 41.364 42.444 40.374 42.444 39.348C42.444 38.943 42.426 38.52 42.39 38.124C42.372 37.683 42.318 37.242 42.264 36.801C42.228 36.414 42.156 36.027 42.084 35.631C41.985 35.046 41.859 34.461 41.715 33.876L41.661 33.651C41.553 33.246 41.454 32.868 41.328 32.463C40.959 31.203 40.545 29.97 40.095 28.818C39.933 28.359 39.753 27.918 39.564 27.486C39.294 26.82 39.015 26.217 38.763 25.65C38.628 25.389 38.52 25.155 38.412 24.912C38.286 24.642 38.16 24.372 38.025 24.111C37.935 23.913 37.827 23.724 37.755 23.544L36.963 22.086C36.855 21.888 37.035 21.645 37.251 21.708L42.201 23.049H42.219C42.228 23.049 42.228 23.049 42.237 23.049L42.885 23.238L43.605 23.436L43.866 23.508V20.574C43.866 19.152 45 18 46.413 18C47.115 18 47.754 18.288 48.204 18.756C48.663 19.224 48.951 19.863 48.951 20.574V24.939L49.482 25.083C49.518 25.101 49.563 25.119 49.599 25.146C49.725 25.236 49.914 25.38 50.148 25.56C50.337 25.704 50.535 25.884 50.769 26.073C51.246 26.46 51.822 26.955 52.443 27.522C52.605 27.666 52.767 27.81 52.92 27.963C53.721 28.71 54.621 29.583 55.485 30.555C55.728 30.834 55.962 31.104 56.205 31.401C56.439 31.698 56.7 31.986 56.916 32.274C57.213 32.661 57.519 33.066 57.798 33.489C57.924 33.687 58.077 33.894 58.194 34.092C58.554 34.623 58.86 35.172 59.157 35.721C59.283 35.973 59.409 36.252 59.517 36.522C59.85 37.26 60.111 38.007 60.273 38.763C60.327 38.925 60.363 39.096 60.381 39.258V39.294C60.435 39.51 60.453 39.744 60.471 39.987C60.543 40.752 60.507 41.526 60.345 42.3C60.273 42.624 60.183 42.93 60.075 43.263C59.958 43.578 59.85 43.902 59.706 44.217C59.427 44.856 59.103 45.504 58.716 46.098C58.59 46.323 58.437 46.557 58.293 46.782C58.131 47.016 57.96 47.241 57.816 47.457C57.609 47.736 57.393 48.024 57.168 48.285C56.97 48.555 56.772 48.825 56.547 49.068C56.241 49.437 55.944 49.779 55.629 50.112C55.449 50.328 55.251 50.553 55.044 50.751C54.846 50.976 54.639 51.174 54.459 51.354C54.144 51.669 53.892 51.903 53.676 52.11L53.163 52.569C53.091 52.641 52.992 52.677 52.893 52.677H48.951V57.726H53.91C55.017 57.726 56.07 57.339 56.925 56.61C57.213 56.358 58.482 55.26 59.985 53.604C60.039 53.541 60.102 53.505 60.174 53.487L73.863 49.527C74.124 49.455 74.376 49.644 74.376 49.914V52.812V52.812Z" fill="white"/>
    </svg>
  )
}

const Discord = () => {
  return (
    <svg width="40" height="40" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0)">
      <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="#ffffff"/>
      </g>
      <defs>
      <clipPath id="clip0">
      <rect width="71" height="55" fill="white"/>
      </clipPath>
      </defs>
    </svg>
  )
}


const Home: NextPage = () => {
  const [address, setAddress] = useState()
  const [provider, setProvider] = useState<any>()
  const [signer, setSigner] = useState<any>()
  const [tokenId, setTokenId] = useState<number>()

  const CONTRACT_ADDRESS = "0x84B358d1DCEdeC62750dBB05EA4Da2E6e9eDc18c";

  const connectETH = async () => {
		const providerOptions = {
			walletconnect: {
				package: WalletConnectProvider, // required
				options: {
					infuraId: INFURA_ID, // required
				}
			},
			authereum: {
				package: Authereum // required
			}
		}

		const web3modal = new Web3Modal({
      providerOptions,
		})

    let toastId = toast.loading('Connecting your Wallet')

		try {
      const provider = await web3modal.connect()
      const ethProvider = new ethers.providers.Web3Provider(provider)
			setProvider(ethProvider)

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13881' }],
      });

      toast.dismiss(toastId)
      toast.success('Connected to your Wallet')
			return provider
		} catch (e) {
      toast.dismiss(toastId)
      toast.error('Cannot Connect to your Wallet')
			console.log(e)
		}
	}

  const storeAddress = async () => {
    if(provider) {
      const signer = await provider.getSigner()
      console.log(signer)
      setAddress(await signer.getAddress())
      setSigner(signer)
    }
  }

  useEffect(() => {
    storeAddress()
  }, [provider])

  useEffect(() => console.log(address), [address])

  const mint = async() => {
    let toastId = toast.loading('Minting NFT')
    try {
      console.log(tokenId, signer, address, provider)
      if(!signer || !address || !provider) {
        toast.dismiss(toastId)
        toast.error('Connect your wallet')
        return
      }
      if(!tokenId) {
        toast.dismiss(toastId)
        toast.error('Enter a Token Id')
        return
      }
      
      // Contract Code Starts
      try {
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
        let tx1 = await contract.mint(tokenId, {value: ethers.utils.parseEther("0")});
        await tx1.wait();
        toast.dismiss(toastId)
        toast.custom(<div className='bg-white text-gray-700 font-inter duration-300 p-3 rounded-xl'>
          Successfully Minted NFT - <a className='text-blue-700 text-underline' href={`https://testnets.opensea.io/assets/mumbai/${CONTRACT_ADDRESS}/${tokenId.toString()}`}>Opensea Link</a>
        </div>, {
          duration: 10000
        })
      } catch (err) {
        console.log(err)
        toast.dismiss(toastId)
        toast.error("Can't mint your NFT")
      }
    } catch (e) {}
      
  }

  return (
    <div style={{ backgroundImage: `linear-gradient(to bottom, rgb(238,238,238, 0.2), rgb(0,0,0,0.2), rgb(0,0,0,0.5)),url('/images/bg.png')`, backgroundColor: 'gray', backgroundSize: 'cover' }} className="flex min-h-screen flex-col items-center justify-center text-white">
      <Head>
        <title>Loot Travel</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" /> 

      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center md:px-20 text-center">
        <div className="w-full min-h-screen flex flex-col justify-start items-center px-5 md:px-16 py-16 space-y-20">
          <div className="w-full h-1/3 flex justify-between items-center">
            <div className="flex justify-center items-center text-center space-x-3">
              <img src="/images/logo.png" className='w-10 h-10' alt="" />
              <h1 className='font-poppins font-semibold text-xl md:text-4xl'>Loot Travel</h1>
            </div>
            {!address && 
              <button onClick={() => connectETH()} className='flex flex-col justify-center items-center text-center px-4 py-1 md:px-8 md:py-2 bg-black/40 rounded-full'>
                <p className='text-lg md:text-2xl'>Connect</p>
              </button>
            }
            {address && 
              <button className='flex flex-col justify-center items-center text-center px-8 py-5 bg-gray-500 rounded-full border-2 border-white'>
                <p className='w-20 truncate text-lg md:text-2xl'>{address}</p>
              </button>
            }
          </div>
          <div className="w-11/12 md:w-1/2 h-full flex flex-col justify-center items-center space-y-10">
            <h1 className='w-full font-poppins font-bold text-xl md:text-4xl'>The Art of movement. <br />Travel NFTs for the Lootverse.</h1>
            <div className='w-full flex flex-col justify-center items-center space-y-3'>
              <input value={tokenId} onChange={(e) => setTokenId(Number(e.target.value))} type="number" name="tokenId" placeholder='Enter tokenId' className='w-full bg-black/20 p-2 md:p-5 placeholder rounded-full text-center text-white' required />
              <p className='text-center text-white font-poppins pb-5'>(A random number between 1-9999)</p>
              <button onClick={() => mint()} className='font-poppins text-lg md:text-xl px-10 py-2 bg-white hover:text-blue-900 duration-200 text-black rounded-full'>MINT</button>
            </div>
        </div>
        <div className="w-11/12 flex flex-col md:flex-row space-y-5 md:space-y-0 justify-center md:justify-between items-center">
          {Cards.map(card => {
            return <a href={card.link} className="w-full h-full flex justify-start items-center flex-col space-y-5">
              <img src={card.icon} className='w-fit h-fit' />
              <h1 className='w-full text-lg md:text-xl text-center font-bold'>{card.text}</h1>
            </a>
          })}
        </div>
        <div>
          <h1 className='font-poppins text-xl md:text-3xl'>9999 exclusive randomized text-only NFTs.</h1>
        </div>
        <div className="w-8/12 md:w-1/2 flex justify-between items-center">
          <Twitter />
          <OpenSea />
          <Discord />
        </div>
      </div>
      </main>
      
      <main className="flex w-full flex-1 flex-col items-start justify-center px-5 md:px-20 font-poppins space-y-5">
        <div className="w-full h-full bg-black/70 rounded-3xl p-10 md:p-20 space-y-3">
          <h1 className='text-3xl font-bold text-[#918378] mb-4'>ABOUT LOOT TRAVEL</h1>
          <p className='text-justify'>Like you, we love the story of the Lootverse. Adventure is the spirit of Lootverse, and what’s adventure without exploration! Exploration requires means of travel and this is exactly what Loot Travel brings to the Lootverse. 

          Lootverse is a world where imagination flies wild and adventure rides high – and Loot Travel is no less! All the modes of travel a.k.a we have created are inspired by mythology, movies and folklore – opening endless possibilities for exploration and storytelling in the realms of the Lootverse. 
          
          In line with the vision of the original Loot Project, Loot Travel is open to imagination, giving room for art and creativity to flow in – our main reason to make this NFT text-only is so you can visualize it the way you want and build on what we did. 

          Artists can Imagine, visualize, create and manifest the Loot Travel whichever way they want!
          </p>
        </div>
        <div className="w-full h-full bg-white rounded-3xl p-10 md:p-20 space-y-3 flex flex-col md:flex-row justify-between items-center">
          <div className="w-full md:w-1/2">
            <h1 className='text-3xl font-bold text-[#517875] mb-4'>ELEMENTS</h1>
            <p className='text-black text-justify'>Everything is possible in Loot Travel - From space to flight to terrestrial to water to underground movement. Each NFT consists of the following components:</p>
          </div>
          <img src="/nft.svg" alt="" className='w-72 p-5 border border-5 border-black rounded-xl' />
        </div>
        <div className="w-full h-full bg-black/70 rounded-3xl p-10 md:p-20 space-y-3 flex flex-col md:flex-row justify-between items-center">
          <div className="w-full md:w-1/2">
            <h1 className='text-3xl font-bold text-[#918378] mb-4'>COMPONENTS</h1>
            <div className="w-full  text-justify">
              <Disclosure defaultOpen={true}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex p-5 items-center justify-between w-full px-4 py-2 mb-2 text-sm font-medium text-left">
                      <span className='text-lg'>Vehicles #</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } w-5 h-5 text-white`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="text-left px-4 pt-4 pb-2 text-md text-white">
                      A unique serial number for each NFT.
                      Vehicles
                      <div className='px-10'>
                        <br />
                        <ul className='list-disc'>
                          <li>Millennium Falcon</li>
                          <li>Sling Ring</li>
                          <li>Nimbus 2000 Broomstick</li>
                          <li>Pegasus</li>
                          <li>Flying Carpet</li>
                          <li>Swan Boat</li>
                          <li>2-headed Sea Snake</li>
                          <li>Sail Fish</li>
                          <li>Four-horse chariot</li>
                          <li>Cheetah</li>
                          <li>Elephant</li>
                          <li>Giant Ant</li>
                        </ul>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex p-5 items-center justify-between w-full px-4 py-2 mb-2 text-sm font-medium text-left">
                      <span className='text-lg'>Rarity #</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } w-5 h-5 text-white`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="text-left px-4 pt-4 pb-2 text-md text-white">
                      <ul className='px-10 list-disc'>
                        <li>Common</li>
                        <li>Epic</li>
                        <li>Legendary</li>
                        <li>Mythic</li>
                      </ul>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex p-5 items-center justify-between w-full px-4 py-2 mb-2 text-sm font-medium text-left">
                      <span className='text-lg'>Speed #</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } w-5 h-5 text-white`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="text-left px-4 pt-4 pb-2 text-md text-white">
                      <ul className='px-10 list-disc'>
                        <li>Blink of an eye</li>
                        <li>Super Fast</li>
                        <li>Fast</li>
                        <li>Medium</li>
                        <li>Slow</li>
                        <li>Slug</li>
                      </ul>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex p-5 items-center justify-between w-full px-4 py-2 mb-2 text-sm font-medium text-left">
                      <span className='text-lg'>Special Powers #</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } w-5 h-5 text-white`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="text-left px-4 pt-4 pb-2 text-md text-white">
                      <ul className='px-10 list-disc'>
                        <li>Spit-fire</li>
                        <li>Shape-shifting</li>
                        <li>Indestructible</li>
                        <li>Cannon-shooting</li>
                        <li>Shielding</li>
                        <li>Disappearance</li>
                        <li>Self-Healing</li>
                        <li>Camouflage</li>
                      </ul>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex p-5 items-center justify-between w-full px-4 py-2 mb-2 text-sm font-medium text-left">
                      <span className='text-lg'>Secret Metal Ingredient #</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } w-5 h-5 text-white`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="text-left px-4 pt-4 pb-2 text-md text-white">
                      <ul className='px-10 list-disc'>
                        <li>Neodymium</li>
                        <li>Cerium</li>
                        <li>Scandium</li>
                        <li>Europium</li>
                        <li>Holmium</li>
                        <li>Erbium</li>
                        <li>Lutetium</li>
                      </ul>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex p-5 items-center justify-between w-full px-4 py-2 mb-2 text-sm font-medium text-left">
                      <span className='text-lg'>Color #</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } w-5 h-5 text-white`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="text-left px-4 pt-4 pb-2 text-md text-white">
                      <ul className='px-10 list-disc'>
                        <li>Gold</li>
                        <li>Silver</li>
                        <li>Fire</li>
                        <li>Water</li>
                        <li>Leaf</li>
                        <li>Cloud</li>
                        <li>Sky</li>
                        <li>Desert</li>
                        <li>Flower Pink</li>
                        <li>Jet Black</li>
                        <li>Sapphire</li>
                        <li>Ocean Blue</li>
                        <li>Blood Red</li>
                        <li>Rainbow</li>
                        <li>Elephant Grey</li>
                        <li>Crocodile Green</li>
                        <li>Military Green</li>
                        <li>Grass Green</li>
                        <li>Winter White</li>
                        <li>Earth Brown</li>
                      </ul>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
          <img src="/images/car2.png" alt="" className='w-72 p-5 border border-5 border-black rounded-xl' />
        </div>
        <div className="w-full h-full bg-white rounded-3xl p-10 md:p-20 space-y-3 flex flex-col md:flex-row justify-between items-center">
          <div className="w-full md:w-1/2 space-y-5">
            <h1 className='text-3xl font-bold text-[#517875]'>PRICING</h1>
            <ul className='text-black list-disc px-10 space-y-3 text-justify'>
              <li>Mint price is 30 MATIC per NFT</li>
              <li>Minting is limited to 50 Loot Travel NFTs per wallet.</li>
              <li>By launching on Polygon (L2), gas will be mere pennies worth of MATIC.</li>
              <li>There will only ever be 9999 original NFTs which will be sold on our website. Further sale will happen on opensea, etc</li>
              <li>Once minted, the NFT token goes live on opensea. Further sales will happen on platforms like opensea.</li>
            </ul>
          </div>
          <img src="/images/shopping.png" alt="" className='w-72 p-5 rounded-xl' />
        </div>
        <div className="w-full h-full bg-black/70 rounded-3xl p-10 md:p-20 space-y-3">
            <h1 className='text-3xl font-bold text-[#918378]'>FAQ's</h1>
            <h1 className='font-bold'>1. How can I buy the Loot Travel NFT?</h1>
            <p className=' text-justify'>
              Once you connect to the Polygon Mainnet, purchase can be made with $MATIC.
            </p>
            <h1 className='font-bold  text-justify'>2. I only have ETH in my wallet. How can I make the transaction?</h1>
            <p className=' text-justify overflow-wrap break-words'>
              We need to turn ETH to MATIC using Polygon bridge: https://wallet.polygon.technology/bridge/ 
            </p>
            <h1 className='font-bold  text-justify'>3. Why did we build this on the Polygon chain?</h1>
            <p className=' text-justify'>
              Well, to avoid the insane Gas fees! Gas fee to buy the Loot Travel token is absolutely minimal (usually $0.01). 
            </p>
            <h1 className='font-bold  text-justify'>4. What is the future of the Loot Travel NFT?</h1>
            <p className=' text-justify'>
            Well, it’s super exciting for one. We see the Lootverse become a very exciting space for all of us and Loot travel would become an exciting part of this world once artists join the bandwagon to imagine, visualize and build the Loot vehicles! We look forward to the graphic versions that would be built on top of what we did!
            </p>
        </div>
      </main>
      
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center py-20">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-full flex flex-col justify-center items-center text-center space-y-8">
            <div className='flex flex-col justify-center items-center space-y-3'>
              <img src="/images/logo.png" alt="" className='w-fit' />
              <h1 className='text-5xl font-poppins font-bold'>Loot Travel</h1>
              <p className='tracking-[.5em] font-poppins'>FOR LOOTVERSE</p>
            </div>
            <div className="w-11/12 md:w-1/2 flex justify-between items-center">
              <Twitter />
              <OpenSea />
              <Discord />
            </div>
          </div>
        </div>
      </main>
      <Toaster />
    </div>
  )
}

export default Home
