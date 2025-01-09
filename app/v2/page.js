"use client"

import styles from '../../styles/Home.module.css';
import { useState } from "react";
import '../../styles/global.css'

import Helika, { EventsBaseURL, SocialConnect } from "helika-sdk";
import { Button, Colors, Textfield, ErrorBanner } from 'helika-ui-sdk'

export default function Home() {

  const [sdk, setSdk] = useState(undefined);
  const [apiKey, setApiKey] = useState('8880461ddbd12d9478ba7a9fb48afc');
  const [resp, setResp] = useState('');
  const [title, setTitle] = useState('');
  const [editableUserDetails, setEditableUserDetails] = useState(`{
      "user_id": 3, 
      "email": "paul@helika.io", 
      "wallet": "0x71036D36B0908393CCd9badf5Daa2fea81E90C2C", 
      "other_detail": "awesome"
  }
      `);
    const [editableAppDetails, setEditableAppDetails] = useState(`{
    "platform_id": "web",
    "client_app_version": "1.0.0",
    "store_id": "our_company_store",
    "source_id": "google"
  }`);

  let helikaSdkConnect = new Helika.SOCIAL_CONNECT(
    '8880461ddbd12d9478ba7a9fb48afc', //sdk api key
    'helika_portal', // game id
    SocialConnect.SOCIAL_SANDBOX, // imx env
    false, // pii tracking
    { // imx project details
        publishableKey: 'sk_imapik-test-9zMB25s6NprmiVErwq1u_689b31',
        clientId: 'EuUyW1NddppNe12smSKFxrX65nyiOX4Z',
        redirectUri: `http://localhost:3002/imx/login`, // replace with one of your redirect URIs from Hub
        logoutRedirectUri: `http://localhost:3002/`, // replace with one of your logout URIs from Hub
    }
  )

  async function intiateIMXConnect() {
    try {
        let resp = await helikaSdkConnect.connectImx((resp) => {
          // do something with the resp
          console.log('resp1',resp)
        })
        // do something with the resp
        console.log('resp2',resp)
    } catch (e) {
        console.error(e)
    }
  }

  const handleChangeTitle = (event) => {
    setTitle(event.target.value)
  }

  async function initiateSdk() {
    if (!apiKey || apiKey.trim()?.length < 10) {
      setResp('Must enter a valid API Key.');
      console.error('Must enter a valid API Key.');
      return;
    }
    const helikaSDK = new Helika.EVENTS(apiKey, 'paul_test',EventsBaseURL.EVENTS_DEV, true);
    setSdk(helikaSDK);
    helikaSDK.setSecurityKey('3305684989349119207')
    helikaSDK.startSession()
    setResp('SDK Session initiated, session create event sent. Check network to view payload/response.');
  }

async function logoutImx() {
  try {
    console.log('logging out')

      await helikaSdkConnect.logoutImx()
      window.location.reload()
  } catch (e) {
      console.error(e)
  }
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
        event_sub_type: "trial",
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

  console.log(sdk)

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
      <div className={styles.openSans}>
        API Key: Manage
      </div>
      <Button
          type={'Promo'}
          disabled={true}
          handleClick={()=>{}}
          icon='Next'
          iconPosition='Right'
          className='openSans'
        >
          Manage
        </Button>

        <div style={{
          height: '2em'
        }}>

        </div>
      <input
        type='text'
        value={apiKey}
        onChange={(e) => {
          setApiKey(e.target.value);
        }}
      />
      <button
        onClick={initiateSdk}
        style={{ margin: '1em 0 0 0' }}
      >
        Inititate SDK
      </button>
      <button
        onClick={()=>{
          sdk.crea
        }}
        style={{ margin: '1em 0 0 0' }}
      >
        Create Session
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
          sdk.setPIITracking(true)
        }}
        style={{ margin: '1em 0 2em 0' }}
      >
        Set PII true
      </button>
      <button
        onClick={()=>{
          sdk.setPIITracking(false)
        }}
        style={{ margin: '1em 0 2em 0' }}
      >
        Set PII false
      </button>

      <Textfield
      label={'hello'}
          value={title}
          onChange={handleChangeTitle}
          placeHolder='Enter title'
          sxProps={{}}
          //hasError={true}
          //disabled={true}
          //hint={'Hint'}
          //optional={false}
          type={'search'}
        />
      <button
        onClick={()=>{
          let details = sdk.getUserDetails()
        }}
        style={{ margin: '1em 0 0 0' }}
      >
        GET USER DETAILS
      </button>
      <button
        onClick={()=>{
          let details = sdk.getAppDetails()
        }}
        style={{ margin: '1em 0 0 0' }}
      >
        GET APP DETAILS
      </button>

      <button
        onClick={logoutImx}
        style={{ margin: '1em 0 0 0' }}
      >
        logoutImx
      </button>
      <button
        onClick={intiateIMXConnect}
        style={{ margin: '1em 0 0 0' }}
      >
        intiateIMXConnect
      </button>

      

      <div>App Details</div>
      <textarea
        style={{maxWidth: '50vw', width:'100%'}}
        rows={8}
        value={editableAppDetails}
        onChange={(e)=>{
          setEditableAppDetails(e.currentTarget.value)
        }}
      />

      <div>User Details</div>
      <textarea
        style={{maxWidth: '50vw', width:'100%'}}
        rows={10}
        value={editableUserDetails}
        onChange={(e)=>{
          setEditableUserDetails(e.currentTarget.value)
        }}
      />

      <div className={styles.myHalf}>Result:</div>

      <textarea
        style={{maxWidth: '50vw', width:'100%'}}
        rows={5}
        value={resp}
        onChange={()=>{}}
      />
      
        
    </div>
  );
}
