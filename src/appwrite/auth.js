// Import necessary modules from the Appwrite SDK
import { Client, Account, ID } from "appwrite";

// Import the configuration settings (like URL and Project ID) from a local file
import { conf } from '../conf/conf';

export class AuthService {
    // Initialize the Appwrite Client instance
    client = new Client();

    // Declare the Account instance (will be initialized in the constructor)
    account;

    // Constructor to set up the Appwrite client and Account service
    constructor() {
        // Set the endpoint (URL) for the Appwrite server
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);  // Set the project ID for Appwrite

        // Initialize the Account instance with the client
        this.account = new Account(this.client);
    }

    // Method to create a new user account
    async createAccount({ email, password, name }) {
        try {
            // Create a new account with a unique ID, email, password, and name
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            // If account creation is successful, log the user in and return the result
            if (userAccount) {
                return this.login({ email, password });
            } else {
                // If account creation fails, return the response (could be null or an error object)
                return userAccount;
            }
        } catch (error) {
            // If an error occurs, throw it so it can be handled by the caller
            throw error; 
        }
    }

    // Method to log in a user with email and password
    async login({ email, password }) {
        try {
            // Create a session for the user using their email and password
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            // If an error occurs, throw it for the caller to handle
            throw error;
        }
    }

    // Method to get the currently logged-in user's data
    async getCurrentUser() { 
        try {
            // Fetch and return the current user's details
            return await this.account.get();
        } catch (error) {
            // If an error occurs, log it to the console for debugging purposes
            console.log("Appwrite service:: getCurrentUser:: error", error);
            throw error;
        }
        // Return null if there is an error or no user is logged in
        return null;
    }

    // Method to log out the current user by deleting all their active sessions
    async logout() {
        try {
            // Delete all sessions for the current user, effectively logging them out
            return await this.account.deleteSessions();
        } catch (error) {
            // If an error occurs, log it to the console for debugging purposes
            console.log("Appwrite service:: logout:: error", error);
        }
    }
}

// Create a singleton instance of the AuthService class
const authService = new AuthService();

// Export the instance for use in other parts of the application
export default authService;
