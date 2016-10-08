import React from 'react';
import _ from 'lodash';
import {Row, Col, Grid} from 'react-bootstrap';
import CuiViewer from './cuiViewer.jsx';
import ConceptModal from './conceptModal.jsx'

const styles = {
	mainContainer: {
		width: '90%',
		marginBottom: '20px',
		position: 'relative'
	},
	title:{
		textAlign: 'center',
		marginLeft: '40px'
	},
	searchBoxes: {
		marginLeft: '40px',
		marginTop: '40px'
	},
	button: {
		width: '145px',
		borderColor: '#5e8edb',
		backgroundColor: "white",
		borderRadius: '5px',
		marginTop: '10px'
	},
	errorText: {
		marginTop: '20px',
		marginRight: '40px',
		textAlign: 'center',
		color: 'red',
		fontStyle: 'italic',
	},
	noConceptError: {
		textAlign: "center",
		fontStyle: 'italic',
	},
	conceptsContainer: {
		marginTop: '40px',
		marginLeft: '40px'
	},
	textBox: {
		marginTop: '10px',
		marginLeft: '-10px'
	},
	compareContainer: {
		textAlign: 'center',
		marginTop: '100px',
	},
	noCompareData: {
		marginTop: '30px',
		textAlign: 'center'
	},
	comparableDAtaContainer: {
		backgroundColor: '#edf3ff'
	}
};

var MedicalViewer = React.createClass({

	getInitialState() {
		return {
			noConceptError: "Concept was not found",
			modal: false
		};
	},

	getCui(value, text, modal) {
		var request = new XMLHttpRequest();
		
		var url = "https://api.lexigram.io/search?q=" + value + "%22&apikey=lxg123321";
		request.open("GET", url);
		var that = this;

		request.onreadystatechange = function() {
			if (request.readyState != 4 || request.status != 200) {
				return;
			}
			var response = JSON.parse(request.responseText);
			var states = {};
			states['hasFoundComparables'] = false;

			if(modal){
				states['modal'] = true;

			}
			states[text] = response[0] || null;
			that.setState(states);
		};
		request.send();    
	},

	cuiTextBoxChange(e){
		var states = {noCuisError: null};
		states[e.target.name] = e.target.value;
		this.setState(states);
	},

	getCuis(){
		if(this.state.cuiOne && this.state.cuiTwo){
			this.getCui(this.state.cuiOne, "conceptOne");
			this.getCui(this.state.cuiTwo, "conceptTwo");
		}
		else{
			this.setState({noCuisError: "**please make sure you fill in both text fields to make a search"});
		}
	},

	displayParentModal(value){
		this.getCui(value, "modalCui", true);
	},

	closeModal(){
		this.setState({modal: false});
	},

	render() {
		return (
			<div>
				<Grid style= {styles.mainContainer} >
					<Row style= {styles.title}>
						<h2>Medical Concept Comparator </h2>
					</Row>
					<Row style= {styles.searchBoxes}>
						<Col sm={5}>
							<input type="text" style={styles.textBox} name = "cuiOne" onChange = {this.cuiTextBoxChange} placeholder=" ex: C0021400" />

						</Col>
						<Col sm={4}>
							<input type="text"  style={styles.textBox} name = "cuiTwo" onChange = {this.cuiTextBoxChange} placeholder="ex: flu" />
						</Col>
						<Col sm={2}>
							<button onClick={this.getCuis} style={styles.button}> search terms</button>
						</Col>
					</Row>
					{this.state.noCuisError?
						<Row style={styles.errorText}>
							{this.state.noCuisError}
						</Row>
					:null}
					{(this.state.conceptOne || this.state.conceptTwo)?
						<Row style= {styles.conceptsContainer}>
							<Col md= {4}>
								{this.state.conceptOne?
									<CuiViewer data={this.state.conceptOne} displayParentModal= {this.displayParentModal} />
								:
									<div style= {styles.noConceptError}> 
										{this.state.noConceptError}
									</div>
								}
							</Col>
							<Col md= {1} style= {styles.compareContainer}>
							</Col>
							<Col md= {4}>
								{this.state.conceptTwo?
									<CuiViewer data= {this.state.conceptTwo} displayParentModal= {this.displayParentModal}/>
								:
									<div style={styles.noConceptError}> 
										{this.state.noConceptError}
									</div>
								}
							</Col>

						</Row>
					:null}

				</Grid> 
				{this.state.modal?
					<ConceptModal data={this.state.modalCui} closeModal= {this.closeModal} />
				:null}
			</div>
		);
  }
});


module.exports = MedicalViewer;
