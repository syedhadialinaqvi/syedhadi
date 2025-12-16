const output = document.getElementById('output');
const input = document.getElementById('commandInput');
const commands = {
  help: `Available commands:\n  intro       → Introduction\n  about       → About me\n  skills      → My skills\n  projects    → My projects\n  contact     → Contact info\n  showpic     → Show my picture\n  clear       → Clear screen`,
  intro: `This is a command line portfolio based on pure JavaScript.`,
  about: `I am Syed Hadi Ali, a Full-Stack Web Developer specializing in Python, Django, APIs.`,
  skills: `Skills:\n  • JavaScript (ES6+)\n  • React.js / HTML/CSS\n  • Python / Django\n  • C++\n  • REST APIs\n  • Git / GitHub`,
  projects: `Projects:\n  • CLI Portfolio → Interactive terminal-based portfolio\n  • MERN Store → Full e-commerce website\n  • Mobile Based Application(Game)`,
  contact: `Contact:\n  Email: debeloper2050it@gmail.com\n  GitHub: github.com/syedhadialinaqvi\n  LinkedIn: linkedin.com/in/syedhadi05`,
  showpic: '__SHOWPIC__',
  clear: 'CLEAR'
};

function typeText(text, callback) {
  output.innerHTML = '';
  let i = 0;
  const interval = setInterval(() => {
    output.innerHTML += text.charAt(i);
    i++;
    if (i === text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, 20);
}

function loadingAnimation(text, finalCallback) {
  output.innerHTML = text;
  let dots = 0;
  const loader = setInterval(() => {
    dots = (dots + 1) % 4;
    output.innerHTML = text + '.'.repeat(dots);
  }, 300);

  setTimeout(() => {
    clearInterval(loader);
    if (finalCallback) finalCallback();
  }, 1200);
}

// Show image with animation
function showImage() {
  loadingAnimation('Loading image', () => {
    output.innerHTML = `
      <img src="../img/hadi.png" 
           alt="MyPic" 
           style="width:200px; border-radius:10px; box-shadow:0 0 10px #000;">
    `;
  });
}

// Event listener for input
input.addEventListener('keydown', function(e) {
  if (e.key === 'Tab') {
    e.preventDefault();
    const typed = input.value;
    const match = Object.keys(commands).find(c => c.startsWith(typed));
    if (match) input.value = match;
  }

  if (e.key === 'Enter') {
    const cmd = input.value.trim();
    if (!cmd) return;

    const response = commands[cmd];

    if (response === 'CLEAR') {
      typeText('Welcome! Type help to begin.');
    } else if (!response) {
      typeText(`Command not found: ${cmd}, write help to see available commands.`);
    } else if (response === '__SHOWPIC__') {
      showImage();
    } else {
      loadingAnimation('Processing', () => typeText(response));
    }

    input.value = '';
  }
});

