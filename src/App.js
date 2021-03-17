import './App.css';
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
// import store from './store'
import config from './config'
import NotefulContext from './NotefulContext'
import FoldersListMain from './FoldersListMain/FoldersListMain'
import FolderListSide from './FolderListSide/FolderListSide'
import NoteListSide from './NoteListSide/NoteListSide'
import NoteListMain from './NoteListMain/NoteListMain'
import AddFolder from './AddFolder/AddFolder'
import AddNote from './AddNote/AddNote'
import ErrorBoundary from './ErrorBoundary'
import Header from './Header'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			folders: [],
			notes: [],
		}
	}
	componentDidMount() {
		Promise.all([
			fetch(`${config.API_ENDPOINT}/notes`),
			fetch(`${config.API_ENDPOINT}/folders`)
		])
			.then(([notesRes, foldersRes]) => {
				if (!notesRes.ok)
					return notesRes.json().then(e => Promise.reject(e));
				if (!foldersRes.ok)
					return foldersRes.json().then(e => Promise.reject(e));
				return Promise.all([notesRes.json(), foldersRes.json()]);
			})
			.then(([notes, folders]) => {
				this.setState({ notes, folders });
			})
			.catch(error => {
				console.error({ error });
			});
	}
	handleDeleteNote = noteId => {
		this.setState({
			notes: this.state.notes.filter(note => note.id !== noteId)
		})
	}
	handleAddNote = note => {
		this.setState({
			notes: [...this.state.notes, note]
		})
	}
	handleAddFolder = folder => {
		this.setState({
			folders: [...this.state.folders, folder]
		})
	}

	renderSide() {
		return (
			<>
				{['/', '/folders/:folderId'].map(path => (
					<Route
						exact
						key={path}
						path={path}
						component={FolderListSide}
					/>
				))}
				<Route
					path="/notes/:noteId"
					component={NoteListSide}
				/>
				<Route
					path="/add-folder"
					component={AddFolder} />
				{/* <Route path="/add-note" component={AddNote} /> */}

			</>
		);

	}
	renderMain() {
		// console.log(this.state)
		return (
			<div>
				{['/', '/folders/:folderId'].map(path => (
					<Route
						exact
						key={path}
						path={path}
						component={FoldersListMain}
					/>
				))}
				<Route
					path="/notes/:noteId"
					component={NoteListMain}
				/>
				<Route
					path="/add-note"
					component={AddNote} />
			</div>
		);
	}
	render() {
		const contextValue = {
			notes: this.state.notes,
			folders: this.state.folders,
			deleteNote: this.handleDeleteNote,
			addFolder: this.handleAddFolder,
			addNote: this.handleAddNote
		}
		// console.log(contextValue)
		// console.log("I'm here hello!")
		// console.log(store)
		return (
			<ErrorBoundary>
				<NotefulContext.Provider
					value={contextValue}
				>
					<div
						className="App">
						<Header />
						<nav
							className="App__nav">{this.renderSide()}</nav>
						<main
							className="App__main">
							{this.renderMain()}
						</main>
					</div>
				</NotefulContext.Provider>
			</ErrorBoundary>
		)
	};
}

export default App;
