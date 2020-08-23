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
    try {
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
            ctx.response.status = 200;

        }).catch(error => console.log(error));
    } catch (e) {
        console.log(e);
    }
}

function saveComment(ctx: any) {
    try {
        connect.then(async connection => {
            let newCom = new Comment();
            newCom.name = ctx.request.body.name;
            newCom.content = ctx.request.body.content;
            newCom.replyName = ctx.request.body.replyName;

            let i = ctx.request.body.index;
            if(comments[i]===undefined) comments[i] = [];
            comments[i].push(JSON.parse(JSON.stringify(newCom)));

            let parent = await connection.getRepository(Message).find({ index: ctx.request.body.index });
            if (parent != null) {
                newCom.message = parent[0];
                if (parent[0].comments === undefined) {
                    parent[0].comments = [];
                }
                parent[0].comments.push(newCom);
            }
            connection.manager.save(newCom);
            ctx.response.status = 200;
        })
    } catch (e) {
        console.log(e);
    }
}

loading();

home.get('/messages', async (ctx, next) => {
    ctx.response.body = messages.length > 0 ? messages : null;
}).get('/comments', async (ctx, next) => {
    ctx.response.body = comments.length > 0 ? comments : null;
    await next();
}).post('/message', async (ctx, next) => {
    saveMessage(ctx);
    await next();
}).post('/comment', async (ctx, next) => {
    saveComment(ctx);
    await next();
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