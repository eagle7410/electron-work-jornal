import React from 'react';
import ActionBuild from 'material-ui/svg-icons/action/build';
import ActionDown from 'material-ui/svg-icons/file/cloud-download';
import ActionUp from 'material-ui/svg-icons/file/cloud-upload';
import {Tabs, Tab} from 'material-ui/Tabs';
import SettingsForm from './DropBoxComponent/SettingsForm'
import StepsDownload from './DropBoxComponent/StepsDownload'
import StepsUpload from './DropBoxComponent/StepsUpload'

const DropBox = () => (
	<Tabs >
		<Tab label='Connect' icon={<ActionBuild />} >
			<SettingsForm />
		</Tab>
		<Tab label='Upload to DropBox' icon={<ActionUp />} >
			<StepsUpload />
		</Tab>
		<Tab label='Download from DropBox' icon={<ActionDown />} >
			<StepsDownload/>
		</Tab>
	</Tabs>
);

export default DropBox;
