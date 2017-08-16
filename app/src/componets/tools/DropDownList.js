import React from 'react';
import {connect} from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

const DropDownList = (state) => {
	const list = state.list;
	const menu = list.map(
		(val, inx) => <MenuItem value={val} key={(state.keyPrev || 'dropDownList') + inx } primaryText={val} />
	);

	return <DropDownMenu style={state.style} value={state.val} onChange={state.onEdit} >{menu}</DropDownMenu>;
}

export default DropDownList;
