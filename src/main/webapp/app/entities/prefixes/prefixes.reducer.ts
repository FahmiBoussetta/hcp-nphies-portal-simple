import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPrefixes, defaultValue } from 'app/shared/model/prefixes.model';

export const ACTION_TYPES = {
  FETCH_PREFIXES_LIST: 'prefixes/FETCH_PREFIXES_LIST',
  FETCH_PREFIXES: 'prefixes/FETCH_PREFIXES',
  CREATE_PREFIXES: 'prefixes/CREATE_PREFIXES',
  UPDATE_PREFIXES: 'prefixes/UPDATE_PREFIXES',
  PARTIAL_UPDATE_PREFIXES: 'prefixes/PARTIAL_UPDATE_PREFIXES',
  DELETE_PREFIXES: 'prefixes/DELETE_PREFIXES',
  RESET: 'prefixes/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPrefixes>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PrefixesState = Readonly<typeof initialState>;

// Reducer

export default (state: PrefixesState = initialState, action): PrefixesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PREFIXES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PREFIXES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PREFIXES):
    case REQUEST(ACTION_TYPES.UPDATE_PREFIXES):
    case REQUEST(ACTION_TYPES.DELETE_PREFIXES):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_PREFIXES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PREFIXES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PREFIXES):
    case FAILURE(ACTION_TYPES.CREATE_PREFIXES):
    case FAILURE(ACTION_TYPES.UPDATE_PREFIXES):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_PREFIXES):
    case FAILURE(ACTION_TYPES.DELETE_PREFIXES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PREFIXES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PREFIXES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PREFIXES):
    case SUCCESS(ACTION_TYPES.UPDATE_PREFIXES):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_PREFIXES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PREFIXES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/prefixes';

// Actions

export const getEntities: ICrudGetAllAction<IPrefixes> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PREFIXES_LIST,
  payload: axios.get<IPrefixes>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPrefixes> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PREFIXES,
    payload: axios.get<IPrefixes>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPrefixes> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PREFIXES,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPrefixes> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PREFIXES,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IPrefixes> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_PREFIXES,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPrefixes> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PREFIXES,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
