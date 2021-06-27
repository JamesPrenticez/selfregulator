import { useState, useEffect, Profiler } from "react"
import { Auth } from 'aws-amplify'
import '../configureAmplify'
import SignIn from '../components/SignIn'

const initialState = {email: '', password: '', authCode: ''}

function Profile() {
    const [uiState, setUiState] = useState(null)
    const [formState, setFormState] = useState(initailState)
    const [user, setUser] = userState(null)

    useEffect(() => {
        checkUser()
        async function checkUser(){
            try {
                const user = await Auth.currentAuthenticatedUser()
                setUser(user)
            } catch(err) { setUser(null) }
        }
    }, [])

    function onChange(e) {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    return (
        <div>
            {
            uiState === 'signIn' && (
                    <SignIn 
                    onChange={onChange}
                    setUiState={setUiState}
                    />
                )
            }
            {
            uiState === 'signedIn' && (
                <div>
                    <p
                        className="text-x1 "
                        >Welcome, {user.username}</p>
                    <button
                        onClick={() => {
                        Auth.signOut()
                        setUiState('signIn')
                        setUserState(null)
                    }}
                    >Sign Out
                    </button>
                </div>
                )
            }
        </div>
    )
}

export default Profile

