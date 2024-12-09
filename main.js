function reverse(string) {
    return string.split('').reverse().join('');
}

function sha256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);

    const buffer = crypto.subtle.digest('SHA-256', data);

    const arr = Array.from(new Uint8Array(buffer));
    const out = arr.map(byte => byte.toString(16).padStart(2, '0')).join('');

    return out;
}

function encrypt(string, pass, options) {
    const arr = string.split(' ');
    var count = 0;
    for (let i = 0; i < arr.length; i++) {
        if(count != arr[i].length) {
            count = arr[i].length + pass.length;
        }
        var arr2 = [...arr[i]];
        arr2[2] = (arr[i].charCodeAt(2)) + count;
        arr2.reverse();
        var str = arr2.join('')
        arr[i] = btoa(str);
    }
    var step2 = arr.join(`${options[0]}${pass}${options[1]}`);
    return reverse(reverse(btoa(reverse(step2))).split('E').reverse().join('IlG7'));
}

function decrypt(string, pass, options) {
    var step1 = string
    const arr = step1.split(`${options[0]}${pass}${options[1]}`);
    var count = 0;
    for (let i = 0; i < arr.length; i++) {
        if(count != arr[i].length) {
            count = arr[i].length + pass.length;
        }
        var arr2 = [...arr[i]];
        arr2[2] = (arr[i].charCodeAt(2)) - count;
        arr2.reverse();
        var str = arr2.join('')
        arr[i] = atob(str);
    }
    return arr.join(' ');
}