// Projects Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Intersection Observer for project cards with staggered animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add delay based on index for staggered animation
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 150 * index);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
  });

  // Enhanced Filter Functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.style.transform = '';
        btn.style.boxShadow = '';
      });
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Play subtle click animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
      
      const filterValue = this.dataset.filter;
      
      // Filter projects with animation
      projectCards.forEach((card, index) => {
        const cardTechs = card.dataset.tech.split(' ');
        
        if (filterValue === 'all' || cardTechs.includes(filterValue)) {
          // Show matching cards with staggered delay
          setTimeout(() => {
            card.style.display = 'block';
            // Trigger reflow to restart animation
            void card.offsetWidth;
            card.classList.add('visible');
          }, 100 * index);
        } else {
          // Hide non-matching cards with fade out
          card.classList.remove('visible');
          setTimeout(() => {
            card.style.display = 'none';
          }, 300); // Match this with CSS transition duration
        }
      });
    });
  });

  // Initialize all projects as visible
  projectCards.forEach(card => {
    card.style.display = 'block';
  });

  // Add hover effect to tech stack items
  document.querySelectorAll('.tech').forEach(tech => {
    tech.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
      this.style.boxShadow = '0 5px 15px rgba(0, 243, 255, 0.2)';
    });
    
    tech.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });
});

// Back Button Functionality with animation
function goBack() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.3s ease';
  setTimeout(() => {
    window.history.back();
  }, 300);
}