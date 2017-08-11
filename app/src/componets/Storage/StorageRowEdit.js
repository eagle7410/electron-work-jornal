import React from 'react';
import {connect} from 'react-redux';
import ActionButtonSave from '../tools/ActionButtonSave'
import ActionButtonCancel from '../tools/ActionButtonCancel'
import { TableRowColumn, TableRow } from 'material-ui/Table';
import StorageCategoriesList from './StorageCategoriesList'
import TextField from 'material-ui/TextField';
import {Storage, Alert} from '../../const/Events'
import {edit} from '../../api/Storage'
import AlertStatus from '../../const/AlertStatus'
import {styleBlockInCell, styleRow, styleArea, styleCategoryEdit} from '../../const/Styles'
import {getRecord} from '../../utils/GetRecord'

const StorageRowEdit = (state) => {
	const store = state.store;
	const row = store.editRowData;
	const id = row.id;
	const styleLabel = {color : '#ccc'};
	const save = () => {
		edit(getRecord(store.editRow, row))
			.then(state.onSaveEdit)
			.catch(err => state.showAlert(err, AlertStatus.BAD));
	};

	return (
		<TableRow >
			<TableRowColumn style={styleRow}>
				<div style={styleBlockInCell}>
					<div>
						<ActionButtonCancel onTouch={state.onCancel}/>
						<ActionButtonSave onTouch={save}/>
					</div>
				</div>
				<div style={styleBlockInCell}>
					<span style={styleLabel}>Category :</span> <StorageCategoriesList onEdit={state.onEditCategory} keyPrev={'catEdit' + id} val={row.category} style={styleCategoryEdit}/> <br/>
					<span style={styleLabel}>Title    :</span> <TextField id={`edtT_${id}`} value={row.title} onChange={ev => state.onEditText('title', ev.target.value)}/> <br/>
					<span style={styleLabel}>Login    :</span> <TextField id={`edtL_${id}`} value={row.login} onChange={ev => state.onEditText('login', ev.target.value)}/> <br/>
					<span style={styleLabel}>Pass     :</span> <TextField id={`edtP_${id}`} value={row.pass} onChange={ev => state.onEditText('pass', ev.target.value)}/> <br/>
					<span style={styleLabel}>Answer   :</span> <TextField id={`edtA_${id}`} value={row.answer} onChange={ev => state.onEditText('answer', ev.target.value)}/>
				</div>
			 </TableRowColumn>
			<TableRowColumn children={<textarea  style={styleArea} rows='10' defaultValue={row.desc} />} onChange={state.onEditDesc}/>
		</TableRow>
	);
};

export default connect(
	state => ({
		store: state.storage
	}),
	dispatch => ({
		onCancel   : () => dispatch({type : Storage.editClear}),
		onSaveEdit : () => dispatch({type : Storage.saved}),
		onEditCategory: (event, index, value) => dispatch({
			type : Storage.edit,
			data : {
				type : 'category',
				val  : value
			}
		}),
		onEditDesc : ev => dispatch({
			type : Storage.edit,
			data : {
				type : 'desc',
				val  : ev.target.value
			}
		}),
		onEditText: (type,val) => dispatch({
			type : Storage.edit,
			data : {
				type : type,
				val  : val
			}
		}),
		showAlert: (mess, type) => dispatch({
			type : Alert.show,
			data : {
				message: mess,
				status: type
			}
		})
	})
)(StorageRowEdit);
