// Authentication service utility functions
// This file provides non-React functions for authentication operations

// Store auth state in memory
let currentPhoneNumber: string | null = null;
let currentUser: { id: string; phone: string } | null = null;
let authToken: string | null = null;

// Store verification codes (in a real app, this would be server-side)
const pendingVerifications: Record<string, { 
  code: string;
  expiresAt: Date;
}> = {};

// Generate a verification code (in a real app, this would be done server-side)
const generateVerificationCode = (): string => {
  // For demo purposes, always return "123456"
  return "123456";
};

// Send verification code (simulated)
export const sendVerificationCode = async (phoneNumber: string): Promise<boolean> => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Store the verification code with an expiration time (10 minutes)
    const code = generateVerificationCode();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);
    
    pendingVerifications[phoneNumber] = {
      code,
      expiresAt,
    };
    
    currentPhoneNumber = phoneNumber;
    
    // In a real app, this would send an SMS with the code
    console.log(`[SIMULATED] Sending code ${code} to ${phoneNumber}`);
    
    return true;
  } catch (error) {
    console.error('Error sending verification code:', error);
    return false;
  }
};

// Verify the code entered by user
export const verifyCode = async (
  phoneNumber: string, 
  code: string
): Promise<{success: boolean; token?: string; error?: string}> => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const verification = pendingVerifications[phoneNumber];
    
    // Check if verification exists and hasn't expired
    if (!verification) {
      return { 
        success: false, 
        error: 'No verification code was sent to this number or the code has expired'
      };
    }
    
    if (new Date() > verification.expiresAt) {
      // Clean up expired verification
      delete pendingVerifications[phoneNumber];
      return { success: false, error: 'Verification code has expired' };
    }
    
    // Check if code matches
    if (verification.code !== code) {
      return { success: false, error: 'Invalid verification code' };
    }
    
    // Code is valid, generate authentication token
    // In a real app, this would be a JWT or similar token from the server
    authToken = `simulated_auth_token_${Date.now()}`;
    
    // Create user object
    currentUser = {
      id: `user_${Date.now()}`,
      phone: phoneNumber,
    };
    
    // Clean up the used verification
    delete pendingVerifications[phoneNumber];
    
    return { success: true, token: authToken };
  } catch (error) {
    console.error('Error verifying code:', error);
    return { success: false, error: 'Server error during verification' };
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!authToken && !!currentUser;
};

// Get current user
export const getCurrentUser = () => {
  return currentUser;
};

// Get current phone number (used during verification process)
export const getCurrentPhoneNumber = (): string | null => {
  return currentPhoneNumber;
};

// Logout
export const logout = (): void => {
  currentUser = null;
  currentPhoneNumber = null;
  authToken = null;
};

// Resend verification code
export const resendVerificationCode = async (): Promise<boolean> => {
  if (!currentPhoneNumber) {
    return false;
  }
  
  return await sendVerificationCode(currentPhoneNumber);
};
