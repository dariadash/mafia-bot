
const roles = {
    mafia: 3,
    doktor: 1,
    commisar: 1,
    nightButterfly: 1,
    citizens: 9999
}

module.exports.getRandomRole = () => {
    const randomKey = Object.keys(this.roles);
    const randomRole = randomKey[Math.floor(Math.random() * randomKey.length)];
    if(roles[randomRole] === 0){
       return this.getRandomRole()
    }
    roles[randomRole]--;
    return randomRole;
}

module.exports.roles = roles

module.exports.setMafia = (newMafiaCount) => {
    roles.mafia = newMafiaCount
}

module.exports.setDoktor = (newCount) => {
    roles.doktor = newCount
}

module.exports.setComissar = (newCount) => {
    roles.commisar = newCount
}
            
module.exports.computeCitizensCount = (playersCount) => {
    roles.citizens = playersCount -
         roles.mafia - 
         roles.doktor - 
         roles.commisar - 
         roles.nightButterfly
}

