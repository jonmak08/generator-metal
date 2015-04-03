import core from '../bower_components/metaljs/src/core';
import SoyComponent from '../bower_components/metaljs/src/soy/SoyComponent';
import ComponentRegistry from '../bower_components/metaljs/src/component/ComponentRegistry';
import './<%= capitalizeName %>.soy.js';

/**
 * <%= capitalizeName %> component.
 */
class <%= capitalizeName %> extends SoyComponent {
	/**
	 * @inheritDoc
	 */
	constructor(opt_config) {
		super(opt_config);
	}

	/**
	 * @inheritDoc
	 */
	attached() {
		// Component is in document.
	}

	/**
	 * @inheritDoc
	 */
	detached() {
		// Component is not in document.
	}

	disposeInternal() {
		// Component is disposed.
		super.disposeInternal();
	}

	/**
	 * Sets component visibility to false. Invoked by soy template event binding.
	 */
	close() {
		this.visible = false;
	}

	/**
	 * Invokes when visible attribute changes to synchronize the visible state.
	 * @param {boolean} visible
	 */
	syncVisible(visible) {
		this.element.style.display = visible ? null : 'none';
	}
}

<%= capitalizeName %>.ATTRS = {
	/**
	 * Attribute that holds the body content.
	 * @type {string}
	 * @default ''
	 */
	bodyContent: {
		validator: core.isString,
		value: ''
	},

	/**
	 * Attribute that holds the header content.
	 * @type {string}
	 * @default ''
	 */
	headerContent: {
		validator: core.isString,
		value: ''
	},

	/**
	 * Attribute that holds the footer content.
	 * @type {string}
	 * @default ''
	 */
	footerContent: {
		validator: core.isString,
		value: ''
	},

	/**
	 * Attribute that holds the visibility.
	 * @type {boolean}
	 * @default true
	 */
	visible: {
		validator: core.isBoolean,
		value: true
	}
};

/**
 * Default element css classes.
 * @default modal
 * @type {String}
 * @static
 */
<%= capitalizeName %>.ELEMENT_CLASSES = '<%= lowercaseName %>';

/**
 * Registers component by name. Relevant to link component with Soy template
 * name.
 */
ComponentRegistry.register('<%= capitalizeName %>', <%= capitalizeName %>);

export default <%= capitalizeName %>;
