'use client';

import WebApp from "@twa-dev/sdk";
import { useState, useEffect } from "react"

interface UserData {
  id:number;
  first_name:string;
  last_name:string;
  username:string;
  language_code:string;
  is_premium:boolean;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (WebApp.initDataUnsafe.user){
      setUserData(WebApp.initDataUnsafe.user as UserData);
    }
  },[])

  return (
    <main className="p-4">
      {
        userData ? 
          (
            <>
              <h1 className="text-2xl font-bold mb-4">User Data</h1>
              <ul>
                <li>Id:{userData.id}</li>
                <li>First Name:{userData.first_name}</li>
                <li>Last name:{userData.last_name}</li>
                <li>User name:{userData.username}</li>
                <li>language code:{userData.language_code}</li>
                <li>Is Premium:{userData.is_premium ? 'yes' : 'no'}</li>
              </ul>
          </>
          ):
          (
            <div>Loading...</div>
          )
      }
    </main>
  );
}
