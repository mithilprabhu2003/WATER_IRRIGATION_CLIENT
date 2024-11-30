import React, { useEffect, useState } from 'react';
import { realDb, db, auth } from '../config/firebase';
import { ref, onValue } from 'firebase/database';
import { collection, query, where, getDocs, doc, onSnapshot } from "firebase/firestore";

function MiddleSidebar() {
  const [userEmail, setUserEmail] = useState("");
  const [userWaterFlow, setUserWaterFlow] = useState(0);
  const [userWaterFlowStart, setUserWaterFlowStart] = useState(0);
  const [data, setData] = useState({
    flowadmin: 0,
    tds: 0,
    temperature: 0,
    turbidity: 0,
  });

  const fetchUserEmail = async () => {
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
            setUserEmail(userData.email || null);
          });
          // console.log(userServiceStarted)
        } else {
          console.error("No user data found!");
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  // Listener to continuously fetch the latest data from Firebase Realtime Database
  
  useEffect(() => {
    const dataRef = ref(realDb, "water");
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const newData = snapshot.val();
      if (newData) {
        setData({
          flowadmin: newData.flowadmin || 0,
          tds: newData.tds || 0,
          temperature: newData.temperature || 0,
          turbidity: newData.turbidity || 0,
        });
      }
    });

    fetchUserEmail()

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);
  

  // Real-time listener for the user's water flow data
  const getUserWaterFlowListener = () => {
    const docRef = doc(db, "USERS", userEmail); // Assuming the email is the document ID
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.data();
        setUserWaterFlow(userData.usedWaterFlow || 0); // Update the state with the usedWaterFlow field
        setUserWaterFlowStart(userData.flowStart || 0); // Update the state with the flowStart field
      }
    });

    return unsubscribe; // Return unsubscribe function to clean up listener
  };

  // Set up the listener for the user's water flow after email is set
  useEffect(() => {
    if (userEmail) {
      const unsubscribeWaterFlow = getUserWaterFlowListener();
      return () => unsubscribeWaterFlow(); // Cleanup on component unmount or email change
    }
  }, []); // Re-run if userEmail changes

  // Card component for displaying data
  const DataCard = ({ title, value }) => (
    <div className="h-[8em] w-[15em] bg-white m-auto rounded-[1em] overflow-hidden relative group p-2 z-0">
      <div className="circle absolute h-[5em] w-[5em] -top-[2.5em] -right-[2.5em] rounded-full bg-[#FF5800] group-hover:scale-[800%] duration-500 z-[-1]"></div>
      <h1 className="z-20 font-bold group-hover:text-white duration-500 text-[1.4em]">
        {title}
      </h1>
      <p className="text-[#6C3082] group-hover:text-white text-[1.2em] font-semibold mt-2">
        {value}
      </p>
    </div>
  );

  return (
    <div className="flex flex-col col-span-3 items-center justify-center w-full h-[calc(100vh-100px)]">
      <div className="flex justify-center gap-20 w-full h-full">
        {/* Upper Row with flow2 and flowadmin */}
        <DataCard title="Flow" value={data.flowadmin - userWaterFlowStart} />
        {/* <DataCard title="Flow Admin" value={data.flowadmin} /> */}
      </div>
      <div className="flex justify-center gap-20 mt-10 w-full h-full ">
        {/* Lower Row with tds, temperature, and turbidity */}
        <DataCard title="TDS" value={data.tds} />
        <DataCard title="Temperature" value={data.temperature} />
        <DataCard title="Turbidity" value={data.turbidity} />
      </div>
    </div>
  );
}

export default MiddleSidebar;
