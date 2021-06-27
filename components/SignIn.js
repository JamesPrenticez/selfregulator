import { Auth } from 'aws-amplify'

export default function SignIn(){
    return (
        <div>
            <button onClick={() => Auth.federatedSignIn({provider: "Google"})}>
                Sign In with Google
            </button>

            <button onClick={() => Auth.federatedSignIn({provider: "Facebook"})}>
                Sign In with Facebook
            </button>
        </div>
    )
}