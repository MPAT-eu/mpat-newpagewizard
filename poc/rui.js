class MpatNewPage {
    constructor(urlPage, urlLayout) {
        this.data = {};
        this.urlPage = urlPage !== undefined ? urlPage : `${wpApiSettings.root}${wpApiSettings.versionString}pages/?per_page=100`;
        this.urlLayout = urlLayout !==undefined ? urlLayout: `${wpApiSettings.root}mpat/v1/layout/?per_page=100`;
        
        this.raw = document.getElementById('raw');
        raw.style.fontSize = '0.8em';
        raw.style.fontFamily = 'monospace';
    }
    loadPages() {
        this.load(this.urlPage, this.showTxt.bind(this));
    }

    loadLayouts() {
        this.load(this.urlLayout, this.showTxt.bind(this));
    }

    load(url, cb) {
        const req = new XMLHttpRequest();
        req.onreadystatechange = (event) => {
            if (req.readyState === XMLHttpRequest.DONE) {
                if (req.status === 200) {
                    let txt = req.responseText;
                    cb(txt);
                    console.log(url, JSON.parse(txt));
                } else {
                    console.log(req.status, req.statusText);
                }
            }
        };
        req.open('GET', url, true);
        req.setRequestHeader('X-WP-Nonce', wpApiSettings.nonce);
        req.send(null);
    }

    format(txt) {
        return JSON.stringify(JSON.parse(txt), null, 6);
    }

    showTxt(txt) {
        this.data = JSON.parse(txt);
        this.raw.innerText = this.format(txt);
        //console.log('this.data', this.data);
    }
}