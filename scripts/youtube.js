const youtubeVideoObj = new OfflineYoutube();
const youtubePlaylistObj = new OfflineYoutube();

async function youtube() {
    youtubeVideoObj.btnId = `download-youtube-video-btn-dg`;
    youtubePlaylistObj.btnId = `download-youtube-playlist-btn-dg`;

    youtubeVideoObj.removeNewButton();
    youtubePlaylistObj.removeButton();

    if (window.location.host.indexOf("youtube.com") !== -1) {
        if (window.location.pathname.indexOf("watch") !== -1) {
            youtubeVideoObj.btnContainer = "ytd-download-button-renderer";
            youtubeVideoObj.btnUrl = window.location.href;

            await youtubeVideoObj.makeNew();
        } else if (window.location.pathname.indexOf("short") !== -1) {
            youtubeVideoObj.btnContainer = "#navigation-button-down";
            youtubeVideoObj.btnUrl = window.location.href;

            await youtubeVideoObj.make();
        } else if (window.location.pathname.indexOf("playlist") !== -1) {
            youtubePlaylistObj.btnContainer = "#owner-container";
            youtubePlaylistObj.btnUrl = window.location.href;
            youtubePlaylistObj.service = "youtubeMultiDownloader";
            youtubePlaylistObj.addLocation = "after";

            await youtubePlaylistObj.make();
        }
    }
    observeHref("youtube");
}

docReady(youtube);
