
const youtubeMusicObj = new OfflineYoutube();

async function youtubeMusic () {

    youtubeMusicObj.btnId = `download-youtube-music-btn-dg`;
    youtubeMusicObj.btnContainer = 'ytmusic-player-bar .middle-controls.style-scope.ytmusic-player-bar';
    youtubeMusicObj.btnUrl = window.location.href;

    youtubeMusicObj.removeButton();

    if(window.location.host.indexOf('music.youtube.com') !== -1 && window.location.pathname.indexOf('/watch') !== -1) {
        await youtubeMusicObj.make();
    }

    observeHref('youtubeMusic');

}

docReady( youtubeMusic);
