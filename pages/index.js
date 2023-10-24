import styles from '../styles/Home.module.css';
import { useState } from "react";

import Helika, { EventsBaseURL } from "helika-sdk";

export default function Home() {

  const [sdk, setSdk] = useState(undefined);
  const [apiKey, setApiKey] = useState('');

  async function initiateSdk() {
    if (!apiKey || apiKey.trim()?.length < 10) {
      console.error('Must have valid API Key');
      return;
    }
    const helikaSDK = new Helika.EVENTS(apiKey, EventsBaseURL.EVENTS_DEV);
    setSdk(helikaSDK);
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

    await sdk.createEvent(events);
  }

  return (
    <div className={styles.container}>
      <div>
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
    </div>
  );
}
