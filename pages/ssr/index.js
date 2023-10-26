import Helika, { EventsBaseURL } from "helika-sdk";

export default function Page({ instance }) {

  let helikaSDK = new Helika.EVENTS(process.env.NEXT_PUBLIC_SDK_API_KEY, EventsBaseURL.EVENTS_DEV);
  
  return(
    <div style={{height:'100vh',display:'flex', flexDirection:'column', justifyContent:'center'}}>
      <div style={{display:'flex', flexDirection:'row', margin:'auto'}}>
        <button
          style={{width:'10em'}}
          onClick={async ()=>{
            try {
              let resp = await helikaSDK.startSession();
              console.log('Sent Session Start Event Response',resp);
            } catch(e){
              console.error(e);
            }
          }}
        >
          Initiate Session
        </button>
        <button
          style={{width:'10em', marginLeft:'2em'}}
          onClick={async ()=>{
            try {
              let resp = await helikaSDK.createEvent([
                {
                  game_id: 'NEXTJS PROJECT',
                  event_type: 'TEST',
                  event: {
                    info: 'Testing SDK'
                  }
                }
              ]);
              console.log(resp);
            } catch(e) {
              console.error(e);
            }
          }}
        >
          Send Event
        </button>
      </div>
    </div>
    
  );
}


// This gets called on every request
export async function getServerSideProps(params) {

  function initiateSdk() {
    let helikaSDK = null;
    if (typeof window !== 'undefined') {
      console.log('no window')      
    } else {
      helikaSDK = new Helika.EVENTS(process.env.NEXT_PUBLIC_SDK_API_KEY, EventsBaseURL.EVENTS_DEV, false);
    }
    return helikaSDK;
  }

  let instance = initiateSdk();
  
  return { props: { instance: JSON.parse(JSON.stringify(instance)) } }
}