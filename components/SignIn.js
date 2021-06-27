export default function SignIn(){
    return (
        <div>
            <button onClick={() => Auth.federatedSignIn({provider: "Google"})}>
                Sign In with Google
            </button>

            <button onClick={() => Auth.federatedSignIn({provider: "Facebook"})}>
                Sign In with Facebook
            </button>

            <button onClick={() => Auth.signOut()}>
                Sign Out 
            </button>
        </div>
    )
}