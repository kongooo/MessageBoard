export { GetMessages, GetComments, SaveMessage, SaveComment };

type HTTPMethods = 'GET' | 'POST' | 'PUT';

function myFetch(meth: HTTPMethods, url: string, data?: any) {
    return fetch(url, {
        method: meth,
        body: data,
        headers: data == undefined ? undefined : new Headers({
            'Content-type': "application/json"
        })
    }).then(response => response.json());
}

async function GetMessages(){
    let t = await myFetch('GET', './messages');
    return JSON.stringify(t);
}

async function GetComments(){
    let t = await myFetch('GET', './comments');
    return JSON.stringify(t);
}

async function SaveMessage(message:any){
    await myFetch('PUT', './message', message);
}

async function SaveComment(comment:any){
    await myFetch('PUT', './comment', comment);
}