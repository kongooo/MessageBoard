export { GetMessages, GetComments, SaveMessage, SaveComment };

type HTTPMethods = 'GET' | 'POST' | 'PUT';

function myFetch(meth: HTTPMethods, url: string, data?: any) {
    return fetch(url, {
        method: meth,
        body: data,
        headers: data == undefined ? undefined : new Headers({
            'Content-type': "application/json"
        })
    });
}

async function GetMessages() {
    let t = await myFetch('GET', './messages');
    let res = await t.json();
    return JSON.stringify(res);
}

async function GetComments() {
    let t = await myFetch('GET', './comments');
    let res = await t.json();
    return JSON.stringify(res);
}

async function SaveMessage(message: any) {
    await myFetch('POST', './message', message);
}

async function SaveComment(comment: any) {
    await myFetch('POST', './comment', comment);
}