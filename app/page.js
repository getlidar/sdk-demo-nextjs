"use client"

import styles from '../../styles/Home.module.css';
import { useState } from "react";
import '../../styles/global.css'

import Helika, { EventsBaseURL } from "helika-sdk";

export default function Home() {

  const [sdk, setSdk] = useState(undefined);
  const [apiKey, setApiKey] = useState(process.env.NEXT_PUBLIC_SDK_API_KEY);
  const [resp, setResp] = useState('');
  
  const initUserDetails = {
    "user_id": 3, 
    "email": "example@helika.io", 
    "wallet": "0x71036D36B0608393CCd9badf5Daa2fea81E90C2C", 
    "other_detail": "new_example"
  }
  const initAppDetails = {
    "platform_id": "web",
    "client_app_version": "1.0.0",
    "store_id": "our_company_store",
    "source_id": "google"
  }

  const [editableUserDetails, setEditableUserDetails] = useState(JSON.stringify(initUserDetails,null,2));
  const [editableAppDetails, setEditableAppDetails] = useState(JSON.stringify(initAppDetails,null,2));

  async function initiateSdk() {
    if (!apiKey || apiKey.trim()?.length < 10) {
      setResp('Must enter a valid API Key.');
      console.error('Must enter a valid API Key.');
      return;
    }
    const helikaSDK = new Helika.EVENTS(apiKey, 'example_nextjs',EventsBaseURL.EVENTS_DEV, true);
    setSdk(helikaSDK);
    helikaSDK.startSession()
    setResp('SDK Session initiated, session create event sent. Check network to view payload/response.');
  }

  async function sendEvent() {

    if (!sdk) {
      console.error('You must initiate the sdk first');
      return;
    }

    let events = [{
      game_id: 'SDK Example Project',
      event_type: 'Test',
      event: {
        event_sub_type: "send_event_trial",
        id: 1,
        info: 'From Example Project, send event button',
        session_id: '87'
      }
    }];

    let response = await sdk.createEvent(events);

    setResp(`Event sent: ${JSON.stringify(events[0])}`);
  }

  async function sendUserEvent() {

    try {

      if (!sdk) {
        console.error('You must initiate the sdk first');
        return;
      }
  
      let events = [{
        event_type: 'overwrite_user_details',
        event: {
          "event_sub_type": "overwrite",
          "event_details": {
            "event_label": "finisher",
            "event_action": "lost_game"
          },
          //"user_details": {
          //  "user_id": "bad_user_id",
          //  "email": "hacker@helika.io",
          //  "extra_user_details": "should not get overwritten"
          //},
          //"app_details": {
          //  "source_id": "my_website",
          //  "client_app_version": "0.2.0",
          //  "extra_app_details": "should not get overwritten"
          //}
        }
      },{
        event_type: 'overwrite_user_details',
        event: {
          "event_sub_type": "overwrite",
          "event_details": {
            "event_label": "finisher",
            "event_action": "lost_game"
          },
          //"user_details": {
          //  "user_id": "bad_user_id",
          //  "email": "hacker@helika.io",
          //  "extra_user_details": "should not get overwritten"
          //},
          //"app_details": {
          //  "source_id": "my_website",
          //  "client_app_version": "0.2.0",
          //  "extra_app_details": "should not get overwritten"
          //}
        }
      },{
        event_type: 'overwrite_user_details',
        event: {
          "event_sub_type": "overwrite",
          "event_details": {
            "event_label": "finisher",
            "event_action": "lost_game"
          },
          //"user_details": {
          //  "user_id": "bad_user_id",
          //  "email": "hacker@helika.io",
          //  "extra_user_details": "should not get overwritten"
          //},
          //"app_details": {
          //  "source_id": "my_website",
          //  "client_app_version": "0.2.0",
          //  "extra_app_details": "should not get overwritten"
          //}
        }
      }]

      //let events = [{
      //	event_type: 'game_finished',
      //	event: {
      //		"event_sub_type": "loser",
      //		"event_details": {
      //		  "event_label": "finisher",
      //		  "event_action": "lost_game"
      //		},
      //		"kills": 11,
      //		"deaths": 10,
      //		"hits": 140,
      //		"max_damage": 7500
      //	}
      //}]

      //let events = [{
      //	event_type: 'overwrite_user_details',
      //	event: {
      //		"event_sub_type": "overwrite",
      //		"event_details": {
      //		  "event_label": "finisher",
      //		  "event_action": "lost_game"
      //		},
      //		"user_detials": {
      //			"user_id": "bad_user_id",
      //			"email": "hacker@helika.io",
      //			"extra_user_details": "should not get overwritten"
      //		},
      //		"app_detials": {
      //			"source_id": "my_website",
      //			"client_app_version": "0.2.0",
      //			"extra_app_details": "should not get overwritten"
      //		}
      //	}
      //}]
  
      let response = await sdk.createUserEvent(events);
  
      setResp(`Event sent: ${JSON.stringify(events[0])}`);
      //setResp(JSON.stringify(response))

    } catch(e) {
      setResp(`Error ${e?.message}`)
    }

  }

  async function setUserDetails() {

    if (!sdk) {
      console.error('You must initiate the sdk first');
      return;
    }
    try {
      if (editableUserDetails?.trim()?.length === 0) {
        sdk.setUserDetails(undefined)
        setResp('User Details Cleared')
        return
      }
      let newDetails = JSON.parse(editableUserDetails)
      sdk.setUserDetails(newDetails)
      setResp(editableUserDetails)
    } catch(e) {
      setResp(e.message)
      console.error(e)
    }
  }

  async function setAppDetails() {

    if (!sdk) {
      console.error('You must initiate the sdk first');
      return;
    }
    try {
      if (editableAppDetails?.trim()?.length === 0) {
        sdk.setUserDetails(undefined)
        setResp('App Details Cleared')
        return
      }
      let newDetails = JSON.parse(editableAppDetails)
      sdk.setAppDetails(newDetails)
      setResp(editableAppDetails)
    } catch(e) {
      setResp(e.message)
      console.error(e)
    }
  }

  return (
    <div 
    className={styles.container}
      style={{
        height: 'fit-content'
      }}
    >
      <div className={styles.title}>Helika SDK Test</div>
      
        <div style={{
          height: '2em'
        }}>
          API KEY:
        </div>
      <input
        type='text'
        value={apiKey}
        onChange={(e) => {
          setApiKey(e.target.value);
        }}
        style={{width: '20em'}}
      />
      <button
        onClick={initiateSdk}
        style={{ margin: '1em 0 0 0' }}
      >
        Inititate SDK
      </button>
      <button
        onClick={sendEvent}
        style={{ margin: '1em 0 0 0' }}
      >
        Send Event
      </button>
      <button
        onClick={sendUserEvent}
        style={{ margin: '1em 0 0 0' }}
      >
        Send User Event
      </button>
      <button
        onClick={setUserDetails}
        style={{ margin: '1em 0 0 0' }}
      >
        Set User Details
      </button>
      <button
        onClick={setAppDetails}
        style={{ margin: '1em 0 0 0' }}
      >
        Set App Details
      </button>
      <button
        onClick={()=>{
          try {
            if (!sdk) {
              setResp('SDK not initialized')
              return
            }
            sdk.setPIITracking(true)
            setResp('PII set to true')
          } catch(e){
            console.error(e?.message)
          }
        }}
        style={{ margin: '1em 0 0em 0' }}
      >
        Set PII true
      </button>
      <button
        onClick={()=>{
          try {
            if (!sdk) {
              setResp('SDK not initialized')
              return
            }
            sdk.setPIITracking(false)
            setResp('PII set to false')
          } catch(e){
            console.error(e?.message)
          }
        }}
        style={{ margin: '1em 0 0em 0' }}
      >
        Set PII false
      </button>

      <button
        onClick={()=>{
          try {
            if (!sdk) {
              setResp('SDK not initialized')
              return
            }
            let details = sdk.getUserDetails()
            setResp(JSON.stringify(details,null,2))
          } catch(e){
            console.error(e?.message)
          }
        }}
        style={{ margin: '1em 0 0 0' }}
      >
        GET USER DETAILS
      </button>
      <button
        onClick={()=>{
          try {
            if (!sdk) {
              setResp('SDK not initialized')
              return
            }
            let details = sdk.getAppDetails()
            setResp(JSON.stringify(details,null,2))
          } catch(e){
            console.error(e?.message)
          }
        }}
        style={{ margin: '1em 0 1em 0' }}
      >
        GET APP DETAILS
      </button>

      <div>App Details</div>
      <textarea
        style={{maxWidth: '50vw', width:'100%'}}
        rows={6}
        value={editableAppDetails}
        onChange={(e)=>{
          setEditableAppDetails(e.currentTarget.value)
        }}
      />

      <div>User Details</div>
      <textarea
        style={{maxWidth: '50vw', width:'100%'}}
        rows={6}
        value={editableUserDetails}
        onChange={(e)=>{
          setEditableUserDetails(e.currentTarget.value)
        }}
      />

      <div className={styles.myHalf}>Result:</div>

      <textarea
        style={{maxWidth: '50vw', width:'100%', marginBottom: '2em'}}
        rows={10}
        value={resp}
        onChange={()=>{}}
      />
      
        
    </div>
  );
}