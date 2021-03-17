import React from 'react'
import Notes from '../Notes/Notes'
import NotefulContext from '../NotefulContext'
import PropTypes from 'prop-types'
import { findNote } from '../folderFinders'
import './NoteListMain.css'

class NoteListMain extends React.Component {
    static defaultProps = {
        history: {
            goBack: () => { }
        },
        match: {
            params: {}
        }
    }
    handleDeleteNote = noteId => {
        this.props.history.push(`/`)
    }

    static contextType = NotefulContext

    render() {
        const { notes = [] } = this.context
        const { noteId } = this.props.match.params
        console.log(notes, noteId, "looking for notes")
        const note = findNote(notes, noteId) || { content: '' }
        console.log(notes, "notes in context")
        return (
            <section className='NoteListMain'>
                <Notes
                    id={note.id}
                    name={note.name}
                    modified={note.modified}
                    onDeleteNote={this.handleDeleteNote}
                />
                <div className='NoteListMain__content'>
                    {note.content.split(/\n \r|\n/).map((para, i) =>
                        <p key={i}>{para}</p>
                    )}
                </div>
            </section>
        )
    }
}
export default NoteListMain;

NoteListMain.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        folderId: PropTypes.string.isRequired,
        modified: PropTypes.string.isRequired
    }))
}