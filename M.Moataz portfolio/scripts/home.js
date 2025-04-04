// Terminal Animation
const typeContainer = document.getElementById('role');
const roles = ['Mahmoud Moataz','a Web Developer', 'a front-end Developer', 'a Freelancer'];
let currentRoleIndex = 0;
let isDeleting = false;

function typeRole() {
  const currentRole = roles[currentRoleIndex];
  let charIndex = isDeleting ? currentRole.length - 1 : 0;
  
  function animate() {
    typeContainer.textContent = isDeleting 
      ? currentRole.substring(0, charIndex)
      : currentRole.substring(0, charIndex + 1);

    if (!isDeleting && charIndex < currentRole.length) {
      charIndex++;
      setTimeout(animate, 100);
    } else if (isDeleting && charIndex >= 0) {
      charIndex--;
      setTimeout(animate, 50);
    } else {
      isDeleting = !isDeleting;
      currentRoleIndex = !isDeleting ? (currentRoleIndex + 1) % roles.length : currentRoleIndex;
      setTimeout(typeRole, 500);
    }
  }
  
  animate();
}

typeRole();

// Back Button Functionality
function goBack() {
  window.history.back();
}