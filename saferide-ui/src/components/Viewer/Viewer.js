import React from 'react'
import { Director, View } from '@millicast/sdk';

const Viewer = () => {
  const videoPlayer = document.getElementById("vidstream");
  
  const connect = async() => {
    function addStreamToYourVideoTag(mediaTrack) {
        // Takes in a stream and assigns it to the <video> element
        videoPlayer.srcObject = mediaTrack;
        videoPlayer.hidden = false;
        videoPlayer.autoplay = true;
        console.log("rub");
    }
    const tokenGenerator = () => Director.getSubscriber({
		streamName: "stream1",
		streamAccountId: "x4vr8f",
	});
    const millicastView = new View('stream1', tokenGenerator);


    const options = {
		disableVideo: false,
		disableAudio: true,
		bandwidth: 0, //Sets it to the max (un-throttled)
	};

	//Add stream to the video tag.
	millicastView.on("track", (event) => {
		addStreamToYourVideoTag(event.streams[0]);
	});

    try {
	  await millicastView.connect(options);
		// Broadcasts can be started from the Dolby.io Dashboard https://streaming.dolby.io/#/tokens
	} catch (e) {
		console.log("Connection failed, handle error", e);
		millicastView.reconnect();
	}

  }


  return (
    <div>
        <video id="vidstream" hidden controls onLoad={connect}/>
    </div>
  )
}

export default Viewer