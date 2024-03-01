import {
  DocumentData,
  FirestoreDataConverter,
  getFirestore,
  query,
  collection,
  addDoc,
  doc,
  updateDoc,
  Firestore,
  CollectionReference,
  DocumentReference,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { firebaseConfig } from 'src/config';
import { User } from './user-interface';

class FirebaseUsers {
  private firebaseApp: FirebaseApp;
  private firestore: Firestore;
  private usersCollection: CollectionReference<User>;
  private storage: ReturnType<typeof getStorage>;

  constructor() {
    this.firebaseApp = initializeApp(firebaseConfig);
    this.firestore = getFirestore(this.firebaseApp);
    this.usersCollection = collection(this.firestore, 'users') as CollectionReference<User>;
    this.storage = getStorage(this.firebaseApp);
  }

  async createUser(newUser: User): Promise<void> {
    try {
      await addDoc(this.usersCollection, newUser);
    } catch (error) {
      console.error('Error adding new user: ', error);
      throw error;
    }
  }

  async uploadFiles(userName: string, files: File[]): Promise<void> {
    try {
      const uploadPromises = files?.map(async (file) => {
        if (!file.name) {
          console.error('Error: File name is undefined or empty.');
          return;
        }
        const fileName = userName.concat(file.name).replaceAll(' ', '_').trim();
        const storageRef = ref(this.storage, `files/${fileName}`);

        try {
          await uploadBytes(storageRef, file);
          console.log(`File ${file.name} uploaded successfully`);
        } catch (error) {
          console.error(`Error uploading file ${file.name}:`, error.message);
          throw error;
        }
      });

      // Use Promise.all to wait for all promises to resolve
      await Promise.all(uploadPromises);

      // Update any other logic or data as needed
      console.log('All files uploaded successfully');
    } catch (error) {
      console.error('Error uploading files:', error.message);
      throw error;
    }
  }
}

export default FirebaseUsers;
