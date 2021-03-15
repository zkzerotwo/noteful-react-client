import React from 'react'

const NotefulContext = React.createContext({
    folders: [], 
    notes: [],
    addNote: () => {},
    deleteNote: () => {}, 
    addFolder: () => {},
    deleteFolder: () => {}
})

export default NotefulContext