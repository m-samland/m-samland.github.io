/*
	Prologue by HTML5 UP - Modernized
	Original: html5up.net | @ajlkn
	Vanilla JS rewrite: replaces jQuery + Skel.js dependencies
*/

(function() {
	'use strict';

	// --- Loading state ---
	document.body.classList.add('is-loading');
	window.addEventListener('load', function() {
		document.body.classList.remove('is-loading');
	});

	// --- Smooth scrolling for nav links and .scrolly buttons ---
	document.querySelectorAll('#nav a, .scrolly').forEach(function(link) {
		link.addEventListener('click', function(e) {
			var href = this.getAttribute('href');
			if (!href || href[0] !== '#') return;

			e.preventDefault();
			var target = document.querySelector(href);
			if (target) {
				target.scrollIntoView({ behavior: 'smooth' });
			}
		});
	});

	// --- Scroll spy (highlight active nav item) ---
	var navLinks = document.querySelectorAll('#nav a');
	var sections = [];

	navLinks.forEach(function(link) {
		var href = link.getAttribute('href');
		if (href && href[0] === '#') {
			var section = document.getElementById(href.substring(1));
			if (section) sections.push({ el: section, link: link });
		}
	});

	var observerOptions = {
		root: null,
		rootMargin: '-20% 0px -60% 0px',
		threshold: 0
	};

	var observer = new IntersectionObserver(function(entries) {
		entries.forEach(function(entry) {
			if (entry.isIntersecting) {
				navLinks.forEach(function(l) {
					l.classList.remove('active');
					l.removeAttribute('aria-current');
				});
				sections.forEach(function(s) {
					if (s.el === entry.target) {
						s.link.classList.add('active');
						s.link.setAttribute('aria-current', 'true');
					}
				});
			}
		});
	}, observerOptions);

	sections.forEach(function(s) {
		observer.observe(s.el);
	});

	// --- Mobile sidebar toggle ---
	var toggle = document.createElement('div');
	toggle.id = 'headerToggle';
	toggle.innerHTML = '<a href="#header" class="toggle"></a>';
	document.body.appendChild(toggle);

	var header = document.getElementById('header');
	var body = document.body;

	toggle.querySelector('.toggle').addEventListener('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		body.classList.toggle('header-visible');
	});

	// Hide sidebar when clicking a nav link (mobile)
	header.querySelectorAll('a').forEach(function(link) {
		link.addEventListener('click', function() {
			var href = this.getAttribute('href');
			if (href && href !== '#' && href !== '#header') {
				body.classList.remove('header-visible');
			}
		});
	});

	// Hide sidebar when clicking outside (mobile)
	document.getElementById('main').addEventListener('click', function() {
		body.classList.remove('header-visible');
	});

	// Hide sidebar on swipe left
	var touchStartX = null;
	header.addEventListener('touchstart', function(e) {
		touchStartX = e.touches[0].pageX;
	});
	header.addEventListener('touchmove', function(e) {
		if (touchStartX === null) return;
		var diffX = touchStartX - e.touches[0].pageX;
		if (diffX > 50) {
			touchStartX = null;
			body.classList.remove('header-visible');
		}
	});
	header.addEventListener('touchend', function() {
		touchStartX = null;
	});

	// --- Back to top button ---
	var backToTop = document.querySelector('.back-to-top');
	if (backToTop) {
		window.addEventListener('scroll', function() {
			if (window.scrollY > 400) {
				backToTop.classList.add('visible');
			} else {
				backToTop.classList.remove('visible');
			}
		});
		backToTop.addEventListener('click', function() {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
	}

	// --- Scroll-reveal for research cards ---
	var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (!prefersReducedMotion) {
		var cards = document.querySelectorAll('.research-card');
		if (cards.length) {
			cards.forEach(function(card) { card.classList.add('reveal'); });
			var cardObserver = new IntersectionObserver(function(entries) {
				entries.forEach(function(entry) {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
						cardObserver.unobserve(entry.target);
					}
				});
			}, { threshold: 0.1 });
			cards.forEach(function(card) { cardObserver.observe(card); });
		}
	}

})();
