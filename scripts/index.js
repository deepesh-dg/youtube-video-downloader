const primary = "green";
const primaryColor = "white";

class OfflineYoutube {
    btnId = "";
    btnContainer = "";
    btnContainerNode = null;
    btnUrl = "#";
    downloadType = "video";
    utmSource = "deepeshdg";
    btnRel = `noopener noreferrer`;
    btnHref = "#";
    btnTarget = `_blank`;
    btnText = `DOWNLOAD`;
    addLocation = "append";
    additionalcss = "";
    service = "yt5s";
    btnCreated = false;
    buttonElement = document.createElement("a");

    make() {
        return new Promise(async (resolve, reject) => {
            await myObserver(this.btnContainer, (btnContainer) => {
                this.makeDownloadButton();

                if (this.addLocation === "append")
                    if (this.btnContainerNode !== null)
                        btnContainer[this.btnContainerNode].appendChild(
                            this.buttonElement
                        );
                    else btnContainer.appendChild(this.buttonElement);
                else if (this.addLocation === "after")
                    if (this.btnContainerNode !== null)
                        btnContainer[this.btnContainerNode].after(
                            this.buttonElement
                        );
                    else btnContainer.after(this.buttonElement);

                this.btnCreated = true;
                resolve(true);
            });
            reject(false);
        });
    }

    makeNew() {
        return new Promise(async (resolve, reject) => {
            await myObserver(this.btnContainer, (btnContainer) => {
                this.makeNewDownloadButton(btnContainer);

                this.btnCreated = true;
                resolve(true);
            });
            reject(false);
        });
    }

    makeUrl() {
        let url = "#";

        if (this.service === "yt5s")
            url = `https://yt5s.com/en56?utmSource=${
                this.utmSource
            }&downloadType=${this.downloadType}&q=${encodeURI(this.setUrl())}`;
        else if (this.service === "youtubeMultiDownloader")
            url = `https://youtubemultidownloader.net/playlists.html?utmSource=${
                this.utmSource
            }&downloadType=${this.downloadType}&q=${encodeURI(this.setUrl())}`;

        return url;
    }

    makeNewDownloadButton(btnElement) {
        btnElement.removeAttribute("is-hidden");
        const downloadBtn = btnElement.children[0].children[0];
        downloadBtn.id = this.btnId;
        downloadBtn.href = this.makeUrl();
        downloadBtn.target = this.btnTarget;
        this.buttonElement = btnElement;
    }

    makeDownloadButton() {
        this.buttonElement.id = this.btnId;
        this.buttonElement.rel = this.btnRel;
        this.buttonElement.href = this.makeUrl();
        this.buttonElement.target = this.btnTarget;
        this.buttonElement.textContent = this.btnText;
        this.buttonElement.style.cssText = `
            padding: 10px 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 0px;
            outline: none;
            cursor: pointer;
            transition: 0.4s all;
            background-color: ${primary};
            color: ${primaryColor};
            font-size: 14px;
            text-decoration: none;
            ${this.additionalcss}
        `;
    }

    removeButton() {
        if (
            this.btnCreated &&
            document.querySelector(`#${this.btnId}`) !== undefined
        )
            document.querySelector(`#${this.btnId}`).remove();
        this.btnCreated = false;
    }

    removeNewButton() {
        if (this.btnCreated) {
            const att = document.createAttribute("is-hidden");
            this.buttonElement.setAttributeNode(att);
        }
    }

    setUrl(url = this.btnUrl) {
        if (url.indexOf("&") !== -1) return url.slice(0, url.indexOf("&"));

        return url;
    }

    ajaxRequest(
        options = null,
        ytUrl = "https://www.youtube.com/watch?v=hu8MHIBeG4M"
    ) {
        if (options === null || options === undefined) {
            options = {
                url: "https://yt5s.com/api/ajaxSearch",
                type: "POST",
                data: {
                    q: ytUrl,
                    vt: "home",
                },
            };
        }

        options.formData = [];
        for (const name in options.data) {
            if (Object.hasOwnProperty.call(options.data, name)) {
                options.formData.push(
                    encodeURIComponent(name) +
                        "=" +
                        encodeURIComponent(options.data[name])
                );
            }
        }
        options.formData = options.formData.join("&").replace(/%20/g, "+");

        const xhttp = new XMLHttpRequest();

        xhttp.addEventListener("error", function (event) {
            alert("Oops! Something went wrong.");
        });

        xhttp.addEventListener("load", function (event) {
            alert("success");
            console.log(this.responseText);
        });

        xhttp.open(options.type, options.url);
        xhttp.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded; charset=UTF-8"
        );
        xhttp.setRequestHeader("origin", "https://yt5s.com");
        xhttp.setRequestHeader("Referer", "https://yt5s.com");
        xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhttp.setRequestHeader("accept", "*/*");
        xhttp.send(options.formData);
    }
}

function myObserver(node, callback) {
    return new Promise((resolve, reject) => {
        let observe = setInterval(() => {
            const selectedNode = document.querySelector(node);
            if (selectedNode) {
                clearInterval(observe);
                callback(selectedNode);
                resolve(true);
            }
        }, 500);
    });
}

function docReady(fn, ...args) {
    // see if DOM is already available
    if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
    ) {
        // call on next available tick
        setTimeout(fn, 1, ...args);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

function observeHref(type, oldvalue) {
    undefined === oldvalue && (oldvalue = window.location.href);
    let clearcheck = setInterval(repeatcheck, 500, oldvalue);
    function repeatcheck(oldvalue) {
        if (window.location.href !== oldvalue) {
            // do something
            clearInterval(clearcheck);
            if (type === "youtube") youtube();
            if (type === "youtubeMusic") youtubeMusic();
        }
    }
}
