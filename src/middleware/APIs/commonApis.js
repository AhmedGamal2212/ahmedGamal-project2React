import axios from "axios";
import { HMACSHA256 } from "./jwt";

const sha256 = require("js-sha256");

export const appID = 6; // Discovery Application ID

export const clientSideId = 4; // Client side ID


export const ACCOUNT_TYPES = {
    ADMIN: 1,
    CLIENT: 2,
    CONTENT_CREATOR: 3
};

export const loanTypeArray = [
    "CONSTRUCTION FINANCE",
    "INVESTMENTS",
    "LEASE TO OWN",
    "MORTGAGE",
]

export const globalCount = 30;

const eventTimeouts = 30000;

export const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const Regions = ["Arusha", "Dar es Salaam", "Dodoma", "Geita", "Iringa", "Kagera", "Katavi", "Kigoma",
    "Kilimanjaro", "Lindi", "Manyara", "Mara", "Mbeya", "Morogoro", "Mtwara", "Mwanza",
    "Njombe", "Pemba Kaskazini", "Pemba Kusini", "Pwani", "Rukwa", "Shinyanga",
    "Simiyu", "Singida", "Songwe", "Tabora", "Tanga", "Unguja Kaskazini", "Unguja Magharibi",
    "Unguja Kusini"];

// const cryptr = new Cryptr("dc2c5abc8047146f85ded3096c88274536976dfcd");


/**
 * eLearning URL as of 12th March 2022
 * @type {string}
 */
export const BASE_URL = 'https://api.raymahouseofmakeup.co.tz:8586/';

export const ASSETS_BASE_URL = "https://rayma.s3-eu-west-1.amazonaws.com/uploads/";

export const FILE_STORAGE = ASSETS_BASE_URL;

export const APICALLLIMIT = 15;

const MAX_FILE_SIZE = 10000000;
const MAX_FILE_SIZE_LABEL = "10MB";


//constants for jwt headers
const JWT_HEADER = {
    alg: "HS256",
    typ: "JWT",
};


const authorizationHeader = "d3096c88274536976dfcd54231104769da6790061507b63424e";
let tokenHeader = "rayma-admin";
let UTCTime = null;


let secretResponse = null;
let expiresOn = 0;

function authorizationHeaderGenerator() {
    let time = new Date().getTime();
    time = Math.floor(time / 1000);
    UTCTime = time;

    let tmp = sha256.create();
    tmp.update(time + "." + authorizationHeader + "." + time)
    tmp = tmp.hex();

    return tmp;
};


async function gettingSecretKey() {

    let time = new Date().getTime();
    time = Math.floor(time / 1000);

    if (time >= expiresOn) {
        const headers = {
            Authorization: "Bearer " + authorizationHeaderGenerator(),
            tokenHeader,
            requestUTC: UTCTime
        }

        const res = await networkCalls("get-jwt-secret", null, "GET", eventTimeouts, headers);

        if (res.code === 200) {

            expiresOn = time + res.payload.timeToExpire;

        } else if (res.code === 403) { //403 Error code for failed to generate secret key

            expiresOn = 0;
            return gettingSecretKey();

        }
        return res;

    }

    return secretResponse
}



export async function networkRequest(
    url,
    payload,
    method = "POST",
    skipBase64 = false,
    timeoutAllowed = eventTimeouts
) {

    secretResponse = await gettingSecretKey();
    if (secretResponse.code !== 200) {
        return secretResponse;
    }


    let headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
    };

    if (payload === null) {
        payload = { url }
    }

    headers[secretResponse.payload.tokenHeader] = HMACSHA256(JWT_HEADER, payload, secretResponse.payload.secret, skipBase64);

    let response = { payload: null, message: null, code: 0 };

    try {
        response = await networkCalls(url, payload, method, timeoutAllowed, headers);

        if (response.code === 406) { //406 Error code for failed signature verification. 
            expiresOn = 0;
            return networkRequest(url, payload, method);
        }
    } catch (e) {
        return e
    }


    return response;
}


/**
 * All API calls function
 * @param url
 * @param payload
 * @param method
 * @param timeoutAllowed
 * @returns {Promise<*|{code: number, payload: null, message: null}>}
 */
export async function networkCalls(url, payload, method = 'POST', timeoutAllowed = eventTimeouts,
    headers = { "Accept": "application/json", "Content-Type": "application/json" }) {

    let response = { payload: null, message: null, code: 0 };

    url = BASE_URL + url;
    let axiosResponse = (response.payload = await axios({
        method: method,
        url: url,
        data: payload,
        headers: headers,
        timeout: timeoutAllowed,
        withCredentials: true,
    }));

    return axiosResponse.data;

}


/**
 * Random password generation
 * @returns {string}s
 */
export function randomPasswordGenerator() {
    let passwd = '';
    const chars = 'ABCDEFGHIJKLMNlmnopqrst0123456789uvwxyzOPQRSTUVWXYZabcdefghijk0123456789';
    for (let i = 1; i < 9; i++) {
        let c = Math.floor(Math.random() * chars.length + 1);
        passwd += chars.charAt(c)
    }
    return passwd;
}

export async function download(url) {
    try {
        let axiosResponse = await networkRequest(url, null, "GET")
        let link = document.createElement('a');
        link.setAttribute('href', ASSETS_BASE_URL + axiosResponse.payload);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.log(error.toString());
    }
}

export const validEmail = (e) => {
    let filter = /^\s*[\w\-+_]+(\.[\w\-+_]+)*@[\w\-+_]+\.[\w\-+_]+(\.[\w\-+_]+)*\s*$/;
    return String(e).search(filter) !== -1;
}


export function fileUpload(event, callBack, index) {
    if (window.File && window.FileReader) {
        let files = event.target.files;
        if (files.length > 0) {
            if (files[0].size > MAX_FILE_SIZE) {
                alert("File size can not exceed " + MAX_FILE_SIZE_LABEL);
                return;
            } else {
                let reader = new FileReader();

                // Closure to capture the file information.
                reader.onload = (function (theFile) {
                    return function (e) {
                        callBack(e.currentTarget.result, theFile.name, index);
                    };
                })(files[0]);

                reader.readAsDataURL(files[0]);
            }
        }
    } else {
        alert("Browser not supported");
    }
}

/* LARGE FILE UPLOAD */
const chunkSize = 10000000;
export async function breakUpFile(event,callback, index=0){
    const fileInput = event.target
    if(fileInput.files.length>0){
        let file = fileInput.files[0]
        return await upload(file,0,callback, index)
    }

    return false
} 

async function upload(file,currentChunk,callback,index){
    let sliceCount = 0

    if(chunkSize>=file.size){
        sliceCount = 1
    }else{
        sliceCount = Math.ceil(file.size/chunkSize)
    }

    let networkFile = {
        fileName:file.name,
        fileNameInTransit:"",
        fileType:file.type,
        totalChunks:sliceCount,
        currentChunk:0,
        payload:null,
        ID:null
    }

    const fileName = await processBlobs(file,networkFile,currentChunk,callback, index)
    if(fileName===false){
        return false
    }

    return fileName
}

async function processBlobs(file,networkFile,currentChunk,callback, index){

    let start = currentChunk * chunkSize 
    let end = start + chunkSize

    let blob = file.slice( start, end )		
    networkFile["payload"] = blob

    let form = new FormData()
    form.append("file",blob)
    form.append("fileName",networkFile["fileName"])
    form.append("fileNameInTransit",networkFile["fileNameInTransit"])
    form.append("currentChunk",currentChunk+1)
    form.append("totalChunks",networkFile["totalChunks"])

    const res = await submitFormToServer(form)
    if(res.code===200){
        networkFile["fileNameInTransit"] = res.payload
        callback(res.payload, ((( currentChunk / networkFile["totalChunks"] ) * 100 ).toFixed(0)+ "%"), index)
        currentChunk += 1
        if( currentChunk < networkFile["totalChunks"] ){
            return processBlobs(file,networkFile,currentChunk,callback)
        }else{
            return res.payload;
        }
    }else{
        alert("NETWORK ERROR")
    }


    return false

}

async function submitFormToServer(content){
            
    let res = await fetch(BASE_URL + "upload-file", {
        method: "POST",
        body: content
    });

    res = await res.json()
    
    return res
}


//this function returns a boolean value that either deactivates or activates the 
//menu item based on user priviledge supplied
//it should be called against a priviledge on a specific menu item on which 
//the given priviledge applies
export function ProcessPriviledge(priviledges = [], currentUserPriviledgeID = null, priviledge = null, targetPermission = null) {
    if (currentUserPriviledgeID === null || priviledges.length === 0 || priviledge === null || targetPermission === null) {
        return true
    }

    for (let x = 0; x < priviledges.length; x++) {
        if (priviledges[x].ID === currentUserPriviledgeID) {
            if (priviledges[x]["privilege_settings"][priviledge][targetPermission] === false) {
                return false
            }
        }

    }

    return true
}

export const applicationId = 4; //The application ID to be used on entire application

export function trimEntry(entry) {
    entry = entry.split(" ");
    entry = entry.join("");
    return entry;
}

export function numberWithCommas(number, withDecimal = false) {
    let decimalPart = '';
    number = parseFloat(number).toFixed(2);
    number = String(number)
    const tmp = number.split(".");
    if (tmp.length === 2) {
        number = tmp[0]
        decimalPart = tmp[1]
    }
    if (withDecimal === true) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + decimalPart;
    }

    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function isValidTZNo(number) {
    number = number.trim("");
    if (number === "") {
        return false;
    }
    if (number.length < 9 || number.length > 13) {
        return false;
    }

    if (number[0] === "0" && number.length === 10) {
        number = "+255" + number.substring(1);
        return number;
    } else if (number[0] !== 0 && number.length === 9) {
        number = "+255" + number;
        return number;
    } else if (number[0] === "+" && number.length === 13) {
        return number;
    } else if (
        number[0] === "2" &&
        number.length === 12 &&
        number[1] === "5" &&
        number[2] === "5"
    ) {
        number = "+" + number;
        return number;
    }

    return false;
}

export function Trim(text) {
    return text.trim();
};

export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";expires=Thu, 31 Dec 2030 11:59:00 UTC;path=/"
}

export function deleteCookie(cname) {
    document.cookie = cname + "=;expires=Thu, 31 Dec 2010 11:59:00 UTC;path=/"
}

export function iosCopyToClipboard(el) {
    var oldContentEditable = el.contentEditable,
        oldReadOnly = el.readOnly,
        range = document.createRange();

    el.contentEditable = true;
    el.readOnly = false;
    range.selectNodeContents(el);

    var s = window.getSelection();
    s.removeAllRanges();
    s.addRange(range);

    el.setSelectionRange(0, 999999); // A big number, to cover anything that could be inside the element.

    el.contentEditable = oldContentEditable;
    el.readOnly = oldReadOnly;
}

export function copyToClipBoard(text) {
    let tmpElement = document.createElement("textarea");
    tmpElement.value = text;
    tmpElement.setAttribute("readonly", "");
    tmpElement.style = { position: "absolute", left: "-9999px" };
    document.body.appendChild(tmpElement);
    // Select text inside element
    tmpElement.select();
    tmpElement.select();

    let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (iOS === true) {
        iosCopyToClipboard(tmpElement);
    }
    document.execCommand("copy");
    // Remove temporary element
    document.body.removeChild(tmpElement);
    alert("Umefanikiwa kukopi link");
}

export function storeUserData(data) {
    data = JSON.stringify(data);
    // data = encryptEntry(data);
    // console.log(data);
    localStorage.setItem("loggedInUser", data);
}

export async function getUserData() {
    let data = await localStorage.getItem("loggedInUser");
    if (data !== null) {
        // data = decryptEntry(data);
        data = JSON.parse(data);
        return data
    }
    return null;
}

window.currentUser = null;

export function formatDate(date, withTime = false) {
    try {

        let newDate = new Date(date)

        let response = newDate.getDate() + " " + Months[newDate.getMonth()] + " " + newDate.getFullYear()
        if (withTime) {
            response += " " + newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds()
        }

        return response

    } catch (e) {
        console.log(e)
    }
    return null
}

export function formatTime(date) {
    try {

        let newDate = new Date(date)

        let hour = newDate.getHours();
        let minutes = newDate.getMinutes();
        let seconds = newDate.getSeconds();

        if (hour < 10) {
            hour = "0" + hour
        }
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        if (seconds < 10) {
            seconds = "0" + seconds
        }

        let response = hour + ":" + minutes + ":" + seconds;

        return response

    } catch (e) {
        console.log(e)
    }
    return null
}

export function loanCalculations(target) {
    try {

        let loan = target.target_amount - (target.total_deposits - target.total_withdrawals - target.campaign_commission)
        return loan

    } catch (e) {
        console.log(e)
    }
    return null
}
export function balanceCalculations(target) {
    try {

        let balance = (target.total_deposits - target.total_withdrawals - target.campaign_commission)
        return balance

    } catch (e) {
        console.log(e)
    }
    return null
}
export function sortingProductTypes(productTypes) {
    try {

        let types = []
        for (let x = 0; x < productTypes.length; x++) {
            if (productTypes[x].type_name.toLowerCase() === 'business assets') {
                for (let y = 0; y < productTypes[x].categories.length; y++) {
                    types.push(productTypes[x].categories[y].category)
                    break
                }
            }
        }
        return types

    } catch (e) {
        console.log(e)
    }
    return null
}
export function insuranceCosts(productTypes, planProducts) {

    try {
        let insurance = 0;
        let found = false;
        for (let x = 0; x < planProducts.length; x++) {
            found = false

            for (let y = 0; y < productTypes.length; y++) {
                if (planProducts[x].type.toLowerCase() === productTypes[y].type_name.toLowerCase()) {

                    for (let z = 0; z < productTypes[y].categories.length; z++) {
                        if (productTypes[y].categories[z].category.toLowerCase() === planProducts[x].category.toLowerCase()) {
                            for (let a = 0; a < productTypes[y].categories[z].segments.length; a++) {
                                if (productTypes[y].categories[z].segments[a].name.toLowerCase() === planProducts[x].segment.toLowerCase()) {
                                    insurance += (parseFloat(planProducts[x].total_price) * parseFloat(productTypes[y].categories[z].segments[a].insurance_rate) / 100)
                                    found = true
                                    break
                                }
                            }
                        }

                        if (found === true) break
                    }
                }

                if (found === true) break
            }
        }

        return insurance

    } catch (e) {
        console.log(e)
    }
    return null
}

export const dummyData = [
    // {
    //     region: "Arusha", target_id: "22199", product_type_category: "Automobile", target_amount: "1500000",
    //     deposits: "800000", loan: "700000", p2pai: "14/6", bids_received: "0", score: "91", payment_period: "12"
    // },
    // {
    //         region: "Dodoma", target_id: "22855", product_type_category: "Automobile", target_amount: "970000",
    //     deposits: "580000", loan: "390000", p2pai: "16/15", bids_received: "10", score: "80", payment_period: "8"
    //     },
    // {
    //         region: "Mwanza", target_id: "22654", product_type_category: "Automobile", target_amount: "420000",
    //     deposits: "300000", loan: "120000", p2pai: "10/2", bids_received: "6", score: "86", payment_period: "18"
    //     },
    // {
    //         region: "Dar es salaam", target_id: "22267", product_type_category: "Automobile", target_amount: "640000",
    //     deposits: "460000", loan: "180000", p2pai: "18/7", bids_received: "4", score: "72", payment_period: "15"
    //     },
    {
        name: "Ally Athuman Kamboka", region: "Dar es salaam", target_id: "22656", product_type_category: "Automobile", target_amount: "2675000",
        deposits: "1950000", loan: "725000", p2pai: "13/9", bids_received: "1", score: "81", payment_period: "9", offer: "761250", rate: 20, period: 1
    },
    {
        name: "Anna Richard Namama", region: "Dar es salaam", target_id: "22644", product_type_category: "Automobile", target_amount: "1000000",
        deposits: "670000", loan: "330000", p2pai: "16/10", bids_received: "3", score: "88", payment_period: "16", offer: "450500", rate: 15, period: 1
    },
    {
        name: "Hassan Iddi Mnkeni", region: "Tanga", target_id: "22124", product_type_category: "Automobile", target_amount: "500000",
        deposits: "350000", loan: "150000", p2pai: "8/2", bids_received: "2", score: "82", payment_period: "15", offer: "1051750", rate: 15, period: 2
    },
    {
        name: "Emmanuel James Matonya", region: "Iringa", target_id: "22234", product_type_category: "Automobile", target_amount: "1370000",
        deposits: "820000", loan: "550000", p2pai: "11/7", bids_received: "7", score: "76", payment_period: "12", offer: "661200", rate: 20, period: 1.5
    },
    // {
    //         region: "Mbeya", target_id: "22876", product_type_category: "Automobile", target_amount: "850000",
    //     deposits: "600000", loan: "250000", p2pai: "14/10", bids_received: "6", score: "90", payment_period: "14"
    //     },
    // {
    //         region: "Kilimanjaro", target_id: "22456", product_type_category: "Automobile", target_amount: "3500000",
    //     deposits: "2500000", loan: "1000000", p2pai: "15/14", bids_received: "11", score: "85", payment_period: "15"
    //     },
]

export const dummyProducts = [{
    name: "Boxer motorcycle", total_price: "2675000", category: "Automobile", qty: "1"
}];

export function filterVimeoLink(link) {
    let tmp;

    tmp = link.split("/")
    if (tmp.length >= 4) {
        tmp = tmp[4]
        
        tmp = tmp.split("/")
        tmp = tmp[0]

        tmp = tmp.split("?")
        tmp = tmp[0]

    }

    return tmp;
}


