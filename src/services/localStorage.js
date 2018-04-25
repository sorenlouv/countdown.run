import debounce from 'lodash.debounce';
const LOCALE_STORAGE_NAME = 'reduxState-v1';

export function init(store) {
  const persistState = debounce(() => {
    const state = store.getState();
    localStorage.setItem(LOCALE_STORAGE_NAME, JSON.stringify(state));
  }, 100);

  store.subscribe(persistState);
}

export function getPersistedState() {
  const stateRaw = localStorage.getItem(LOCALE_STORAGE_NAME);
  const state = stateRaw ? JSON.parse(stateRaw) : {};
  return state;
}
