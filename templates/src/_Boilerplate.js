import core from 'metaljs/src/core';
import SoyComponent from 'metaljs/src/soy/SoyComponent';
import ComponentRegistry from 'metaljs/src/component/ComponentRegistry';
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
	 * Lifecycle. Creation phase of the component happens once after the
	 * component is instantiated, therefore its the initial phase of the
	 * component Lifecycle. Be conscious about actions performed in this phase
	 * to not compromise instantiation time with operations that can be
	 * postponed to further phases. It's recommended to bind component custom
	 * events in this phase, in contrast to DOM events that must be bind on
	 * attach phase.
	 */
	created() {
	}

	/**
	 * Lifecycle. When attached, the component element is appended to the DOM
	 * and any other action to be performed must be implemented in this method,
	 * such as, binding DOM events. A component can be re-attached multiple
	 * times, therefore the undo behavior for any action performed in this phase
	 * must be implemented on the detach phase.
	 */
	attached() {
	}

	/**
	 * Lifecycle. When detached, the component element is removed from the DOM
	 * and any other action to be performed must be implemented in this method,
	 * such as, unbinding DOM events. A component can be detached multiple
	 * times, therefore the undo behavior for any action performed in this phase
	 * must be implemented on the attach phase.
	 */
	detached() {
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
 * Registers component by name. Relevant to expose component constructor to be
 * able to be invoked from inside other templates.
 */
ComponentRegistry.register('<%= capitalizeName %>', <%= capitalizeName %>);

export default <%= capitalizeName %>;
