import { Auth } from 'aws-amplify'
import Input from './Input'

export default function SignUp({
    onChange, setUiState, signUp

}) {
   
    return (
        <div>
            <p className="text-3xl font-black">Sign up for an account</p>
            <div className="mt-10">
                <label className="text-sm">Email</label>
                <Input onChange={onChange} name="email" type="email"/>
            </div>


            <div className="mt-4">
                <label className="text-sm">Password</label>
                <Input onChange={onChange} name="password" type="password"/>
            </div>

            <button 
                onClick={signUp}
                className="text-white w-full mt-6 bg-green-600 p-3 rounded"
            >Sign Up
            </button>

            <p className="mt-12 text-sm front-light">
                Already have an account?
                <span
                    onClick={() => setUiState('signIn')}
                    role="button"
                    className="cursor-pointer text-pink-600"
                > Sign In
                </span>
            </p>
        </div>
    )
}