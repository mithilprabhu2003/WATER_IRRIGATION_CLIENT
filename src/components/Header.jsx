import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import Email from "../assets/EmailS";
import Users from "../assets/UsersS";
import Start from "../assets/Starts";

function Header() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (userId) {
          const userRef = doc(db, "USERS", userId);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setUserName(userData.name || "No Name");
            setUserEmail(userData.email || "No Email");
          } else {
            console.error("No user data found!");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
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
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log("start");
              }}
              className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear"
            >
              <Start />
              Start
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
