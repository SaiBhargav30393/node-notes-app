const fs = require('fs')

const chalk = require('chalk')

const addNote = (title, body)=>{
    const notes  = loadNotes()
    const duplicateNotes = notes.filter((note)=>note.title === title)
    if(duplicateNotes.length === 0){
        notes.push({
            title:title,
            body:body
        })
        savedNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else{
        console.log(chalk.red.inverse('Note title taken!'))
    }
}
 
const removeNote = (title)=>{
    const notes = loadNotes()
    if(notes.length === 0){
        console.log(chalk.red.inverse('The Note is empty cannot remove'))
    }
    else{
        const match = notes.filter((note)=>note.title != title)
        if(notes.length === match.length){
            console.log(chalk.red.inverse('No matching Title'))
        }
        else{
            console.log(chalk.green.inverse('Element removed'))
        }
        savedNotes(match)
    }
}

const listNotes=()=>{
    console.log(chalk.cyan.inverse("Your Notes"))
    const notes = loadNotes()
    notes.forEach((note)=>{
        console.log(note.title)
    })
}

const readNote = (title)=>{
    const notes = loadNotes()
    const disNote = notes.find((note)=>note.title === title) 
    if(disNote){
        console.log(chalk.yellowBright.inverse(disNote.title))
        console.log(disNote.body)
    }else{
        console.log(chalk.redBright.inverse('Title not found'))
    }
}
const savedNotes = (notes)=>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = ()=>{
    try{
        const dataBuffer = fs.readFileSync('notes.json').toString()
        return JSON.parse(dataBuffer)
    }catch(e){
        return []
    }
}
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}