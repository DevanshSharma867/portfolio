/*
	Forty by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = (browser.name == 'ie' || browser.name == 'edge' || browser.mobile) ? function() { return $(this) } : function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				on, off;

			on = function() {

				$t.css('background-position', 'center 100%, center 100%, center 0px');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$t.css('background-position', 'center ' + (pos * (-1 * intensity)) + 'px');

					});

			};

			off = function() {

				$t
					.css('background-position', '');

				$window
					.off('scroll._parallax');

			};

			breakpoints.on('<=medium', off);
			breakpoints.on('>medium', on);

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Clear transitioning state on unload/hide.
		$window.on('unload pagehide', function() {
			window.setTimeout(function() {
				$('.is-transitioning').removeClass('is-transitioning');
			}, 250);
		});

	// Fix: Enable IE-only tweaks.
		if (browser.name == 'ie' || browser.name == 'edge')
			$body.addClass('is-ie');

	// Scrolly.
		$('.scrolly').scrolly({
			offset: function() {
				return $header.height() - 2;
			}
		});

	// Tiles.
		var $tiles = $('.tiles > article');

		$tiles.each(function() {

			var $this = $(this),
				$image = $this.find('.image'), $img = $image.find('img'),
				$link = $this.find('.link'),
				x;

			// Image.

				// Set image.
					$this.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set position.
					if (x = $img.data('position'))
						$image.css('background-position', x);

				// Hide original.
					$image.hide();

			// Link.
				if ($link.length > 0) {

					$x = $link.clone()
						.text('')
						.addClass('primary')
						.appendTo($this);

					$link = $link.add($x);

					$link.on('click', function(event) {

						var href = $link.attr('href');

						// Prevent default.
							event.stopPropagation();
							event.preventDefault();

						// Target blank?
							if ($link.attr('target') == '_blank') {

								// Open in new tab.
									window.open(href);

							}

						// Otherwise ...
							else {

								// Start transitioning.
									$this.addClass('is-transitioning');
									$wrapper.addClass('is-transitioning');

								// Redirect.
									window.setTimeout(function() {
										location.href = href;
									}, 500);

							}

					});

				}

		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() {
				$window.trigger('scroll');
			});

			$window.on('load', function() {

				$banner.scrollex({
					bottom:		$header.height() + 10,
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); $header.addClass('reveal'); }
				});

				window.setTimeout(function() {
					$window.triggerHandler('scroll');
				}, 100);

			});

		}

	// Banner.
		$banner.each(function() {

			var $this = $(this),
				$image = $this.find('.image'), $img = $image.find('img');

			// Parallax.
				$this._parallax(0.275);

			// Image.
				if ($image.length > 0) {

					// Set image.
						$this.css('background-image', 'url(' + $img.attr('src') + ')');

					// Hide original.
						$image.hide();

				}

		});

	// Menu.
		var $menu = $('#menu'),
			$menuInner;

		$menu.wrapInner('<div class="inner"></div>');
		$menuInner = $menu.children('.inner');
		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menuInner
			.on('click', function(event) {
				event.stopPropagation();
			})
			.on('click', 'a', function(event) {

				var href = $(this).attr('href');

				event.preventDefault();
				event.stopPropagation();

				// Hide.
					$menu._hide();

				// Redirect.
					window.setTimeout(function() {
						window.location.href = href;
					}, 250);

			});

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();
				event.preventDefault();

				$body.removeClass('is-menu-visible');

			})
			.append('<a class="close" href="#menu">Close</a>');

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('click', function(event) {

				// Hide.
					$menu._hide();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

})(jQuery);

// ─── Scroll-Spy for active nav link ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
  const scrollY = window.pageYOffset;
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    const bottom = top + section.offsetHeight;
    const id = section.id;
    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${id}`
        );
      });
    }
  });
}


  // simple toggle: tap once to open, again to close
  document.querySelectorAll('#experience .timeline-item')
          .forEach(card => {
    card.addEventListener('click', e => {
      // ignore click if it came from selecting text
      if (window.getSelection().toString().length) return;
      card.classList.toggle('active');
    });
  });





// run on scroll and on load
window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load',  updateActiveLink);

// ─── Smooth Navigation Transitions ───
(function() {
  'use strict';
  
  let isNavigating = false;
  // Get navbar height from CSS variable or fallback
  const navbar = document.querySelector('#navbar');
  const navbarHeight = navbar ? navbar.offsetHeight : 56;
  
  // Get all navigation links
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = document.querySelectorAll('section[id], #banner-wrapper, footer[id]');
  
  // Smooth scroll function with transitions
  function smoothNavigate(targetId) {
    if (isNavigating) return;
    isNavigating = true;
    
    const targetElement = document.querySelector(targetId);
    if (!targetElement) {
      isNavigating = false;
      return;
    }
    
    // Find current active section
    let currentSection = null;
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= navbarHeight + 100 && rect.bottom >= navbarHeight + 100) {
        currentSection = section;
      }
    });
    
    // If clicking on same section, do nothing
    if (currentSection && targetElement.contains(currentSection) || 
        (targetId === '#banner' && currentSection && currentSection.id === 'banner-wrapper')) {
      isNavigating = false;
      return;
    }
    
    // Add navigating class to body
    document.body.classList.add('navigating');
    
    // Fade out current section
    if (currentSection) {
      currentSection.classList.add('transitioning-out');
      currentSection.classList.remove('scroll-in');
    }
    
    // Calculate target position
    let targetPosition;
    if (targetId === '#banner' || targetId === '#home') {
      targetPosition = 0;
    } else {
      const targetRect = targetElement.getBoundingClientRect();
      targetPosition = window.pageYOffset + targetRect.top - navbarHeight;
    }
    
    // Wait for fade-out, then scroll and fade-in
    setTimeout(() => {
      // Scroll to target
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Find target section
      let targetSection = targetElement;
      if (targetId === '#banner' || targetId === '#home') {
        targetSection = document.querySelector('#banner-wrapper') || document.querySelector('#banner');
      } else if (targetId === '#contact') {
        // Contact is in footer
        targetSection = document.querySelector('#footer') || targetElement;
      } else {
        // Find the section that contains or is the target
        sections.forEach(section => {
          if (section.contains(targetElement) || section === targetElement) {
            targetSection = section;
          }
        });
      }
      
      // Fade in target section
      if (targetSection) {
        targetSection.classList.add('transitioning-in', 'active');
        
        // Trigger scroll animations if not already triggered
        if (!targetSection.classList.contains('scroll-in')) {
          targetSection.classList.add('scroll-in');
          
          // Trigger child animations
          const heading = targetSection.querySelectorAll('.scroll-heading');
          const text = targetSection.querySelectorAll('.scroll-text');
          const cards = targetSection.querySelectorAll('.scroll-card');
          
          setTimeout(() => {
            heading.forEach((el, i) => {
              setTimeout(() => el.classList.add('scroll-in'), 50 * i);
            });
            text.forEach((el, i) => {
              setTimeout(() => el.classList.add('scroll-in'), 100 + (30 * i));
            });
            cards.forEach((el) => {
              el.classList.add('scroll-in');
            });
          }, 300);
        }
      }
      
      // Clean up after transition
      setTimeout(() => {
        if (currentSection) {
          currentSection.classList.remove('transitioning-out');
        }
        if (targetSection) {
          targetSection.classList.remove('transitioning-in');
        }
        document.body.classList.remove('navigating');
        isNavigating = false;
        
        // Update active nav link
        updateActiveLink();
      }, 700);
      
    }, 200); // Overlap: start fade-in before fade-out completes
  }
  
  // Update URL without scrolling (for browser history)
  function updateURL(hash) {
    if (history.pushState) {
      history.pushState(null, null, hash);
    }
  }
  
  // Attach click handlers to all nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      // Update URL for browser history
      updateURL(targetId);
      
      // Navigate with smooth transition
      smoothNavigate(targetId);
      
      // Close mobile menu if open
      const nav = document.querySelector('.nav-links');
      if (nav && nav.classList.contains('mobile-open')) {
        nav.classList.remove('mobile-open');
        const toggle = document.querySelector('.nav-toggle');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
  
  // Handle browser back/forward buttons
  window.addEventListener('popstate', function(e) {
    const hash = window.location.hash;
    if (hash) {
      smoothNavigate(hash);
    }
  });
  
})();

// ─── Scroll-Triggered Animations ───
document.addEventListener('DOMContentLoaded', function() {
	// Intersection Observer for sections
	const sectionObserver = new IntersectionObserver((entries, obs) => {
	  entries.forEach(entry => {
		if (entry.isIntersecting) {
		  // Only add scroll-in if not already added (to avoid re-animating)
		  if (!entry.target.classList.contains('scroll-in')) {
			entry.target.classList.add('scroll-in');
			
			// Trigger child animations with stagger
			const heading = entry.target.querySelectorAll('.scroll-heading');
			const text = entry.target.querySelectorAll('.scroll-text');
			const cards = entry.target.querySelectorAll('.scroll-card');
			
			// Animate headings first (small delay between each)
			heading.forEach((el, i) => {
			  if (!el.classList.contains('scroll-in')) {
				setTimeout(() => el.classList.add('scroll-in'), 50 * i);
			  }
			});
			
			// Then text (slightly longer delay)
			text.forEach((el, i) => {
			  if (!el.classList.contains('scroll-in')) {
				setTimeout(() => el.classList.add('scroll-in'), 100 + (30 * i));
			  }
			});
			
			// Cards already have staggered delays in CSS
			cards.forEach((el) => {
			  if (!el.classList.contains('scroll-in')) {
				el.classList.add('scroll-in');
			  }
			});
		  }
		  // Keep observing so content stays visible when scrolling back
		} else {
		  // When section leaves viewport, ensure it stays visible if it was already shown
		  // Don't remove scroll-in class - keep content visible
		}
	  });
	}, {
	  threshold: 0.15,  // Trigger when 15% visible
	  rootMargin: '0px 0px -50px 0px'  // Start slightly before fully in view
	});
  
	// Observe all scroll sections (except hero which should be visible immediately)
	const sections = document.querySelectorAll('.scroll-section:not(#banner)');
	sections.forEach(section => {
	  sectionObserver.observe(section);
	});
	
	// Hero section should be visible immediately (no scroll animation)
	const banner = document.querySelector('#banner.scroll-section');
	if (banner) {
	  banner.classList.add('scroll-in');
	}
	
	// Also observe experience items individually for stagger
	const experienceItems = document.querySelectorAll('.experience-item');
	const itemObserver = new IntersectionObserver((entries, obs) => {
	  entries.forEach(entry => {
		if (entry.isIntersecting) {
		  entry.target.classList.add('scroll-in');
		  obs.unobserve(entry.target);
		}
	  });
	}, {
	  threshold: 0.2,
	  rootMargin: '0px 0px -30px 0px'
	});
	
	experienceItems.forEach(item => {
	  itemObserver.observe(item);
	});
	
	// Experience card expand/collapse on mobile (tap)
	const experienceCards = document.querySelectorAll('.experience-card');
	experienceCards.forEach(card => {
	  card.addEventListener('click', function(e) {
		// Only handle on mobile/touch devices
		if (window.innerWidth <= 768) {
		  e.preventDefault();
		  this.classList.toggle('expanded');
		}
	  });
	});
});

