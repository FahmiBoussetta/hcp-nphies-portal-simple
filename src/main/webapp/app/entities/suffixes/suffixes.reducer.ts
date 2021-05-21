import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISuffixes, defaultValue } from 'app/shared/model/suffixes.model';

export const ACTION_TYPES = {
  FETCH_SUFFIXES_LIST: 'suffixes/FETCH_SUFFIXES_LIST',
  FETCH_SUFFIXES: 'suffixes/FETCH_SUFFIXES',
  CREATE_SUFFIXES: 'suffixes/CREATE_SUFFIXES',
  UPDATE_SUFFIXES: 'suffixes/UPDATE_SUFFIXES',
  PARTIAL_UPDATE_SUFFIXES: 'suffixes/PARTIAL_UPDATE_SUFFIXES',
  DELETE_SUFFIXES: 'suffixes/DELETE_SUFFIXES',
  RESET: 'suffixes/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISuffixes>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type SuffixesState = Readonly<typeof initialState>;

// Reducer

export default (state: SuffixesState = initialState, action): SuffixesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SUFFIXES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SUFFIXES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_SUFFIXES):
    case REQUEST(ACTION_TYPES.UPDATE_SUFFIXES):
    case REQUEST(ACTION_TYPES.DELETE_SUFFIXES):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_SUFFIXES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_SUFFIXES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SUFFIXES):
    case FAILURE(ACTION_TYPES.CREATE_SUFFIXES):
    case FAILURE(ACTION_TYPES.UPDATE_SUFFIXES):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_SUFFIXES):
    case FAILURE(ACTION_TYPES.DELETE_SUFFIXES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SUFFIXES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SUFFIXES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_SUFFIXES):
    case SUCCESS(ACTION_TYPES.UPDATE_SUFFIXES):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_SUFFIXES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_SUFFIXES):
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

const apiUrl = 'api/suffixes';

// Actions

export const getEntities: ICrudGetAllAction<ISuffixes> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SUFFIXES_LIST,
  payload: axios.get<ISuffixes>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ISuffixes> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SUFFIXES,
    payload: axios.get<ISuffixes>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ISuffixes> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SUFFIXES,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISuffixes> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SUFFIXES,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<ISuffixes> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_SUFFIXES,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISuffixes> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SUFFIXES,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
