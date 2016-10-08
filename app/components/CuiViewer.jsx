import React from 'react';
import _ from 'lodash';
import {Row, Col, Grid} from 'react-bootstrap';

const styles = {
	mainContainer:{
		width: '95%',
		textAlign: 'left'
	},
	title: {
		marginTop: '30px',
		textAlign: 'left'
	},
	synonyms: {
		height: '200px',
		textAlign: 'left',
		marginTop: '20px',
		overflowY: 'scroll',
		overflowX: 'hidden',
	},
	parentTag: {
		borderColor: '#ccd3e0',
		backgroundColor: '#edeff2',
		borderRadius: '5px',
		height: '30px',
		width: '90px',
		margin: '5px',
		cursor: 'pointer',
		display: 'inline'
	},
	parents: {
		marginTop: '20px'
	},
	description: {
		marginTop: '30px',
		textAlign: 'center'
	}
	
};

var CuiViewer = React.createClass({

	getInitialState() {
		return {
		};
	},
	displayParent(e){
		var value = e.target.value;
		this.props.displayParentModal(value);
	},

	render() {
		var data = this.props.data;

		return (
			<Grid style= {styles.mainContainer}>
				{this.props.data?
					<Row>
						<Row style= {styles.title}>
							{data.cui? data.cui : null}
						</Row>
						<Row style= {styles.title}>
							{data.label? data.label : null}
						</Row>
						<Row style= {styles.definition}>
							<b> description: </b> 
							{(data.definition && data.definiton.length >0)?
								<div>
									{_.map(data.definition, function(definition, key){
										return(<div key= {key}> {definition} </div>);										
									})}
								</div>
							: 
								<div> N/A</div>
							}
						</Row>
						<Row style={styles.synonyms}>
							<b> synonyms</b> <br/>
							{(data.synonyms && data.synonyms.length) > 0?
								<div>
									{_.map(data.synonyms, function(synonym, key){
										return(<div key= {key}> {synonym} </div>);
									})}
								</div>
							: 
								<div> N/A</div>
							}
						</Row>			
						

						{(data.parents && data.parents.length > 1)?
							<Row style={styles.parents}>
								<b> related </b> <br/>
								{_.map(data.parents, function(parent, key){
									
									return(<div key= {key} style= {styles.parentTag} value= {parent} onClick= {this.displayParent} >
										{parent}
									</div>);
								}.bind(this))}
							</Row>	
						: 
							null
						}	
					</Row>
				:null}
			</Grid>
		);
  }
});

module.exports = CuiViewer;
