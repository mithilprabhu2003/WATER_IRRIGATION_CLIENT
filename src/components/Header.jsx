import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, realDb } from "../config/firebase";
import {
  doc,
  getDoc,
  where,
  query,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import Email from "../assets/EmailS";
import Users from "../assets/UsersS";
import Start from "../assets/Starts";
import { ref, onValue } from "firebase/database";
import { useUser } from '../context/user';

function Header() {
  const {userName,userEmail} = useUser();
  const [userServiceStarted, setUserServiceStarted] = useState(false);
  const navigate = useNavigate();

  console.log(userName,userEmail)

  const [data, setData] = useState({
    flowadmin: 0,
  });

  const getAdminWaterFlowListener = () => {
    const dataRef = ref(realDb, "water");  // Reference to the "water" path in Firebase Realtime Database
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const newData = snapshot.val();  // Get the data from the snapshot
      if (newData) {
        setData({
          flowadmin: newData.flowadmin || 0,  // Update state with flowadmin data, defaulting to 0
        });
      }
    });
  
    return unsubscribe;  // Return unsubscribe function to clean up when component unmounts
  };
  

  const fetchUserData = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (userId) {
        const colRef = collection(db, "USERS");
        const pendingQuery = query(colRef, where("authId", "==", userId));

        // Fetch the documents matching the query
        const querySnapshot = await getDocs(pendingQuery);

        // Check if any documents were found
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            setUserName(userData.name || "No Name");
            setUserServiceStarted(userData.isServiceStarted || false)
          });
          // console.log(userServiceStarted)
        } else {
          console.error("No user data found!");
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = getAdminWaterFlowListener();

    return () => {
      unsubscribe(); // Cleanup the listener when the component unmounts
    };
  }, []);

  return (
    <div className="card w-full h-24 bg-white p-5 shadow-md shadow-purple-200/50 rounded-md flex justify-between">
      <div>
        <ul className="flex flex-row gap-2">
          <li className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
            <button
              className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear"
              disabled
            >
              <Users />
              {userName}
            </button>
          </li>
          <li className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
            <button
              className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear"
              disabled
            >
              <Email />
              {userEmail}
            </button>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex flex-row gap-2">
          <li className="flex-center cursor-pointer p-16-semibold whitespace-nowrap">
            {
              userServiceStarted ? <button
              onClick={async(e) => {
                e.preventDefault();
                const ref = doc(db,"USERS",userEmail)

                await updateDoc(ref,{
                  isServiceStarted:false,
                  flowStop:data.flowadmin
                })
                setUserServiceStarted(false)
                console.log("Stopped");
              }}
              className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear"
            >
              <Start />
              Stop
            </button> : <button
              onClick={async(e) => {
                e.preventDefault();
                const ref = doc(db,"USERS",userEmail)
                await updateDoc(ref,{
                  isServiceStarted:true,
                  flowStart:data.flowadmin,
                  usedWaterFlow : data.flowadmin
                })
                setUserServiceStarted(true)
                console.log("started");
              }}
              className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear"
            >
              <Start />
              Start
            </button>
            }
            {/* <button
              onClick={async(e) => {
                e.preventDefault();
                const ref = doc(db,"USERS",userEmail)
                await updateDoc(ref,{
                  isServiceStarted:true,
                  flowStart:data.flowadmin
                })
                console.log("started");
              }}
              className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear"
            >
              <Start />
              Start
            </button> */}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
