---
title: 'Maximizing Efficiency: How React Query Can Revolutionize Your API Calls'
date: '2024-05-04'
description: 'TanStack Query (FKA React Query) is becoming popular library in handling data-fetching for web applications with ease. It makes fetching, caching, synchronizing and updating server state in your web applications a breeze.'
tags: ['api', 'react-query', 'react server state handling']
---

## Introduction to React Query and its purpose

While React is good with client-side data handling like

- storing the data in the state, context API, etc
- form handling
- state management for views, etc

React-query targets server-side data handling like

- side-effects for API calls
- throttling of API calls
- cache-ing of the data
- updating loading and loaded states along with error states
- Refetching and pre-fetching data at intervals / Polling.
- fetching data on window focus
- manage sequential calls / dependent calls.
- Network calls when the network is back / Offline support
- Garbage collection
- Window focus prefetching API
- Handling infinite scroll getting data

This is type-safe and typescript enabled.

## Installation

While `@tanstack/react-query` is the only package that is required, few other packages go very well with react-query.

- Eslint: `@tanstack/eslint-plugin-query`
- Devtools: `@tanstack/react-query-devtools`

For using CDN, we could use the following script at the end of the body.

```
<script type="module">
  import React from 'https://esm.sh/react@18.2.0'
  import ReactDOM from 'https://esm.sh/react-dom@18.2.0'
  import { QueryClient } from 'https://esm.sh/@tanstack/react-query'
</script>
```

### How to use the dev tools

```
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

Other options for dev tools

- initialIsOpen: boolean
- buttonPosition : "top-left" | "top-right" | "bottom-left" | "bottom-right" | "relative"
- position: "top" | "bottom" | "left" | "right"
- client: QueryClient
  While for other options follow [here](https://tanstack.com/query/latest/docs/framework/react/devtools)

## Core Concepts

- Queries: useQuery or useInfiniteQuery
- Mutations
- Query Invalidations

The library is built on when API calls are made. The calls are made only when the data is stale. The user can set the time as to how long the user wants the cached data on a global level or the individual level. Below are the scenarios when the calls are made

- New instances of the query mount
- the window is refocussed
- the network is reconnected
- Query is optionally configured with a refetch interval

React Query keeps the key as a marker to cache the records.

```
useQuery({ queryKey: ['todos’, todoId], queryFn: fetchAllTodos }
```

Note: While query can be used for both GET and POST, mutations are used when there is a change in server data like add/delete actions.

React Query gives a set of statuses for UI to check on the value like

- isPending or status === “pending”’
- isError or status === “error”
- isSuccess or status === “success”

There are other variables as well to give more information

- error: While in error state, we could check the error type and more details
- data: While in success, we can access the data sent by the server
- isFetching: While the query is fetching an API.

## Making Parallel, Dependent, Paginated & Infinite Queries

### Parallel Querires

For parallel queries, the developer can write as separate statements.

```
const usersQuery = useQuery({ queryKey: ['users'], queryFn: fetchUsers })
const teamsQuery = useQuery({ queryKey: ['teams'], queryFn: fetchTeams })
const projectsQuery = useQuery({ queryKey: ['projects'], queryFn: fetchProjects })
```

While the above parallelisation is good for a known set of calls, sometimes it might be required to call on dynamic instances. For those scenarios, follow the below code.

```
const userQueries = useQueries({
  queries: users.map((user) => {
    return {
      queryKey: ['user', user.id],
      queryFn: () => fetchUserById(user.id),
    }
  }),
})
```

### Dependent Queries

If there is some dependency on an earlier call before a call is being made, then use the below code. The key is `enabled` which makes sure the call is only made when it is true.

```
const { data: user } = useQuery({
  queryKey: ['user', email],
  queryFn: getUserByEmail,
})

const userId = user?.id

const {
  status,
  fetchStatus,
  data: projects,
} = useQuery({
  queryKey: ['projects', userId],
  queryFn: getProjectsByUser,
  // The query will not execute until the userId exists
  enabled: !!userId,
})
```

### Paginated Queries

While working with useQuery for pagination, it would work fine, but there would be a jumping off the records because of fetching the data and change of status from pending to idle. To avoid jumping off the data, we could use “keepPreviousData”. This would keep the old records till the new data is replaced. For the initial page load, the data would not be there, so the loading state would show, but for later calls, there would not be a jumping of data.

```
import { keepPreviousData, useQuery } from '@tanstack/react-query'

useQuery({
  queryKey: ['projects', page],
  ueryFn: () => fetchProjects(page),
  placeholderData: keepPreviousData,
})
```

### Infinite Queries

While there has been a general pattern for adding more data to the list to show more as we scroll, react-query has it covered. We just have to change from “useQuery” to “useInfiniteQuery”. There would be few noticeable checks

- data is an object now
- data.pages is the array of data per page
- data.pageParams array containing the page params used to fetch pages.
- fetchNextPage and fetchPreviousPage functions are available
- initialPageParams option is now available
- hasNextPage: a boolean specifying if there are no further pages.
- hasPreviousPage: a boolean specifying if there are no previous pages.
- isFetchingNextPage and isFetchingPrevious page for loading, error and success states.

```
import { useInfiniteQuery } from '@tanstack/react-query'

function Projects() {
  const fetchProjects = async ({ pageParam }) => {
    const res = await fetch('/api/projects?cursor=' + pageParam)
    return res.json()
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  })

  return status === 'pending' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      {data.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.data.map((project) => (
            <p key={project.id}>{project.name}</p>
          ))}
        </React.Fragment>
      ))}
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  )
}
```

## Configurations

While the configurations can be global, each query can be configured by the options provided. Below are a few options:

- staleTime : (in ms): This is a flag when the user to fetch data.
- refetchOnMount
- refetchOnWindowFocus
- refetchOnReconnect
- refetchInterval
- gcTime: garbage collection time: default -> 5s
- retry: <number | false>: number would be the number of retries, false would be no retry
- retryDelay: in ms

Inactive queries are garbage collected after 5s.

## Links & References:

- [Official Website](https://tanstack.com/query/latest)
- [Series on useQuery](https://www.youtube.com/watch?v=xoPguAXJmiE&list=PLC3y8-rFHvwjTELCrPrcZlo6blLBUspd2&index=19)
- [Crash Course](https://www.youtube.com/watch?v=r8Dg0KVnfMA)
- [React DevTools options](https://tanstack.com/query/latest/docs/framework/react/devtools)
