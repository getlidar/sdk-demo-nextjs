"use client"

import Helika, { SocialConnect } from "helika-sdk";
import { useEffect } from "react";

export default function ImxPassportLogin() {

  useEffect(()=>{
    let tempSdk = new Helika.SOCIAL_CONNECT(details)
    if (!tempSdk) return
    let instance = tempSdk.getPassportInstance()
    if (instance) {
      console.log('calling login callback')
      instance.loginCallback();
    }
  },[])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      Processing IMX Connection
    </div>
  );
}