import { ActionReducer, Action } from '@ngrx/store';
import { Slot } from '../model/slot';
import * as _ from 'lodash';

let init: Array<Slot> = [];

let copy = function(slot: Slot): Slot {
    let copy = new Object();
    for (let key in slot) {
        copy[key] = slot[key];
    }
    return <Slot>copy;
};
let replace = function(slots: Array<Slot>, slot: Slot): Array<Slot> {
    let result: Array<Slot> = new Array<Slot>();
    let i = 0;
    for (let s of slots) {
        if (s.id === slot.id) {
            result[i] = slot;
        } else {
            result[i] = s;
        }
        i++;
    }
    return result;
};
let union = function(slots1: Array<Slot>, slots2: Array<Slot>): Array<Slot> {
    let result: Array<Slot> = new Array<Slot>();
    let i = 0;
    for (let s1 of slots1) {
        result[i] = s1;
        i++;
    }
    for (let s2 of slots2) {
        let found = false;
        for (let s1 of slots1) {
            if (s1.id === s2.id) {
                found = true;
                break;
            }
        }
        if (!found) {
            result[i] = s2;
            i++;
        }
    }
    return result;
};

export const slotsrx: ActionReducer<Array<Slot>> = (state: Array<Slot> = init, action: Action) => {
    switch (action.type) {
        case 'ADD_SLOTS':
            return [
                ...union(
                    state,
                    action.payload
                )
            ];
        case 'SET_SLOT_PROFESSOR':
            let slot = copy(action.payload.slot);
            slot.professor = action.payload.professor;
            return replace(state, slot);
        case 'SET_SLOT_MEETING':
            slot = copy(action.payload.slot);
            slot.meeting = action.payload.meeting;
            return replace(state, slot);
        case 'SET_SLOT_STATUS':
            slot = copy(action.payload.slot);
            slot.status = action.payload.status;
            return replace(state, slot);
        case 'ADD_SLOT':
            return [
                ...state,
                action.payload
            ];
        case 'REMOVE_SLOT':
            return [
                ..._.reject(state, { 'id': action.payload.id })
            ];
        case 'REPLACE_SLOT':
            return [
                ..._.reject(state, { 'id': action.payload.id }),
                action.payload
            ];
        case 'CLEAR':
            return init;
        default:
            return state;
    }
};
