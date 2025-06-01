console.log("[AdSkipper] 👉 content.js is running");

const AD_BANNER_SELECTOR   = '[data-testid="context-item-info-ad-subtitle"]';
const SKIP_BUTTON_SELECTOR = '[data-testid="control-button-skip-forward"]';

let wasMutedByExtension = false;

function getSpotifyAudioElement(){
    // Try to grab audio from inside a <spotify-player> shadow root
    const player = document.querySelector('spotify-player');
    if(player && player.shadowRoot){
        return player.shadowRoot.querySelector('audio');
    }
    // Fallback to any top-level <audio> if it exists
    return document.querySelector('audio');
}

function muteSpotifyAudio(){
    const audioEl = getSpotifyAudioElement();
    if(audioEl && !audioEl.muted){
        audioEl.muted = true;
        wasMutedByExtension = true;
        console.log('Spotify audio muted by extension.');
    }
}

function unmuteSpotifyAudio(){
    const audioEl = getSpotifyAudioElement();
    if(audioEl && wasMutedByExtension){
        audioEl.muted = false;
        wasMutedByExtension = false;
        console.log('Spotify audio unmuted by extension.');
    }
}

function clickSkipButton(){
    const skipBtn = document.querySelector(SKIP_BUTTON_SELECTOR);
    if(skipBtn){
        skipBtn.click();
        console.log('Skip button clicked.');
    }
}

function isAdPlaying(){
    return !!document.querySelector(AD_BANNER_SELECTOR);
}

function checkForAdAndHandle(){
    if(isAdPlaying()){
        muteSpotifyAudio();
        clickSkipButton();
    } else {
        unmuteSpotifyAudio();
    }
}

window.addEventListener("DOMContentLoaded", () => {
    console.log('Spotify Ad Blocker extension loaded.');
    setInterval(checkForAdAndHandle, 1000);
});
