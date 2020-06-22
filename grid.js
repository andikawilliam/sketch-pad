
const body = document.querySelector('body');
body.style.height = "100%";

const menubar = document.createElement('div');
menubar.setAttribute('id', 'menubar');
menubar.style.backgroundColor = 'orange';
menubar.style.display = 'grid';
menubar.style["grid-template-columns"] = '100px 200px 100px';
menubar.style["grid-row-gap"] = "100px";

menubar.style.margin = '1em';
menubar.style.padding = '5px';
menubar.style.width = '500px';
menubar.style.height = '40px';

const resetButton = document.createElement('button');
resetButton.classList.add('menu_option');
resetButton.textContent = "Reset Color";

const gridNumber = document.createElement('input');
gridNumber.classList.add('menu_option');
gridNumber.textContent = 'Change grid size';

const changeGridButton = document.createElement('button');
changeGridButton.classList.add('menu_option');
changeGridButton.textContent = 'Change grid size';

const gridContainer = document.createElement('div');
gridContainer.setAttribute('id', 'grid_container');
gridContainer.style.display = 'grid';
gridContainer.style.border = 'thin solid black';
gridContainer.style.width = '960px';
gridContainer.style.height = '960px';

function addMenubarEvents() {
  resetButton.addEventListener('click', resetGrid);
  gridNumber.addEventListener('keyup', setChangeGrid);
  changeGridButton.addEventListener('click', changeGrid);
};

function resetGrid(event) {
  grids.forEach(element => {
    element.style.backgroundColor = 'white';
    menubar.style.backgroundColor = 'white';
  });
};

function setChangeGrid(event) {
  if  (event.keyCode === 13) {
    event.preventDefault;
    changeGridButton.click()
  }
}

function changeGrid(event) {
  grids.forEach(element => {
    element.parentNode.removeChild(element);
  });

  desiredGridNumber = +(gridNumber.value);
  console.log(gridNumber.value);
  addGrids(desiredGridNumber);
};


function addGrids(size=16) {
  for (i = 0; i < size*size; i++) {
    let grid = document.createElement('div');
    grid.classList.add('grid');
    gridContainer.appendChild(grid);
  };
  grids = document.querySelectorAll('.grid');
  gridContainer.style["grid-template-rows"] = `repeat(${size}, minmax(0,1fr))`;
  gridContainer.style["grid-template-columns"] = `repeat(${size}, minmax(0,1fr))`;

  addGridStyle();
  addGridEvent();
};

function addGridStyle() {
  grids.forEach(element => {
    element.style.border = 'thin solid black';
    element.style.padding = '0';
  });
};

function addGridEvent() {
  grids.forEach(element => {
    element.addEventListener('mouseenter', addHoverColor)
  });
};

function addHoverColor(event) {
  randomColor = getRandomColor();
  event.target.style.backgroundColor = randomColor;
  menubar.style.backgroundColor = randomColor;
};

function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function leftClickAddColor(event) {
	body.addEventListener('click', addGridEvent)
};

function rightClickStopColor(event) {
	body.addEventListener('contextmenu', function(e) {
		e.preventDefault();
		stopHoverColor();
		return false;
	}, false);
};

function stopHoverColor() {
	grids.forEach(element => {
    	element.removeEventListener('mouseenter', addHoverColor)
  	});
}

body.appendChild(menubar);
body.appendChild(gridContainer);
menubar.appendChild(resetButton);
menubar.appendChild(gridNumber);
menubar.appendChild(changeGridButton);

addMenubarEvents();
addGrids();
leftClickAddColor();
rightClickStopColor();
