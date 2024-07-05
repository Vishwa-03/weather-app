// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore, collection, getDocs, addDoc,deleteDoc,query,where } from "firebase/firestore";
import firebase from "firebase/compat/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "firebase/compat/auth";



const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const firestore = getFirestore(app);

export const fetchUserInfo = async () => {
  const currentUser = projectAuth.currentUser;
  if (currentUser) {
    return { uid: currentUser.uid, name: currentUser.displayName || "User" };
  } else {
    throw new Error("No user is currently logged in.");
  }
} 
// Function to fetch saved cities for the current user
export const fetchSavedCities = async () => {
  try {
    const currentUser = projectAuth.currentUser;
    if (!currentUser) {
      throw new Error("No user is currently logged in.");
    }

    const userCitiesCollection = collection(firestore, `users/${currentUser.uid}/cities`);
    const snapshot = await getDocs(userCitiesCollection);
    const cities = snapshot.docs.map((doc) => doc.data().name);
    return cities;
  } catch (error) {
    console.error("Error fetching saved cities: ", error);
    throw new Error("Failed to fetch saved cities.");
  }
};

// Function to save a city for the current user
export const saveCity = async (city) => {
  try {
    const currentUser = projectAuth.currentUser;
    if (!currentUser) {
      throw new Error("No user is currently logged in.");
    }

    const userCitiesCollection = collection(firestore, `users/${currentUser.uid}/cities`);
    await addDoc(userCitiesCollection, { name: city });
  } catch (error) {
    console.error("Error saving city: ", error);
    throw new Error("Failed to save city.");
  }
};

// Function to delete a saved city for the current user
const deleteCity = async (cityName) => {
  try {
    const currentUser = projectAuth.currentUser;
    if (!currentUser) {
      throw new Error("No user is currently logged in.");
    }

    const userCitiesCollection = collection(firestore, `users/${currentUser.uid}/cities`);
    const q = query(userCitiesCollection, where("name", "==", cityName));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  } catch (error) {
    console.error("Error deleting city: ", error);
    throw new Error("Failed to delete city.");
  }
};

export { projectAuth, onAuthStateChanged,deleteCity };