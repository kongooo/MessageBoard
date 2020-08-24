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

function loading() {
    return connect.then(async connection => {

        let MessageRepository = await connection.getRepository(Message);

        const ms = await MessageRepository.find({ relations: ["comments"] });

        ms.map(m => {
            m.time = GetLocalTime(new Date(m.time));
        })
        return JSON.parse(JSON.stringify(ms));

    }).catch(error => console.log(error));
}

function saveMessage(ctx: any) {
    try {
        return connect.then(async connection => {

            let newMes = new Message();
            newMes.name = ctx.request.body.name;
            newMes.email = ctx.request.body.email;
            newMes.time = ctx.request.body.time;
            newMes.content = ctx.request.body.content;
            newMes.comments = ctx.request.body.comments;

            await connection.manager.save(newMes);
            let mes = await connection.getRepository(Message).findOne({ time: newMes.time, email: newMes.email, name: newMes.name });
            return mes.id;

        }).catch(error => console.log(error));
    } catch (e) {
        console.log(e);
    }
}

function saveComment(ctx: any) {
    try {
        return connect.then(async connection => {
            let newCom = new Comment();
            newCom.name = ctx.request.body.name;
            newCom.content = ctx.request.body.content;
            newCom.replyName = ctx.request.body.replyName;

            let parent = await connection.getRepository(Message).findOne(ctx.request.body.messageID);

            if (parent != null) {
                newCom.message = parent;
                if (parent.comments === undefined) parent.comments = [];
                parent.comments.push(newCom);
            }
            await connection.manager.save(newCom);
        })

    } catch (e) {
        console.log(e);
    }
}

home.get('/messages', async ctx => {
    await loading().then(v => {
        ctx.response.body = v;
    })
}).post('/message', async ctx => {
    await saveMessage(ctx).then(v => {
        ctx.response.body = v;
    })
}).post('/comment', async ctx => {
    await saveComment(ctx).then(() => {
        ctx.response.status = 200;
    })
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