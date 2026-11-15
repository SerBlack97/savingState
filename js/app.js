//store data
const storage = 'counter';

//loaded data
function load() {
  const save = localStorage.getItem(storage);
  if (save) {
    try {
      return JSON.parse(save);
    } catch (e) {
      console.error('Failed', e);
    }
  }
  return { count: 0, lastUpdate: null, best: 0 };
}

//run loaded data
let state = load();

//pull from HTML
const counter = document.getElementById('count');
const bestest = document.getElementById('best');
const updated = document.getElementById('update');
const up = document.getElementById('addButton');
const down = document.getElementById('minusButton');
const reset = document.getElementById('resetButton');

//saves data
function save() {
  localStorage.setItem(storage, JSON.stringify(state));

  counter.textContent = state.count;
  bestest.textContent = state.best;
  updated.textContent = state.lastUpdate ? state.lastUpdate : 'Never';
}
//adding one to count
up.addEventListener('click', () => {
  state.count += 1;
  if (state.count > state.best) {
    state.best = state.count;
  }
  state.lastUpdate = new Date().toLocaleTimeString();
  save();
});
//subtracting one to count
down.addEventListener('click', () => {
  if (state.count > 0) {
    state.count -= 1;
    state.lastUpdate = new Date().toLocaleTimeString();
    save();
  }
});
//resets count
reset.addEventListener('click', () => {
  state.count = 0;
  state.lastUpdate = new Date().toLocaleTimeString();
  save();
});

//run function
save();