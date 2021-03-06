import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IGivens, defaultValue } from 'app/shared/model/givens.model';

export const ACTION_TYPES = {
  FETCH_GIVENS_LIST: 'givens/FETCH_GIVENS_LIST',
  FETCH_GIVENS: 'givens/FETCH_GIVENS',
  CREATE_GIVENS: 'givens/CREATE_GIVENS',
  UPDATE_GIVENS: 'givens/UPDATE_GIVENS',
  PARTIAL_UPDATE_GIVENS: 'givens/PARTIAL_UPDATE_GIVENS',
  DELETE_GIVENS: 'givens/DELETE_GIVENS',
  RESET: 'givens/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IGivens>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type GivensState = Readonly<typeof initialState>;

// Reducer

export default (state: GivensState = initialState, action): GivensState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_GIVENS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_GIVENS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_GIVENS):
    case REQUEST(ACTION_TYPES.UPDATE_GIVENS):
    case REQUEST(ACTION_TYPES.DELETE_GIVENS):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_GIVENS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_GIVENS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_GIVENS):
    case FAILURE(ACTION_TYPES.CREATE_GIVENS):
    case FAILURE(ACTION_TYPES.UPDATE_GIVENS):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_GIVENS):
    case FAILURE(ACTION_TYPES.DELETE_GIVENS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_GIVENS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_GIVENS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_GIVENS):
    case SUCCESS(ACTION_TYPES.UPDATE_GIVENS):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_GIVENS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_GIVENS):
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

const apiUrl = 'api/givens';

// Actions

export const getEntities: ICrudGetAllAction<IGivens> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_GIVENS_LIST,
  payload: axios.get<IGivens>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IGivens> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_GIVENS,
    payload: axios.get<IGivens>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IGivens> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_GIVENS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IGivens> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_GIVENS,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IGivens> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_GIVENS,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IGivens> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_GIVENS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
