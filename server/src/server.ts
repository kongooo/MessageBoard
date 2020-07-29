import path from 'path';
import serve from 'koa-static';
import router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import Koa from 'koa';

import "reflect-metadata";

import { Message } from "./entity/Message"
import { Comment } from './entity/Comment'
import { connect } from './pw'

const app = new Koa();

const temp_path = path.join(__dirname, '../../dist');

const main = serve(temp_path);

const home = new router();

let messages: JSON[] = new Array();

let comments: JSON[][] = new Array();

function loading() {
    return connect.then(async connection => {

        messages = [];
        comments = [];

        let MessageRepository = await connection.getRepository(Message);

        const ms = await MessageRepository.find({ relations: ["comments"] });

        let i = 0;
        ms.forEach(m => {
            let temp = JSON.parse(JSON.stringify(m));
            temp.time = GetLocalTime(new Date(m.time));
            messages.push(temp);

            comments[i] = new Array();
            let cs = m.comments;
            cs.forEach(c => {
                comments[i].push(JSON.parse(JSON.stringify(c)));
            })
            i++;
        });

    }).catch(error => console.log(error));
}

function saveMessage(ctx: any) {
    connect.then(async connection => {

        let newMes = new Message();
        newMes.name = ctx.request.body.name;
        newMes.email = ctx.request.body.email;
        newMes.time = ctx.request.body.time;
        newMes.content = ctx.request.body.content;
        newMes.index = messages.length;
        newMes.comments = new Array();

        messages.push(JSON.parse(JSON.stringify(newMes)));

        connection.manager.save(newMes);

    }).catch(error => console.log(error));
}

function saveComment(ctx: any) {
    connect.then(async connection => {
        let newCom = new Comment();
        newCom.name = ctx.request.body.name;
        newCom.content = ctx.request.body.content;
        newCom.replyName = ctx.request.body.replyName;
        let parent = await connection.getRepository(Message).find({ index: ctx.request.body.index });
        if (parent != null) {
            newCom.message = parent[0];
            if (parent[0].comments === undefined) {
                parent[0].comments = new Array();
            }
            parent[0].comments.push(newCom);
        }
        connection.manager.save(newCom);
    })
}

home.get('/messages', async (ctx) => {
    await loading().then(() => {
        ctx.response.body = messages.length > 0 ? messages : null;
    })
}).get('/comments', async (ctx) => {
    ctx.response.body = comments.length > 0 ? comments : null;
}).put('/message', async (ctx) => {
    saveMessage(ctx);
}).put('/comment', async (ctx) => {
    saveComment(ctx);
})

app.use(main)
    .use(bodyParser())
    .use(home.routes())
    .use(home.allowedMethods());

app.listen(3001);

/*********************************************************************************/

function justifyNum(num: number) {
    return num < 10 ? "0" + num : num;
}

function GetLocalTime(date: Date) {
    let year = date.getFullYear(),
        month = justifyNum(date.getMonth() + 1),
        day = justifyNum(date.getDate()),
        hour = justifyNum(date.getHours()),
        minute = justifyNum(date.getMinutes()),
        seconds = justifyNum(date.getSeconds());
    return (
        year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + seconds
    );
}