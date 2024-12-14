import { Account, Avatars, Client, Databases, Storage, ID, Query } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.hca.aora',
    projectId: '675c3c2b0025e820a8fc',
    databaseId: '675c3d190039804d9728',
    userCollectionId: '675c3d390024a8e8656f',
    videoCollectionId: '675c3d70002a5978debe',
    storageId: '675c40a9001c9a56e284'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export async function createUser( email: string, password: string, username: string) {
    try {
        const newAccount = await account.create(
            ID.unique(), 
            email, 
            password, 
            username
        );

        if(!newAccount) throw new Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
              accountId: newAccount.$id,
              email: email,
              username: username,
              avatar: avatarUrl,
            }
        );

        return newUser;
    } catch (error: any){
        console.log(error);
        throw new Error(error.message);
    }
}

export async function signIn(email: string, password: string) {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        console.log(session);
        return session;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
}

export async function getAccount() {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  
  // Get Current User
  export async function getCurrentUser() {
    try {
      const currentAccount = await getAccount();
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

interface Post {
  $id: string;
  title: string;
  thumbnail: string;
  prompt: string;
  video: string;
  creator: {
    username: string;
    profileImage: string;
  };
}
  
  // Get all video Posts
export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    );

    return posts.documents;
  } catch (error : any) {
    throw new Error(error);
  }
}