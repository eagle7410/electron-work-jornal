import React from 'react';
import NavMenu from '../NavMenu/NavMenu';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import IconAdd from 'material-ui/svg-icons/av/playlist-add'
import IconStore from 'material-ui/svg-icons/image/grid-on'
import Tools from './StorageTools'
import Table from './StorageTable'
import Add from './Add'

const Storage = () => (
	<div>
		<NavMenu />
		<h1>Storage</h1>
		<Tabs>
			<Tab label='Data' icon={<IconStore />} >
				<Paper zDepth={2}>
					<Tools />
				</Paper>
				<Table/>
			</Tab>
			<Tab label='Add record' icon={<IconAdd/>} >
				<Add/>
			</Tab>
		</Tabs>
	</div>
);

export default Storage;
