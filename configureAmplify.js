import Amplify from 'aws-amplify'
import config from './aws-exports'

Amplify.configure({
    ...config,
    ssr: true
    }
)

if (typeof window !== 'undefined') {
  config.oauth.redirectSignIn = `${window.location.origin}/user/profile/`;
  config.oauth.redirectSignOut = `${window.location.origin}/user/profile/`;
}