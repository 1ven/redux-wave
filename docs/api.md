# API
## Functions
### `createApi(spec, queryConfig, settings?)`
Creates `api` instance object, with the same structure as given `spec`.
#### Arguments:
- `spec`: [Spec](#spec) - Api definition.
- `queryConfig`: [QueryConfig](#queryconfig) - Api request configuration, could be ovverrided in spec entry.
- `settings?`: [Settings](#settings) - Api settings.

**Returns:** [Api](#api-1)
___
### `createMiddleware(api, anotherApi?, ...)`
Creates middleware for listening request actions and fetching data from server.
Accepts multiple api instances.
#### Arguments:
- `api`: [Api](#api-1) - Api instance object.

**Returns:** Redux middleware function.
___
### `createReducer(api)`
Creates reducer for given api instance. Should be mounted at `state.api` path unless `selector` option is specified at [Settings](#settings).
#### Arguments:
- `api`: [Api](#api) - Api instance object.

**Returns:** Redux reducer.
## Types
### `Spec`
Api spec object. Could have any level of nesting. Contains [SpecEntry](#specentry) objects as values.
___
### `SpecEntry`
Api spec entry object. Contains description of api request.
#### Fields:
- `path`: string - Url path of api call. Accepts params in format `:[param_name]`.
- `method`: string - Http method of request.
- `config?`: [QueryConfig](#queryconfig) - Request configuration. Overrides default config.
___
### `QueryConfig`
Api request configuration.
#### Fields:
- `endpoint`: string - Api endpoint.
___
### `Settings`
Api instance settings.
#### Fields:
- `context?`: string = `""` - Prefix, which will be added in the beginning of action types in the specific api.
- `selector?`: function = `(state) => state.api` - Selector, returning api reducer.
___
### `Api`
Api instance object. Contains [ApiEntry](#apientry) objects as values. Has the same structure as it's [Spec](#spec).
___
### `ApiEntry`
Api entry object. Contains all needed data for making and handling api request.
#### Fields:
- `select`: [ApiEntry.select](#apientryselectkey) - Returns redux selector according given `key`.
- `type`: [ApiEntry.type](#apientrytype) - Returns action type according given `key`.
- `actions`: [ApiEntry.actions](#apientryactions) - Object of redux action creators.
- `reducer`: [ApiEntry.reducer](#apientryreducer) - Api entry reducer. Used internally in the library and in the enhancer API.
- `fetch`: [ApiEntry.fetch](#apientryfetch) - Function, used to making api requests. Used internally in the library and in the enhancer API.
### `ApiEntry.select(key)`
#### Arguments:
- `key`: 'data' | 'isFetching' | 'lastUpdated' | 'error' - Api entry state key.
### `ApiEntry.type(key)`
#### Arguments:
- `key`: 'request' | 'success' | 'failure' - Action type `key`.
### `ApiEntry.reducer(state, action)`
#### Arguments:
- `state`: [State](#state) - Api entry state object.
- `action`: Object - Redux action.
### `ApiEntry.fetch(onSuccess, onFailure, payload?)`
#### Arguments:
- `onSuccess`: function - Callback, which will be called when request succeeded.
- `onFailure`: function - Callback, which will be called when request failed.
- `payload?`: [RequestAction.payload](requestactionpayload) - Request action payload object.
___
### `Actions`
Async actions creators object.
#### Fields:
- `request`: [Actions.request](#actionsrequest) - Request action creator function.
- `success`: [Actions.success](#actionssuccess) - Success action creator function.
- `request`: [Actions.failure](#actionsfailure) - Failure action creator function.
### `Actions.request(payload?)`
#### Arguments:
- `payload?`: [RequestAction.payload](#requestactionpayload) - Request action payload data.
### `Actions.success(payload)`
#### Arguments:
- `payload`: [SuccessAction.payload](#successactionpayload) - Success action payload data.
### `Actions.failure(payload)`
#### Arguments:
- `payload`: [FailureAction.payload](#failureactionpayload) -Failure action payload data.
___
### `RequestAction`
Request action object.
#### Fields:
- `type`: string - Action type, has format like "[prefix/[path]/request]".
- `payload?`: [RequestAction.payload](#requestactionpayload) - Request action payload data.
### `RequestAction.payload`
#### Fields:
- `params?`: Object - Params of api request, should correspond to params, defined in [SpecEntry]() `path`.
- `body?`: any - Request body data.
___
### `SuccessAction`
Success action object.
#### Fields:
- `type`: string - Action type, has format like "[prefix/[path]/success]".
- `payload?`: [SuccessAction.payload](#successactionpayload) - Success action payload data.
### `SuccessAction.payload`
#### Fields:
- `meta`: [ResponseMeta](#responsemeta) - Object, containing meta data of response.
- `request?`: [RequestAction.payload](#requestactionpayload) - Payload of request action.
- `body?`: any - Response body data.
___
### `FailureAction`
Failure action object.
#### Fields:
- `type`: string - Action type, has format like "[prefix/[path]/failure]".
- `payload?`: [FailureAction.payload](#failureactionpayload) - Failure action payload data.
### `FailureAction.payload`
- `meta`: [ResponseMeta](#responsemeta) - Object, containing meta data of response.
- `message`: string - Error message.
- `request?`: [RequestAction.payload](#requestactionpayload) - Payload of request action.
- `body?`: any - Response body data.
___
### `ResponseMeta`
Meta data of response.
#### Fields:
- `status`: number - Response status code.
- `receivedAt`: number - Response timestamp.
___
### `State`
Api entry state object.
#### Fields
- `isFetching`: boolean - Value, determining whether data is fetching from server or not.
- `request?`: [RequestAction.payload](#requestactionpayload) - Payload of request action.
- `data?`: any - Response body data.
- `lastUpdated?`: number  - Timestamp of last request.
- `error?`: string - Error message.