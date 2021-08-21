import * as actionTypes from './actionTypes';

export function add(document) {
    return { type: actionTypes.ADD_DOCUMENT, document: document }
}

export function update(document) {
    return { type: actionTypes.UPDATE_DOCUMENT, document: document }
}