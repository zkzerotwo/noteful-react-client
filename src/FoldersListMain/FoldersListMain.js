import React from 'react'
import { Link } from 'react-router-dom'
import Notes from '../Notes/Notes'
import NotefulContext from '../NotefulContext'
import './FoldersListMain.css'
import { getNotesForFolder } from '../folderFinders'
import CircleButton from '../CircleButton/CircleButton'


class FoldersListMain extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }

    static contextType = NotefulContext

    render() {
        const { folderId } = this.props.match.params
        const { notes = [] } = this.context
        const notesForFolder = getNotesForFolder(notes, folderId)
        return (
            <section className='FoldersListMain'>
                <ul>
                    {notesForFolder.map(note =>
                        <li key={note.id}>
                            <Notes
                                id={note.id}
                                name={note.name}
                                modified={note.modified}
                            />
                        </li>
                    )}
                </ul>
                <div className='FoldersListMain__button-container'>
                    <CircleButton
                        tag={Link}
                        to='/add-note'
                        type='button'
                        className='FoldersListMain__add-note-button'
                    >
          Add Note +
        </CircleButton>
                </div>
            </section>
        )
    }
};

export default FoldersListMain;
