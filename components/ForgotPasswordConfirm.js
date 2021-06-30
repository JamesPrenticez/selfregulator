import { Auth } from 'aws-amplify'
import Input from './Input'

export default function ForgotPasswordConfirm({
    onChange, forgotPasswordSubmit
}) {
   
    return (
        <div>
            <p className="text-3xl font-black">Confirm new password</p>

            <div className="mt-10">
                <label className="text-sm">Confirmation Code</label>
                <Input onChange={onChange} name="authCode"/>
            </div>

            <div className="mt-10">
                <label className="text-sm">New Password</label>
                <Input type="password" onChange={onChange} name="password"/>
            </div>

            <button 
                onClick={forgotPasswordSubmit}
                className="text-white w-full mt-6 bg-green-600 p-3 rounded"
            >Submit new password
            </button>
        </div>
    )
}