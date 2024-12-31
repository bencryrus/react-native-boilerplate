import { GoogleSignin, isErrorWithCode, statusCodes } from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';

export const googleLogin = async(callback) => {
	try {
		await GoogleSignin.signOut(); // To ensure user selection modal appears [https://github.com/react-native-google-signin/google-signin/issues/997]
		await GoogleSignin.hasPlayServices();

		// Get the users ID token
		const userInfo = await GoogleSignin.signIn();
		const { idToken, user } = userInfo.data
		if(!idToken) { return }

		// Create a Google credential with the token
		const googleCredential = auth.GoogleAuthProvider.credential(idToken);

		// Sign-in the user with the credential
		return auth().signInWithCredential(googleCredential)
		.then(res => callback?.(true))
		.catch(err => callback?.(false))

	} catch (error) {
		callback?.(false)
		if (error.code === statusCodes.SIGN_IN_CANCELLED) {
			// user cancelled the login flow
			return { error: true }
		} else if (error.code === statusCodes.IN_PROGRESS) {
			// operation (e.g. sign in) is in progress already
			return { error: true }
		} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
			// play services not available or outdated
			return { error: true }
		} else {
			// some other error happened
			return { error: true }
		}
	}
}

export const appleLogin = async(callback) => {
	// Start the sign-in request
	const appleAuthRequestResponse = await appleAuth.performRequest({
		requestedOperation: appleAuth.Operation.LOGIN,
		// As per the FAQ of react-native-apple-authentication, the name should come first in the following array.
		// See: https://github.com/invertase/react-native-apple-authentication#faqs
		requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
	})
	.then(appleAuthRequestResponse => {
		// Ensure Apple returned a user identityToken
		if (!appleAuthRequestResponse.identityToken) {
			callback?.(false)
			throw new Error('Apple Sign-In failed - no identify token returned');
		}
		
		// Create a Firebase credential from the response
		const { identityToken, nonce } = appleAuthRequestResponse;
		const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
		// Sign the user in with the credential
		return auth().signInWithCredential(appleCredential)
		.then(res => {
			callback?.(true)
			return res
		})
		.catch(err => {
			callback?.(false)
			return { error: true }
		})
	})
	.catch(err => {
		callback?.(false)
		return { error: true }
	})
	return appleAuthRequestResponse
}