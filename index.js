const mojang = require("mojang-api")
const base64method = require("crypto-js/enc-base64")
const CryptoJS = require("crypto-js")

const getUUID = (username) =>{
    return new Promise((resolve, reject ) =>{
        try{
            mojang.nameToUuid(username, function(err, res) {
                if (err)
                    reject(err);
                else {
                    resolve(res[0].id);
                }
            });
        }catch(e){
            reject(e)
        }
    })
}

const getProfile = (uuid) =>{
    return new Promise((resolve, reject) =>{
        try{
            mojang.profile(uuid, function(err, res) {
                if (err)
                    reject(err)
                else {
                    resolve(res)
                }
            });
        } catch(e){
            reject(e)
        }
    })
}

const getSkinData = (base64) =>{
    let a = base64method.parse(base64)
    return JSON.parse(a.toString(CryptoJS.enc.Utf8))
}

(async () =>{
    const uuid = await getUUID("HoneyBadger4768")
    const profile = await getProfile(uuid)
    const skinVal = profile.properties[0].value
    const base = getSkinData(skinVal)
    const skin = base.textures.SKIN.url
    console.log(skin)
})()