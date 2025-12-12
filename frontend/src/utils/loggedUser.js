const user = JSON.parse(localStorage.getItem('user') || 'null');
const isLoggedIn = user && user.id;
const isComumLoggedIn = user && user.id && user.tipo === 'comum';
const isRecicladorLoggedIn = user && user.id && user.tipo === 'reciclador';

export { user, isLoggedIn, isComumLoggedIn, isRecicladorLoggedIn };
