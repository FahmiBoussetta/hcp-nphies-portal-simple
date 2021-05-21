import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITexts, defaultValue } from 'app/shared/model/texts.model';

export const ACTION_TYPES = {
  FETCH_TEXTS_LIST: 'texts/FETCH_TEXTS_LIST',
  FETCH_TEXTS: 'texts/FETCH_TEXTS',
  CREATE_TEXTS: 'texts/CREATE_TEXTS',
  UPDATE_TEXTS: 'texts/UPDATE_TEXTS',
  PARTIAL_UPDATE_TEXTS: 'texts/PARTIAL_UPDATE_TEXTS',
  DELETE_TEXTS: 'texts/DELETE_TEXTS',
  RESET: 'texts/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITexts>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type TextsState = Readonly<typeof initialState>;

// Reducer

export default (state: TextsState = initialState, action): TextsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TEXTS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TEXTS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_TEXTS):
    case REQUEST(ACTION_TYPES.UPDATE_TEXTS):
    case REQUEST(ACTION_TYPES.DELETE_TEXTS):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_TEXTS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_TEXTS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TEXTS):
    case FAILURE(ACTION_TYPES.CREATE_TEXTS):
    case FAILURE(ACTION_TYPES.UPDATE_TEXTS):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_TEXTS):
    case FAILURE(ACTION_TYPES.DELETE_TEXTS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TEXTS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TEXTS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_TEXTS):
    case SUCCESS(ACTION_TYPES.UPDATE_TEXTS):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_TEXTS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_TEXTS):
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

const apiUrl = 'api/texts';

// Actions

export const getEntities: ICrudGetAllAction<ITexts> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TEXTS_LIST,
  payload: axios.get<ITexts>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ITexts> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TEXTS,
    payload: axios.get<ITexts>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ITexts> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TEXTS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITexts> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TEXTS,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<ITexts> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_TEXTS,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITexts> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TEXTS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
