import React from 'react'
import PropTypes from 'prop-types'
import { findNote, findFolder } from '../folderFinders'
import NotefulContext from '../NotefulContext'
import CircleButton from '../CircleButton/CircleButton'

class NoteListSide extends React.Component {
    static defaultProps = {
        history: {
            goBack: () => { }
        },
        match: {
            params: {}
        }
    }
    static contextType = NotefulContext;

    render() {
        const { notes, folders } = this.context
        const { noteId } = this.props.match.params;
        const note = findNote(notes, noteId) || {};
        const folder = findFolder(folders, note.folderId);
        return (
            <div className='NoteListSide'>
                <CircleButton
                    tag='button'
                    role='link'
                    onClick={() => this.props.history.goBack()}
                    className='NoteListSide__back-button'
                >
                    <br />
        Back
      </CircleButton>
                {folder && (
                    <h3 className='NoteListSide__folder-name'>
                        {folder.name}
                    </h3>
                )}
            </div>
        )
    }
}


export default NoteListSide

NoteListSide.propTypes = {
    notes: PropTypes.array,
    folders: PropTypes.array,
    noteId: PropTypes.string,
}