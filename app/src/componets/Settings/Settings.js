import React from 'react';
import NavMenu from '../NavMenu/NavMenu';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import IconDropBox from 'material-ui/svg-icons/action/cached'
import DropBox from './DropBox'
import {tabSettings} from '../../const/Styles'

const Settings = () => (
	<div>
		<NavMenu />
		<h1>Settings</h1>
		<Tabs initialSelectedIndex={0}>
			<Tab label='DropBox' icon={<IconDropBox />}  style={tabSettings}>
				<Paper zDepth={2}>
					<DropBox/>
				</Paper>
			</Tab>
		</Tabs>
	</div>
);

export default Settings;
