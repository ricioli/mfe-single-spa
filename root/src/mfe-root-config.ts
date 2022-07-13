import { registerApplication, start } from 'single-spa';

interface IApp {
  name: string;
  url: string;
  activeWhen: string[];
  exact?: boolean;
}

const register = (app: IApp): void => {
  registerApplication({
    name: app.name,
    app: () => System.import(app.url),
    activeWhen: app.exact ? (location) => location.pathname === app.activeWhen[0] : app.activeWhen,
  });
};

(async () => {
  try {
    const response = await fetch('');
    const applications = await response.text().then(() => [

      {
        name: '@mfe/base',
        url: '@mfe/base',
        activeWhen: ['/'],
        exact: false,
      },
    ]);
    applications.forEach(register);
  } catch (e) {
    console.error(e);
  } finally {
    start({
      urlRerouteOnly: true,
    });
  }
})();
