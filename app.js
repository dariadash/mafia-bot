const fs = require('fs');
const rolesModule = require('./roles')
const { bot } = require('./bot')
const {checkUserExist, removeUser, savePlayersState, isAdmin} = require('./helpers')

let listOfPlayersJSON = fs.readFileSync('listOfPlayers.JSON')
const listOfPlayers = JSON.parse(listOfPlayersJSON);

bot.start((ctx) => ctx.reply('Welcome to the mafia zone 😈'))

bot.hears('join', (ctx)=> {
    let userId = ctx.chat.id;
    let userLogin = ctx.chat.username;
    const isExist = checkUserExist(userId, listOfPlayers);
    if(isExist){
        ctx.reply("такой пользователь уже есть")
        return
    }
    listOfPlayers.push({id:userId, login:userLogin});
    savePlayersState(listOfPlayers)
    ctx.reply(`ваш id: ${userId}`)
})

bot.hears('showPlayers', (ctx) => {
    if(!isAdmin(ctx.chat.id)){
        return
    }
    const players = curentPlayers
        .map(({username, role}) => `${username} - ${role} \n`)
    ctx.reply(players)
})

const curentPlayers = [];

bot.hears('giveRoles', (ctx) => {
    const {id} = ctx.chat;
    if(!isAdmin(id)){
        return
    }
    rolesModule.computeCitizensCount(listOfPlayers.length)
    for(let i = 0; i < listOfPlayers.length; i++){
        const player = listOfPlayers[i]
        let role = rolesModule.getRandomRole();
        curentPlayers.push({id: player.id, username: player.login, role})
        ctx.telegram.sendMessage(listOfPlayers[i].id, role)
    }
    console.log(curentPlayers)
})

bot.command('/setMafia', (ctx) =>{
    if(!isAdmin(ctx.chat.id)){
        return
    }
    const arg = ctx.update.message.text.split(' ')
    const arg1 = parseInt(arg[1])
    rolesModule.setMafia(arg1)
    ctx.reply(rolesModule.roles)
})

bot.command('/setDoktor', (ctx) =>{
    if(!isAdmin(ctx.chat.id)){
        return
    }
    const arg = ctx.update.message.text.split(' ')
    const arg1 = parseInt(arg[1])
    rolesModule.setDoktor(arg1)
    ctx.reply(rolesModule.roles)
})

bot.command('/setComissar', (ctx) =>{
    if(!isAdmin(ctx.chat.id)){
        return
    }
    const arg = ctx.update.message.text.split(' ')
    const arg1 = parseInt(arg[1])
    rolesModule.setComissar(arg1)
    ctx.reply(rolesModule.roles)
})

bot.hears('clear', (ctx) =>{
    if(!isAdmin(ctx.chat.id)){
        return
    }
    curentPlayers.length = 0;
        ctx.reply("давай по новой")
    console.log(curentPlayers)
})

bot.hears('leave', (ctx) =>{
    removeUser(ctx.chat.id, listOfPlayers)
    savePlayersState(listOfPlayers)
    ctx.reply("bye")
})

bot.launch()

