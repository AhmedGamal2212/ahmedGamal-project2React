let CryptoJS = require("crypto-js");

function base64url(source) {
    // Encode in classical base64
    let encodedSource = null;

    encodedSource = CryptoJS.enc.Base64.stringify(source);

    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '');

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    return encodedSource;
}

function skipBase64Function(payload) {
    let tmp = [];

    for (let x = 0; x < payload.value.length; x++) {
        payload.value[x].image = "";

        tmp.push(payload.value[x]);
    }
    payload["value"] = tmp;

    return payload;
}

export const HMACSHA256 = (header, payload, secret, skipBase64) => {

    if (skipBase64) {
        payload = skipBase64Function(payload);
    }

    header = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    payload = CryptoJS.enc.Utf8.parse(JSON.stringify(payload));

    let signedString = base64url(header) + `.` + base64url(payload);

    let signature = CryptoJS.HmacSHA256(signedString, secret);

    signature = base64url(signature);

    signedString = signedString + '.' + signature

    return signedString
}

