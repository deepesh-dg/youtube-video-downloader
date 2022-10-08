
const downloadAllObj = new OfflineYoutube();

async function youtubeMultiDownloader() {
    if(window.location.host.indexOf("youtubemultidownloader.net") !== -1) {

        if(window.location.pathname.indexOf("playlists.html") !== -1) {

            const url = new URL(window.location.href);
            if(url.searchParams.get('utmSource') === 'deepeshdg') {

                await myObserver('#cbQuality', SelectElement => SelectElement.selectedIndex = 0 );
                await myObserver('input#inputPlaylist', inputElement => {
                    inputElement.value = url.searchParams.get('q');
                    inputElement.dispatchEvent(new Event('input', {bubbles:true}));
                });

                downloadAllObj.btnId = 'downloadAll';
                downloadAllObj.service = null;
                downloadAllObj.btnContainer = '#lbStatus';
                downloadAllObj.btnContainerNode = 'parentElement';
                downloadAllObj.traverseNode = 'parent';
                downloadAllObj.addLocation = 'after';
                downloadAllObj.btnText = 'Download All';
                downloadAllObj.target = '_self';
                downloadAllObj.additionalcss = 'margin-top: 10px; border-radius: 4px;';

                downloadAllObj.make();

                downloadAllObj.buttonElement.addEventListener('click', async event => {
                    event.preventDefault();

                    await myObserver('#ListVideo', table => {
                        let downloadBtns = document.querySelectorAll('#ListVideo a[download]');
                        let totalVideo = downloadBtns.length;
                        let start = 0;
                        if( start < totalVideo ) {
                            let btn = downloadBtns[start];
                            window.open(btn.href, "_blank");

                            start++;
                        }
                        const downloadInterval = setInterval( () => {
                            if( start < totalVideo ) {
                                let btn = downloadBtns[start];
                                window.open(btn.href, "_blank");

                                start++;
                            } else
                                clearInterval(downloadInterval);
                        }, 30000);
                    });
                });
            }
        }
    }
}

docReady(youtubeMultiDownloader)
