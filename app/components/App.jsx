import React from 'react';

import MedicalViewer from './medicalViewer.jsx';


export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div>
				<MedicalViewer/>
			</div>
		);
	}
}
