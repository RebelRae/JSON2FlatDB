const fs = require("fs")
const data = require('./database.json')
const hexChars = '0123456789ABCDEF'
const idStr = 'xxxx-xxxx-xxxx-xxxx'

newID = () => {
    let outStr = ''
    for(let i = 0; i < idStr.length; i++) 
        outStr += (idStr[i] == 'x')? hexChars[Math.floor(Math.random() * 16)] : '-'
    return outStr
}

parse = (node, parent = null) => {
    let newNode = {
        id: parent != null ? newID() : "0000-0000-0000-0000",
        parent: parent,
        name: node.name,
        clade: node.clade,
        synopsis: node.synopsis,
        data: node.data,
        period_from: node.period_from,
        period_to: node.period_to,
        status: node.status,
        tags: node.tags,
        synonyms: node.synonyms,
        children: []
    }
    node.children.forEach(child => { newNode.children.push(parse(child, newNode.id).id) })
    fs.open(`./final/${newNode.id}.json`, "w", (err, file)=>{
        if(err) console.log(err.message)
        else{
            fs.write(file, JSON.stringify(newNode, null, 4), (err, bytes) => {
                if(err) console.log(err.message)
                else console.log(bytes +' bytes written')
            })        
        }
    })
    return newNode
}

console.log(parse(data))
