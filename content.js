console.log("[AdSkipper] 👉 content.js is running");

const AD_BANNER_SELECTOR = '[data-testid="ad-banner"]';
const SKIP_BUTTON_SELECTOR = '[data-testid="control-button-skip-forward"]';
const AUDIO_TAG_SELECTOR = 'audio';

let wasMutedByExtension = false;

function muteSpotifyAudio(){
    const audioEl = document.querySelector(AUDIO_TAG_SELECTOR);
    if(audioEl && !audioEl.muted){
        audioEl.muted = true;
        wasMutedByExtension = true;
        console.log('Spotify audio muted by extension.');
    }
}

function unmuteSpotifyAudio(){
    const audioEl = document.querySelector(AUDIO_TAG_SELECTOR);
    if(audioEl && audioEl.muted){
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
    }

    else{
        unmuteSpotifyAudio();
    }
}

window.addEventListener("DOMContentLoaded", () => {
    console.log('Spotify Ad Blocker extension loaded.');
    setInterval(checkForAdAndHandle, 1000);
});