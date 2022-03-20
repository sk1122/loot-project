import type { NextPage } from 'next'
import Head from 'next/head'
import { Disclosure } from '@headlessui/react'
import { 
  CogIcon,
  PlusIcon,
  ChevronUpIcon
} from '@heroicons/react/solid'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Authereum from "authereum";
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

const INFURA_ID = '460f40a260564ac4a4f4b3fffb032dad'

const Cards = [
  {
    icon: CogIcon,
    text: `
    CONTRACT
    
    MINTING
    
    WALK
    
    THROUGH`,
    link: ''
  },
  {
    icon: CogIcon,
    text: `
    CONTRACT
    
    MINTING
    
    WALK
    
    THROUGH`,
    link: ''
  },
  {
    icon: CogIcon,
    text: `
    CONTRACT
    
    MINTING
    
    WALK
    
    THROUGH`,
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

		try {
			const provider = await web3modal.connect()
      console.log(provider)
			setProvider(new ethers.providers.Web3Provider(provider))
			return provider
		} catch (e) {
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
    console.log('dsa')
    storeAddress()
  }, [provider])

  useEffect(() => console.log(address), [address])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-white">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center bg-gray-700">
        <div className="w-full min-h-screen flex flex-col justify-start items-center px-16 py-16 space-y-20">
          <div className="w-full h-1/3 flex justify-between items-center">
            <div className="flex flex-col justify-center items-center text-center">
              <h1 className='text-5xl'>Banners</h1>
              <h3 className='text-xl'>(for Adventures)</h3>
            </div>
            {!address && 
              <button onClick={() => connectETH()} className='flex flex-col justify-center items-center text-center px-8 py-5 bg-gray-500 rounded-full border-2 border-white'>
                <p className='text-2xl'>Connect</p>
                <p className='text-md'>(MINT FROM WEBSITE)</p>
              </button>
            }
            {address && 
              <button className='flex flex-col justify-center items-center text-center px-8 py-5 bg-gray-500 rounded-full border-2 border-white'>
                <p className='w-20 truncate text-2xl'>{address}</p>
              </button>
            }
          </div>
          <div className="w-full h-full flex flex-col justify-center items-center space-y-10">
            <div>
              <button className='text-3xl p-5 bg-gray-500 text-black border-4 border-black hover:text-blue-900 duration-200'>MINT FROM CONTRACT</button>
            </div>
            <div className="w-1/2 flex justify-center items-center space-x-5">
              {Cards.map(card => {
                return <a href={card.link} className="w-36 h-64 bg-gray-400 flex justify-center items-center flex-col space-y-2">
                  <card.icon className='w-20 h-20' />
                  <h1 className='text-xl font-bold'>{card.text}</h1>
                </a>
              })}
            </div>
            <div className='border-t-2 border-t-orange-300'>
              <h1 className='text-xl'>25000 randomized text only NFTs. Society for Loot. Art for everyone. All on-chain.</h1>
            </div>
            <div className="w-1/2 flex justify-between items-center pt-10">
              <Twitter />
              <OpenSea />
              <Discord />
            </div>
          </div>
        </div>
      </main>
      
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center bg-gray-700">
      <div className="w-full p-2 mx-auto">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex p-5 bg-gray-500 items-center border-b-2 border-b-white justify-between w-full px-4 py-2 text-sm font-medium text-left">
                <span className='text-3xl'>ELEMENTS</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'transform rotate-180' : ''
                  } w-5 h-5 text-white`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-xl text-white">
                If you're unhappy with your purchase for any reason, email us
                within 90 days and we'll refund you in full, no questions asked.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex bg-gray-500 items-center border-b-2 border-b-white p-5 justify-between w-full px-4 py-2 text-sm font-medium text-left">
                <span className='text-3xl'>COMPONENTS</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'transform rotate-180' : ''
                  } w-5 h-5 text-white`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-xl text-white">
                If you're unhappy with your purchase for any reason, email us
                within 90 days and we'll refund you in full, no questions asked.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex bg-gray-500 items-center border-b-2 border-b-white p-5 justify-between w-full px-4 py-2 text-sm font-medium text-left">
                <span className='text-3xl'>PRICING</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'transform rotate-180' : ''
                  } w-5 h-5 text-white`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-xl text-white">
                If you're unhappy with your purchase for any reason, email us
                within 90 days and we'll refund you in full, no questions asked.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
      </main>
      
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center bg-gray-700 py-20">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-full flex flex-col justify-center items-center text-center space-y-8">
            <div>
              <h1 className='text-5xl'>Banners</h1>
              <h3 className='text-xl'>(for Adventures)</h3>
            </div>
            <div className="w-1/2 flex justify-between items-center">
              <Twitter />
              <OpenSea />
              <Discord />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
