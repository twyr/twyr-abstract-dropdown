'use strict';

const { addonV1Shim } = require('@embroider/addon-shim');
const shimmed = addonV1Shim(__dirname);

const emberAbstractDropdownBuildHooks = {
	name: require('./package.json').name,

	options: {
		'@embroider/macros': {
			setOwnConfig: {
				abstractDropdownContentElementId:
					'ember-abstract-dropdown-content-container'
			}
		}
	},

	// #region Config
	config() {
		return this.options['@embroider/macros']['setOwnConfig'];
	},
	// #endregion

	// #region Content Injections
	contentFor(type, config, content) {
		let retValue = null;
		switch (type) {
			case 'body-footer':
				retValue = this._contentForBodyFooter(config, content);
				break;
		}

		return retValue;
	},

	_contentForBodyFooter(config, content) {
		if (config.emberAbstractDropdownBodyFooterInvoked) return null;
		config.emberAbstractDropdownBodyFooterInvoked = true;

		const pkgName = require('./package.json').name;
		const addonConfig = config[pkgName] ?? this.config();
		console.log(
			`\nEmberAbstractDropdownBuildHooks::BODY FOOTER BUILD HOOK::CONFIG: ${JSON.stringify(
				addonConfig,
				null,
				'\t'
			)}\n`
		);

		const addonContent = `${content}<div id="${addonConfig.abstractDropdownContentElementId}" class="ember-abstract-dropdown-content-container">&nbsp;</div>`;
		return addonContent;
	}
	// #endregion
};

const exported = Object.assign({}, shimmed, emberAbstractDropdownBuildHooks);
module.exports = exported;
