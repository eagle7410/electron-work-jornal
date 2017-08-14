import React from 'react';
import Tools from './StorageTools'
import Table from './StorageTable'
import Paper from 'material-ui/Paper';

const Storages = (state) => (
	<div>
		<Paper zDepth={2}></Paper>
		<Table/>
	</div>
)

export default Storages;
