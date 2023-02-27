const fs = require('fs');
const { adminId } = require('./bot');

const isAdmin = (userId) => {
    if(userId === adminId){
        return true
    }
    return false
}

const checkUserExist = (userId, listOfPlayers) => {
    for (const player of listOfPlayers){
        if(player.id === userId){
            return true
        }
    }
    return false
}

const removeUser = (userId, listOfPlayers) => {
    for(let i = 0; i < listOfPlayers.length; i++){
        if(listOfPlayers[i].id === userId){
            listOfPlayers.splice(i, 1);
            return
        }
    }
}

function savePlayersState(listOfPlayers){
    const json = JSON.stringify(listOfPlayers);
    fs.writeFileSync('listOfPlayers.JSON', json)
}

module.exports = {
    savePlayersState,
    checkUserExist,
    removeUser,
    isAdmin
};