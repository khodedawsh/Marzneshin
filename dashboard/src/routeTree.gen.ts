/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as DashboardImport } from './routes/_dashboard'
import { Route as AuthImport } from './routes/_auth'
import { Route as AuthLoginImport } from './routes/_auth/login'
import { Route as DashboardUsersCreateImport } from './routes/_dashboard/users/create'
import { Route as DashboardServicesCreateImport } from './routes/_dashboard/services/create'
import { Route as DashboardNodesCreateImport } from './routes/_dashboard/nodes/create'
import { Route as DashboardUsersUserIdIndexImport } from './routes/_dashboard/users/$userId/index'
import { Route as DashboardServicesServiceIdIndexImport } from './routes/_dashboard/services/$serviceId/index'
import { Route as DashboardNodesNodeIdIndexImport } from './routes/_dashboard/nodes/$nodeId/index'
import { Route as DashboardHostsHostIdIndexImport } from './routes/_dashboard/hosts/$hostId/index'
import { Route as DashboardUsersUserIdEditImport } from './routes/_dashboard/users/$userId/edit'
import { Route as DashboardUsersUserIdDeleteImport } from './routes/_dashboard/users/$userId/delete'
import { Route as DashboardServicesServiceIdEditImport } from './routes/_dashboard/services/$serviceId/edit'
import { Route as DashboardServicesServiceIdDeleteImport } from './routes/_dashboard/services/$serviceId/delete'
import { Route as DashboardNodesNodeIdEditImport } from './routes/_dashboard/nodes/$nodeId/edit'
import { Route as DashboardNodesNodeIdDeleteImport } from './routes/_dashboard/nodes/$nodeId/delete'
import { Route as DashboardHostsInboundIdCreateImport } from './routes/_dashboard/hosts/$inboundId/create'
import { Route as DashboardHostsHostIdEditImport } from './routes/_dashboard/hosts/$hostId/edit'
import { Route as DashboardHostsHostIdDeleteImport } from './routes/_dashboard/hosts/$hostId/delete'

// Create Virtual Routes

const DashboardIndexLazyImport = createFileRoute('/_dashboard/')()
const DashboardUsersLazyImport = createFileRoute('/_dashboard/users')()
const DashboardSettingsLazyImport = createFileRoute('/_dashboard/settings')()
const DashboardServicesLazyImport = createFileRoute('/_dashboard/services')()
const DashboardNodesLazyImport = createFileRoute('/_dashboard/nodes')()
const DashboardHostsLazyImport = createFileRoute('/_dashboard/hosts')()

// Create/Update Routes

const DashboardRoute = DashboardImport.update({
  id: '/_dashboard',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const DashboardIndexLazyRoute = DashboardIndexLazyImport.update({
  path: '/',
  getParentRoute: () => DashboardRoute,
} as any).lazy(() =>
  import('./routes/_dashboard/index.lazy').then((d) => d.Route),
)

const DashboardUsersLazyRoute = DashboardUsersLazyImport.update({
  path: '/users',
  getParentRoute: () => DashboardRoute,
} as any).lazy(() =>
  import('./routes/_dashboard/users.lazy').then((d) => d.Route),
)

const DashboardSettingsLazyRoute = DashboardSettingsLazyImport.update({
  path: '/settings',
  getParentRoute: () => DashboardRoute,
} as any).lazy(() =>
  import('./routes/_dashboard/settings.lazy').then((d) => d.Route),
)

const DashboardServicesLazyRoute = DashboardServicesLazyImport.update({
  path: '/services',
  getParentRoute: () => DashboardRoute,
} as any).lazy(() =>
  import('./routes/_dashboard/services.lazy').then((d) => d.Route),
)

const DashboardNodesLazyRoute = DashboardNodesLazyImport.update({
  path: '/nodes',
  getParentRoute: () => DashboardRoute,
} as any).lazy(() =>
  import('./routes/_dashboard/nodes.lazy').then((d) => d.Route),
)

const DashboardHostsLazyRoute = DashboardHostsLazyImport.update({
  path: '/hosts',
  getParentRoute: () => DashboardRoute,
} as any).lazy(() =>
  import('./routes/_dashboard/hosts.lazy').then((d) => d.Route),
)

const AuthLoginRoute = AuthLoginImport.update({
  path: '/login',
  getParentRoute: () => AuthRoute,
} as any)

const DashboardUsersCreateRoute = DashboardUsersCreateImport.update({
  path: '/create',
  getParentRoute: () => DashboardUsersLazyRoute,
} as any)

const DashboardServicesCreateRoute = DashboardServicesCreateImport.update({
  path: '/create',
  getParentRoute: () => DashboardServicesLazyRoute,
} as any)

const DashboardNodesCreateRoute = DashboardNodesCreateImport.update({
  path: '/create',
  getParentRoute: () => DashboardNodesLazyRoute,
} as any)

const DashboardUsersUserIdIndexRoute = DashboardUsersUserIdIndexImport.update({
  path: '/$userId/',
  getParentRoute: () => DashboardUsersLazyRoute,
} as any)

const DashboardServicesServiceIdIndexRoute =
  DashboardServicesServiceIdIndexImport.update({
    path: '/$serviceId/',
    getParentRoute: () => DashboardServicesLazyRoute,
  } as any)

const DashboardNodesNodeIdIndexRoute = DashboardNodesNodeIdIndexImport.update({
  path: '/$nodeId/',
  getParentRoute: () => DashboardNodesLazyRoute,
} as any)

const DashboardHostsHostIdIndexRoute = DashboardHostsHostIdIndexImport.update({
  path: '/$hostId/',
  getParentRoute: () => DashboardHostsLazyRoute,
} as any)

const DashboardUsersUserIdEditRoute = DashboardUsersUserIdEditImport.update({
  path: '/$userId/edit',
  getParentRoute: () => DashboardUsersLazyRoute,
} as any)

const DashboardUsersUserIdDeleteRoute = DashboardUsersUserIdDeleteImport.update(
  {
    path: '/$userId/delete',
    getParentRoute: () => DashboardUsersLazyRoute,
  } as any,
)

const DashboardServicesServiceIdEditRoute =
  DashboardServicesServiceIdEditImport.update({
    path: '/$serviceId/edit',
    getParentRoute: () => DashboardServicesLazyRoute,
  } as any)

const DashboardServicesServiceIdDeleteRoute =
  DashboardServicesServiceIdDeleteImport.update({
    path: '/$serviceId/delete',
    getParentRoute: () => DashboardServicesLazyRoute,
  } as any)

const DashboardNodesNodeIdEditRoute = DashboardNodesNodeIdEditImport.update({
  path: '/$nodeId/edit',
  getParentRoute: () => DashboardNodesLazyRoute,
} as any)

const DashboardNodesNodeIdDeleteRoute = DashboardNodesNodeIdDeleteImport.update(
  {
    path: '/$nodeId/delete',
    getParentRoute: () => DashboardNodesLazyRoute,
  } as any,
)

const DashboardHostsInboundIdCreateRoute =
  DashboardHostsInboundIdCreateImport.update({
    path: '/$inboundId/create',
    getParentRoute: () => DashboardHostsLazyRoute,
  } as any)

const DashboardHostsHostIdEditRoute = DashboardHostsHostIdEditImport.update({
  path: '/$hostId/edit',
  getParentRoute: () => DashboardHostsLazyRoute,
} as any)

const DashboardHostsHostIdDeleteRoute = DashboardHostsHostIdDeleteImport.update(
  {
    path: '/$hostId/delete',
    getParentRoute: () => DashboardHostsLazyRoute,
  } as any,
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_dashboard': {
      id: '/_dashboard'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/_auth/login': {
      id: '/_auth/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof AuthImport
    }
    '/_dashboard/hosts': {
      id: '/_dashboard/hosts'
      path: '/hosts'
      fullPath: '/hosts'
      preLoaderRoute: typeof DashboardHostsLazyImport
      parentRoute: typeof DashboardImport
    }
    '/_dashboard/nodes': {
      id: '/_dashboard/nodes'
      path: '/nodes'
      fullPath: '/nodes'
      preLoaderRoute: typeof DashboardNodesLazyImport
      parentRoute: typeof DashboardImport
    }
    '/_dashboard/services': {
      id: '/_dashboard/services'
      path: '/services'
      fullPath: '/services'
      preLoaderRoute: typeof DashboardServicesLazyImport
      parentRoute: typeof DashboardImport
    }
    '/_dashboard/settings': {
      id: '/_dashboard/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof DashboardSettingsLazyImport
      parentRoute: typeof DashboardImport
    }
    '/_dashboard/users': {
      id: '/_dashboard/users'
      path: '/users'
      fullPath: '/users'
      preLoaderRoute: typeof DashboardUsersLazyImport
      parentRoute: typeof DashboardImport
    }
    '/_dashboard/': {
      id: '/_dashboard/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof DashboardIndexLazyImport
      parentRoute: typeof DashboardImport
    }
    '/_dashboard/nodes/create': {
      id: '/_dashboard/nodes/create'
      path: '/create'
      fullPath: '/nodes/create'
      preLoaderRoute: typeof DashboardNodesCreateImport
      parentRoute: typeof DashboardNodesLazyImport
    }
    '/_dashboard/services/create': {
      id: '/_dashboard/services/create'
      path: '/create'
      fullPath: '/services/create'
      preLoaderRoute: typeof DashboardServicesCreateImport
      parentRoute: typeof DashboardServicesLazyImport
    }
    '/_dashboard/users/create': {
      id: '/_dashboard/users/create'
      path: '/create'
      fullPath: '/users/create'
      preLoaderRoute: typeof DashboardUsersCreateImport
      parentRoute: typeof DashboardUsersLazyImport
    }
    '/_dashboard/hosts/$hostId/delete': {
      id: '/_dashboard/hosts/$hostId/delete'
      path: '/$hostId/delete'
      fullPath: '/hosts/$hostId/delete'
      preLoaderRoute: typeof DashboardHostsHostIdDeleteImport
      parentRoute: typeof DashboardHostsLazyImport
    }
    '/_dashboard/hosts/$hostId/edit': {
      id: '/_dashboard/hosts/$hostId/edit'
      path: '/$hostId/edit'
      fullPath: '/hosts/$hostId/edit'
      preLoaderRoute: typeof DashboardHostsHostIdEditImport
      parentRoute: typeof DashboardHostsLazyImport
    }
    '/_dashboard/hosts/$inboundId/create': {
      id: '/_dashboard/hosts/$inboundId/create'
      path: '/$inboundId/create'
      fullPath: '/hosts/$inboundId/create'
      preLoaderRoute: typeof DashboardHostsInboundIdCreateImport
      parentRoute: typeof DashboardHostsLazyImport
    }
    '/_dashboard/nodes/$nodeId/delete': {
      id: '/_dashboard/nodes/$nodeId/delete'
      path: '/$nodeId/delete'
      fullPath: '/nodes/$nodeId/delete'
      preLoaderRoute: typeof DashboardNodesNodeIdDeleteImport
      parentRoute: typeof DashboardNodesLazyImport
    }
    '/_dashboard/nodes/$nodeId/edit': {
      id: '/_dashboard/nodes/$nodeId/edit'
      path: '/$nodeId/edit'
      fullPath: '/nodes/$nodeId/edit'
      preLoaderRoute: typeof DashboardNodesNodeIdEditImport
      parentRoute: typeof DashboardNodesLazyImport
    }
    '/_dashboard/services/$serviceId/delete': {
      id: '/_dashboard/services/$serviceId/delete'
      path: '/$serviceId/delete'
      fullPath: '/services/$serviceId/delete'
      preLoaderRoute: typeof DashboardServicesServiceIdDeleteImport
      parentRoute: typeof DashboardServicesLazyImport
    }
    '/_dashboard/services/$serviceId/edit': {
      id: '/_dashboard/services/$serviceId/edit'
      path: '/$serviceId/edit'
      fullPath: '/services/$serviceId/edit'
      preLoaderRoute: typeof DashboardServicesServiceIdEditImport
      parentRoute: typeof DashboardServicesLazyImport
    }
    '/_dashboard/users/$userId/delete': {
      id: '/_dashboard/users/$userId/delete'
      path: '/$userId/delete'
      fullPath: '/users/$userId/delete'
      preLoaderRoute: typeof DashboardUsersUserIdDeleteImport
      parentRoute: typeof DashboardUsersLazyImport
    }
    '/_dashboard/users/$userId/edit': {
      id: '/_dashboard/users/$userId/edit'
      path: '/$userId/edit'
      fullPath: '/users/$userId/edit'
      preLoaderRoute: typeof DashboardUsersUserIdEditImport
      parentRoute: typeof DashboardUsersLazyImport
    }
    '/_dashboard/hosts/$hostId/': {
      id: '/_dashboard/hosts/$hostId/'
      path: '/$hostId'
      fullPath: '/hosts/$hostId'
      preLoaderRoute: typeof DashboardHostsHostIdIndexImport
      parentRoute: typeof DashboardHostsLazyImport
    }
    '/_dashboard/nodes/$nodeId/': {
      id: '/_dashboard/nodes/$nodeId/'
      path: '/$nodeId'
      fullPath: '/nodes/$nodeId'
      preLoaderRoute: typeof DashboardNodesNodeIdIndexImport
      parentRoute: typeof DashboardNodesLazyImport
    }
    '/_dashboard/services/$serviceId/': {
      id: '/_dashboard/services/$serviceId/'
      path: '/$serviceId'
      fullPath: '/services/$serviceId'
      preLoaderRoute: typeof DashboardServicesServiceIdIndexImport
      parentRoute: typeof DashboardServicesLazyImport
    }
    '/_dashboard/users/$userId/': {
      id: '/_dashboard/users/$userId/'
      path: '/$userId'
      fullPath: '/users/$userId'
      preLoaderRoute: typeof DashboardUsersUserIdIndexImport
      parentRoute: typeof DashboardUsersLazyImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  AuthRoute: AuthRoute.addChildren({ AuthLoginRoute }),
  DashboardRoute: DashboardRoute.addChildren({
    DashboardHostsLazyRoute: DashboardHostsLazyRoute.addChildren({
      DashboardHostsHostIdDeleteRoute,
      DashboardHostsHostIdEditRoute,
      DashboardHostsInboundIdCreateRoute,
      DashboardHostsHostIdIndexRoute,
    }),
    DashboardNodesLazyRoute: DashboardNodesLazyRoute.addChildren({
      DashboardNodesCreateRoute,
      DashboardNodesNodeIdDeleteRoute,
      DashboardNodesNodeIdEditRoute,
      DashboardNodesNodeIdIndexRoute,
    }),
    DashboardServicesLazyRoute: DashboardServicesLazyRoute.addChildren({
      DashboardServicesCreateRoute,
      DashboardServicesServiceIdDeleteRoute,
      DashboardServicesServiceIdEditRoute,
      DashboardServicesServiceIdIndexRoute,
    }),
    DashboardSettingsLazyRoute,
    DashboardUsersLazyRoute: DashboardUsersLazyRoute.addChildren({
      DashboardUsersCreateRoute,
      DashboardUsersUserIdDeleteRoute,
      DashboardUsersUserIdEditRoute,
      DashboardUsersUserIdIndexRoute,
    }),
    DashboardIndexLazyRoute,
  }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_auth",
        "/_dashboard"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/login"
      ]
    },
    "/_dashboard": {
      "filePath": "_dashboard.tsx",
      "children": [
        "/_dashboard/hosts",
        "/_dashboard/nodes",
        "/_dashboard/services",
        "/_dashboard/settings",
        "/_dashboard/users",
        "/_dashboard/"
      ]
    },
    "/_auth/login": {
      "filePath": "_auth/login.tsx",
      "parent": "/_auth"
    },
    "/_dashboard/hosts": {
      "filePath": "_dashboard/hosts.lazy.tsx",
      "parent": "/_dashboard",
      "children": [
        "/_dashboard/hosts/$hostId/delete",
        "/_dashboard/hosts/$hostId/edit",
        "/_dashboard/hosts/$inboundId/create",
        "/_dashboard/hosts/$hostId/"
      ]
    },
    "/_dashboard/nodes": {
      "filePath": "_dashboard/nodes.lazy.tsx",
      "parent": "/_dashboard",
      "children": [
        "/_dashboard/nodes/create",
        "/_dashboard/nodes/$nodeId/delete",
        "/_dashboard/nodes/$nodeId/edit",
        "/_dashboard/nodes/$nodeId/"
      ]
    },
    "/_dashboard/services": {
      "filePath": "_dashboard/services.lazy.tsx",
      "parent": "/_dashboard",
      "children": [
        "/_dashboard/services/create",
        "/_dashboard/services/$serviceId/delete",
        "/_dashboard/services/$serviceId/edit",
        "/_dashboard/services/$serviceId/"
      ]
    },
    "/_dashboard/settings": {
      "filePath": "_dashboard/settings.lazy.tsx",
      "parent": "/_dashboard"
    },
    "/_dashboard/users": {
      "filePath": "_dashboard/users.lazy.tsx",
      "parent": "/_dashboard",
      "children": [
        "/_dashboard/users/create",
        "/_dashboard/users/$userId/delete",
        "/_dashboard/users/$userId/edit",
        "/_dashboard/users/$userId/"
      ]
    },
    "/_dashboard/": {
      "filePath": "_dashboard/index.lazy.tsx",
      "parent": "/_dashboard"
    },
    "/_dashboard/nodes/create": {
      "filePath": "_dashboard/nodes/create.tsx",
      "parent": "/_dashboard/nodes"
    },
    "/_dashboard/services/create": {
      "filePath": "_dashboard/services/create.tsx",
      "parent": "/_dashboard/services"
    },
    "/_dashboard/users/create": {
      "filePath": "_dashboard/users/create.tsx",
      "parent": "/_dashboard/users"
    },
    "/_dashboard/hosts/$hostId/delete": {
      "filePath": "_dashboard/hosts/$hostId/delete.tsx",
      "parent": "/_dashboard/hosts"
    },
    "/_dashboard/hosts/$hostId/edit": {
      "filePath": "_dashboard/hosts/$hostId/edit.tsx",
      "parent": "/_dashboard/hosts"
    },
    "/_dashboard/hosts/$inboundId/create": {
      "filePath": "_dashboard/hosts/$inboundId/create.tsx",
      "parent": "/_dashboard/hosts"
    },
    "/_dashboard/nodes/$nodeId/delete": {
      "filePath": "_dashboard/nodes/$nodeId/delete.tsx",
      "parent": "/_dashboard/nodes"
    },
    "/_dashboard/nodes/$nodeId/edit": {
      "filePath": "_dashboard/nodes/$nodeId/edit.tsx",
      "parent": "/_dashboard/nodes"
    },
    "/_dashboard/services/$serviceId/delete": {
      "filePath": "_dashboard/services/$serviceId/delete.tsx",
      "parent": "/_dashboard/services"
    },
    "/_dashboard/services/$serviceId/edit": {
      "filePath": "_dashboard/services/$serviceId/edit.tsx",
      "parent": "/_dashboard/services"
    },
    "/_dashboard/users/$userId/delete": {
      "filePath": "_dashboard/users/$userId/delete.tsx",
      "parent": "/_dashboard/users"
    },
    "/_dashboard/users/$userId/edit": {
      "filePath": "_dashboard/users/$userId/edit.tsx",
      "parent": "/_dashboard/users"
    },
    "/_dashboard/hosts/$hostId/": {
      "filePath": "_dashboard/hosts/$hostId/index.tsx",
      "parent": "/_dashboard/hosts"
    },
    "/_dashboard/nodes/$nodeId/": {
      "filePath": "_dashboard/nodes/$nodeId/index.tsx",
      "parent": "/_dashboard/nodes"
    },
    "/_dashboard/services/$serviceId/": {
      "filePath": "_dashboard/services/$serviceId/index.tsx",
      "parent": "/_dashboard/services"
    },
    "/_dashboard/users/$userId/": {
      "filePath": "_dashboard/users/$userId/index.tsx",
      "parent": "/_dashboard/users"
    }
  }
}
ROUTE_MANIFEST_END */
