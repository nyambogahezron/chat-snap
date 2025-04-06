import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';

interface AuthContextType {
	isAuthenticated: boolean;
	phoneNumber: string | null;
	login: (phoneNumber: string) => void;
	verifyCode: (code: string) => boolean;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
	isAuthenticated: false,
	phoneNumber: null,
	login: () => {},
	verifyCode: () => false,
	logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

	// Check if user is already authenticated
	useEffect(() => {
		// In a real app, we'd check storage or tokens here
		const checkAuth = async () => {
			// For demo purposes, always start as not authenticated
			setIsAuthenticated(false);
		};

		checkAuth();
	}, []);

	const login = (phone: string) => {
		// In a real app, we would send a verification code to the phone number
		setPhoneNumber(phone);
	};

	const verifyCode = (code: string) => {
		// In a real app, we would validate the code with a backend
		if (code === '123456') {
			// Simulated correct code
			setIsAuthenticated(true);
			return true;
		}
		return false;
	};

	const logout = () => {
		// In a real app, we would clear tokens, etc.
		setIsAuthenticated(false);
		setPhoneNumber(null);
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				phoneNumber,
				login,
				verifyCode,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
