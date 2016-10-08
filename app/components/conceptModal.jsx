import React from 'react';
import _ from 'lodash';
import {Row, Col, Grid} from 'react-bootstrap';

const styles = {
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0,0,0,0.6)',
		position: 'fixed',
		zIndex: '1',
		top: '0',
		bottom: '0'
	},
	modalContainer: {
	    backgroundColor: 'white',
        margin: '8% auto',
    	padding: '20px',
    	border: '1px solid #888',
    	width: '600px',
    	height: '350px'
	},
	closeButton: {
		color: "black",
		float: "right",
		fontSize: '29px',
		fontWeight: 'bold',
		cursor: 'pointer',
		marginRight: '-10px',
		marginTop: '-18px'
	},
	dataContainer: {
		marginTop: '40px',
		marginLeft: '50px',
		width: '95%'
	},
	titles: {
		marginBottom: '5px',
		textAlign: 'left',
		marginLeft: '-29px'
	},
	definition: {
	   marginTop: '10px',
	   marginBottom: '15px'
	},
	synonymTag: {
		height: '40px',
		marginRight: '15px',
		marginTop: '10px',
		display: 'inline',
		fontSize: '15px'
	},
	synonyms: {
		overflowY: 'scroll',
		marginLeft: '-28px',
		width: '500px',
		height: '150px'
	},
	
};

var ConceptModal = React.createClass({
	render() {
		var data = this.props.data;
		return (
			<Grid style= {styles.container}>
				<Row style= {styles.modalContainer} >
					<Row style= {styles.closeButton} onClick= {this.props.closeModal}> X </Row>
					<Row style={styles.dataContainer}>
						<Row style= {styles.titles}>
							<h4>{data.cui}</h4>
						</Row>
						<Row style= {styles.titles}>
							<h4>{data.label}</h4>
						</Row>
						<Row style= {styles.definition}>
							
							{(data.definition && data.definiton.length >0)?
								<Row>
								<b>definition:</b>
									{_.map(data.definition, function(definition, key){
										return(<div key= {key}> {definition} </div>);	
									})}
								</Row>
							: 
								<Row><b>definition:</b> N/A</Row>
							}
						</Row>
						<Row style={styles.synonyms}>
							<b>synonyms:</b><br/>
							{_.map(data.synonyms, function(synonym, key){
								return(<div key= {key} style= {styles.synonymTag}>
									{synonym}
								</div>);
							})}
						</Row>
					</Row>
				</Row>
			</Grid>
		);
  }
});

module.exports = ConceptModal;
