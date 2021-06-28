import { Auth } from 'aws-amplify'
import { FaGoogle, FaFacebook } from 'react-icons/fa'

export default function SocialSignIn(){
    return (
        <div className="flex flex-col">
            {/*Google*/}
            <button 
                className="mt-10 focus:outline-none"
                onClick={() => Auth.federatedSignIn({provider: "Google"})}
            >
                <div className="flex border border-gray-300 p-2 rounded-full items-center justify-center">
                    <FaGoogle size="38" className="text-red-600  -ml-4" />
                    <p className="ml-10">Sign In with Google</p>
                </div>
            </button>

            {/*Facebook*/}
            <button 
                className="mt-4 focus:outline-none"
                onClick={() => Auth.federatedSignIn({provider: "Facebook"})}
            >
                <div className="flex border border-gray-300 p-2 rounded-full items-center justify-center">
                    <FaFacebook size="38" className="text-blue-600" />
                    <p className="ml-10">Sign In with Facebook</p>
                </div>
            </button>


        </div>
    )
}