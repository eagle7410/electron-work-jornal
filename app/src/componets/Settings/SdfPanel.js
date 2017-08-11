import React from 'react';
import {connect} from 'react-redux';
import LoadAnimation from '../tools/LoadAnimation'
import {objOk, objBad} from '../../const/Objects'
import TextField from 'material-ui/TextField';

const SdfPanel = (state) => {
	let store = state.store;
	let cont = '';

	if (!store.isTryLoad) {
		cont = '';
	} else if (store.isLoad) {
		cont = <LoadAnimation/>;
	} else if (store.isLoadOk) {
		cont = <h3 style={{color: objOk.color}}>{objOk.mess}</h3>;
	} else if (!store.isLoadOk){
		cont = <div style={{padding:'10px'}}><h3 style={{color: objBad.color}}>{objBad.mess}</h3><div>{`Message : ${store.errorMess}`}</div></div>;
	}

	return (
		<div style={ {textAlign : 'center'} }>
			<TextField
				disabled={true}
				floatingLabelText={`Load file ${store.filePath}`}
			/><br />
			{cont}
		</div>
	)
};

export default connect(
	state => ({ store: state.sdf })
)(SdfPanel);
