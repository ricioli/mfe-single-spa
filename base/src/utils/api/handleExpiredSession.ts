const handleExpiredSession = () => {
  console.error('A sessão expirou!');
  window.location.href = '/login';
};

export default handleExpiredSession;
