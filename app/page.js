"use client"

import styles from '../styles/Home.module.css';
import { useState } from "react";
import '../styles/global.css'

import Helika, { EventsBaseURL } from "helika-sdk";

export default function Home() {

  const [sdk, setSdk] = useState(undefined);
  const [apiKey, setApiKey] = useState('');
  const [resp, setResp] = useState('');

  async function initiateSdk() {
    if (!apiKey || apiKey.trim()?.length < 10) {
      setResp('Must enter a valid API Key.');
      console.error('Must enter a valid API Key.');
      return;
    }
    const helikaSDK = new Helika.EVENTS(apiKey, EventsBaseURL.EVENTS_DEV);
    setSdk(helikaSDK);
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
        id: 1,
        info: 'From Example Project, send event button'
      }
    }];

    let response = await sdk.createEvent(events);

    setResp(`Event sent: ${JSON.stringify(events[0])}`);
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Helika SDK Test</div>
      <div className={styles.mbHalfEm}>
        API Key:
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
        onClick={sendEvent}
        style={{ margin: '1em 0 0 0' }}
      >
        Send Event
      </button>

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
