import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const SignUp = () =>{
        const navigate = useNavigate();

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [newAccount, setNewAccount] = useState(true);
        const [error, setError] = useState('');

    const onChange = (e) =>{
        const { target: {name, value} } = e;
        if(name === "email") setEmail(value);
        else if (name==="password") setPassword(value);
        
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        let data ;
        try {
            if(newAccount) data = await createUserWithEmailAndPassword(auth, email, password);
            else data = await signInWithEmailAndPassword(auth, email, password);
            console.log(email, password)
            navigate("/signin")
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="w-full min-h-screen bg-white dark:bg-[#1E2028] text-black dark:text-white">
            <div className="w-full border-b border-gray-100 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <img src="/Logo.svg" className="w-32 h-10" alt="Logo" />
                        </div>
                        <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white">Sign in</a>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="max-w-md mx-auto">

            <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold mb-2">Create your account</h1>
                <p className="text-gray-500 dark:text-gray-400">Join thousands of users worldwide</p>
            </div>

            
            <div className="space-y-4 mb-8">
                <button className="w-full flex items-center justify-center space-x-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <span>Continue with Google</span>
                </button>

                <button className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#1874E8] transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Continue with Facebook</span>
                </button>

                <button className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-[#24292F] text-white rounded-lg hover:bg-[#2C333A] transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    <span>Continue with Github</span>
                </button>
            </div>

            
            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center">
                    <span className="px-4 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-[#1E2028]">Or continue with</span>
                </div>
            </div>

            <form className="space-y-6"  onSubmit={onSubmit}>
                <div>
                    <label className="block text-sm font-medium mb-2">Email address</label>
                    <input type="email" id="email" name="email" value={email} onChange={onChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#252731] focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <input type="password" id="password" name="password" value={password} onChange={onChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#252731] focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required />
                </div>

                <div className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1 rounded border-gray-300 dark:border-gray-600 text-indigo-500 focus:ring-indigo-500" required />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        By creating an account, you agree to our 
                        <a href="#" className="text-indigo-500 hover:text-indigo-600">Terms of Service</a> and 
                        <a href="#" className="text-indigo-500 hover:text-indigo-600">Privacy Policy</a>
                    </span>
                </div>

                <button type="submit"
                    className="w-full py-2.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-[#1E2028] transition-colors">
                    Create account
                </button>
            </form>
        </div>
    </main>


        </div>
    )
  }
  
  export default SignUp;