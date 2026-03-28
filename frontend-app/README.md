## Getting Started

Basic template for all the12st web projects, first start the development server:

- use [brew](https://brew.sh)
- install [bun](https://bun.com)
- install node version manager [nvm](https://formulae.brew.sh/formula/nvm#default)
- use supported version node 24
- install your all dependencies `bun i`

## Run localhost

```bash
pnpm dev
```

## Linting your code

```bash
pnpm lint
```

OR 

```bash
pnpm lint:fix
```

## Check typescript

```bash
pnpm lint:ts
```

## Documentation

For more detailed information regarding the application logic and architecture, please look at the documentation inside the `docs/` folder:
- [Application Structure](docs/strucutre.md): Overview of application split (dashboard vs admin), login functionality, and registration logic.
- [Administrator Logic](docs/admin.md): Details regarding setup, permissions, and management capabilities of administrators.
- [Dockse](docs/docker.md): Dockerfile
- [Deploy](docs/deploy.md): Deploy