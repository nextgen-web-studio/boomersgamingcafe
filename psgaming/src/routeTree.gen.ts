/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as PlusRouteImport } from './routes/plus'
import { Route as NewsRouteImport } from './routes/news'
import { Route as SignInRouteImport } from './routes/sign-in'
import { Route as GamesSlugRouteImport } from './routes/games.$slug'

const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const PlusRoute = PlusRouteImport.update({
  id: '/plus',
  path: '/plus',
  getParentRoute: () => rootRouteImport,
} as any)
const NewsRoute = NewsRouteImport.update({
  id: '/news',
  path: '/news',
  getParentRoute: () => rootRouteImport,
} as any)
const SignInRoute = SignInRouteImport.update({
  id: '/sign-in',
  path: '/sign-in',
  getParentRoute: () => rootRouteImport,
} as any)
const GamesSlugRoute = GamesSlugRouteImport.update({
  id: '/games/$slug',
  path: '/games/$slug',
  getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/plus': typeof PlusRoute
  '/news': typeof NewsRoute
  '/sign-in': typeof SignInRoute
  '/games/$slug': typeof GamesSlugRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/plus': typeof PlusRoute
  '/news': typeof NewsRoute
  '/sign-in': typeof SignInRoute
  '/games/$slug': typeof GamesSlugRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/plus': typeof PlusRoute
  '/news': typeof NewsRoute
  '/sign-in': typeof SignInRoute
  '/games/$slug': typeof GamesSlugRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/plus' | '/news' | '/sign-in' | '/games/$slug'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/plus' | '/news' | '/sign-in' | '/games/$slug'
  id: '__root__' | '/' | '/plus' | '/news' | '/sign-in' | '/games/$slug'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  PlusRoute: typeof PlusRoute
  NewsRoute: typeof NewsRoute
  SignInRoute: typeof SignInRoute
  GamesSlugRoute: typeof GamesSlugRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/plus': {
      id: '/plus'
      path: '/plus'
      fullPath: '/plus'
      preLoaderRoute: typeof PlusRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/news': {
      id: '/news'
      path: '/news'
      fullPath: '/news'
      preLoaderRoute: typeof NewsRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/sign-in': {
      id: '/sign-in'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof SignInRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/games/$slug': {
      id: '/games/$slug'
      path: '/games/$slug'
      fullPath: '/games/$slug'
      preLoaderRoute: typeof GamesSlugRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  PlusRoute: PlusRoute,
  NewsRoute: NewsRoute,
  SignInRoute: SignInRoute,
  GamesSlugRoute: GamesSlugRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

import type { getRouter } from './router.tsx'
import type { startInstance } from './start.ts'
declare module '@tanstack/react-start' {
  interface Register {
    ssr: true
    router: Awaited<ReturnType<typeof getRouter>>
    config: Awaited<ReturnType<typeof startInstance.getOptions>>
  }
}
