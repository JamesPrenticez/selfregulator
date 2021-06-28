import { Auth } from 'aws-amplify'
import Input from './Input'

export default function ConfirmSignUp({
    onChange, setUiState, confirmSignUp
}) {
   
    return (
        <div>
            <p className="text-3xl font-black">Confirm your account</p>
            <div className="mt-10">
                <label className="text-sm">Confirmation Code</label>
                <Input onChange={onChange} name="confirmCode"/>
            </div>

            <button 
                onClick={confirmSignUp}
                className="text-white w-full mt-6 bg-green-600 p-3 rounded"
            >Confirm Sign Up
            </button>

            <button 
                onClick={() => setUiState("signIn")}
                className="text-white w-full mt-6 bg-green-600 p-3 rounded"
            >Cancel
            </button>

        </div>
    )
}