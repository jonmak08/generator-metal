import async from '../bower_components/metaljs/src/async/async';
import dom from '../bower_components/metaljs/src/dom/dom';
import <%= capitalizeName %> from '../src/<%= capitalizeName %>';

describe('<%= capitalizeName %>', function() {
	it('should render component', function() {
		var component = new <%= capitalizeName %>().render();
		assert.ok(component.element.parentNode);
		component.dispose();
	});

	it('should change visibility when visible attribute changes', function(done) {
		var component = new <%= capitalizeName %>().render();
		component.visible = false;
		async.nextTick(function() {
			assert.ok(!component.visible);
			component.dispose();
			done();
		});
	});

	it('should change visibility when close icon is clicked', function(done) {
		var component = new <%= capitalizeName %>().render();
		dom.triggerEvent(component.element.querySelector('.close'), 'click');
		async.nextTick(function() {
			assert.ok(!component.visible);
			component.dispose();
			done();
		});
	});

	it('should decorate component', function() {
		var attributes = {
			element: '#component',
			id: 'component',
			headerContent: 'header',
			bodyContent: 'body',
			footerContent: 'footer'
		};

		var templateFn = soy.$$getDelegateFn('<%= capitalizeName %>');
		var markupFromTemplate = templateFn(attributes, null, { renderChildComponents: true });
		dom.append(document.body, markupFromTemplate.content);

		var component = new <%= capitalizeName %>(attributes).decorate();

		assert.strictEqual(
			component.element.outerHTML,
			document.getElementById('component').outerHTML
		);

		component.dispose();
	});
});
