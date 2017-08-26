import React from 'react';
import {connect} from 'react-redux';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Paper from 'material-ui/Paper';

const styleZIndex = {
	zIndex : 2,
};

const styleSettingWrap = {
	...styleZIndex,
	width: '100%',
	height: 600,
	overflow: 'hidden',
	position: 'absolute'
};

const StorageToolsSettings = (state) => {
	let filters = state.filters;

	return (
		<div style={styleSettingWrap}>
			<Paper
				style={styleZIndex}
				className={filters.extToolsOpen ? 'tools-ext-open' : 'tools-ext-close'}
			>
				<RadioButtonGroup name="use_date" defaultSelected="use_date">
					<RadioButton
						value="use_date"
						label="Use date"
					/>
					<RadioButton
						value="use_date_range"
						label="use_date_range"
					/>
					<RadioButton
						value="not_use"
						label="Not use"
					/>

				</RadioButtonGroup>
			</Paper>
		</div>
	);
};

export default connect(
	state => ({
		filters : state.storageFilters,
	})
)(StorageToolsSettings);
