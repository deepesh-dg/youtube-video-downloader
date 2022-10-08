async function yt5s() {
    if (window.location.host.indexOf("yt5s.com") !== -1) {
        const url = new URL(window.location.href);
        if (url.searchParams.get("utmSource") === "deepeshdg") {
            let interval = setInterval(async () => {
                await myObserver("#search-form button", (node) => node.click());
            }, 300000);

            await myObserver("#search-form", (node) => {
                const btn = document.createElement("a");
                btn.classList.add("btn-red");
                btn.target = "_blank";
                btn.textContent = "Open";

                btn.href = url.searchParams.get("q");
                node.append(btn);
            });

            await myObserver("#formatSelect", (node) => {
                if (url.searchParams.get("downloadType") === "audio")
                    node.selectedIndex = node.options.length - 1;
                else node.selectedIndex = 0;

                clearInterval(interval);
            });

            await myObserver("#btn-action", (node) => node.click());
            await myObserver("#asuccess:not(.hidden)", (node) => node.click());
        }
    }
}

docReady(yt5s);
