# mfe-single-spa

```bash
docker run -d --name node --rm -v ~/.gitconfig:/root/.gitconfig -v ~/.ssh/id_rsa:/root/.ssh/id_rsa -v microservices:/usr/src -w /usr/src/root -p 8500-8510:8500-8510 -p 9000:9000 ricioli/single-spa npm start
```

```bash
cd base
npm start -- --port 8500
```
