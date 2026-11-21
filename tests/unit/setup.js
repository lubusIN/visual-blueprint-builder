// Enable React 18 act() environment
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// Mock ResizeObserver for jsdom
if ( typeof window !== 'undefined' && ! window.ResizeObserver ) {
	window.ResizeObserver = class ResizeObserver {
		observe() {}
		unobserve() {}
		disconnect() {}
	};
}

// Mock matchMedia to enable reduced motion (avoids animation timeouts in Modal)
if ( typeof window !== 'undefined' ) {
	window.matchMedia =
		window.matchMedia ||
		function ( query ) {
			return {
				matches: query.includes( 'prefers-reduced-motion' ),
				media: query,
				onchange: null,
				addListener: () => {},
				removeListener: () => {},
				addEventListener: () => {},
				removeEventListener: () => {},
				dispatchEvent: () => false,
			};
		};
}
