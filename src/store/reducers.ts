import immer from 'immer';
import {
  KEYCODEKEY_ACTIONS,
  KEYCODEKEY_UPDATE_HOVER_KEY,
  KEYCODEKEY_UPDATE_SELECTED_KEY,
  KEYCODES_ACTIONS,
  KEYCODES_UPDATE_CATEGORY_INDEX,
  KEYCODES_UPDATE_MACRO,
} from '../actions/actions';
import {
  HID_ACTIONS,
  HID_CONNECT_KEYBOARD,
  HID_DISCONNECT_KEYBOARD,
  HID_OPEN_KEYBOARD,
  HID_UPDATE_KEYBOARD_LIST,
} from '../actions/hid.action';
import { MacroKeycodeType } from '../components/configure/keycodes/Keycodes.container';
import { IKeyboard } from '../services/hid/hid';

import { INIT_STATE, RootState } from './state';

export type Action = { type: string; value: any };

const reducers = (state: RootState = INIT_STATE, action: Action) =>
  immer(state, (draft) => {
    if (action.type.startsWith(KEYCODES_ACTIONS)) {
      keycodesReducer(action, draft);
    } else if (action.type.startsWith(KEYCODEKEY_ACTIONS)) {
      keycodekeyReducer(action, draft);
    } else if (action.type.startsWith(HID_ACTIONS)) {
      hidReducer(action, draft);
    }
  });

const hidReducer = (action: Action, draft: RootState) => {
  // TODO: type-safe
  switch (action.type) {
    case HID_CONNECT_KEYBOARD: {
      const keyboard: IKeyboard = action.value.keyboard;
      draft.hid.keyboards.push(keyboard);
      break;
    }
    case HID_DISCONNECT_KEYBOARD: {
      const keyboard: IKeyboard = action.value.keyboard;
      draft.hid.keyboards.filter((item) => {
        return item != keyboard;
      });
      if (draft.hid.openedKeyboard == keyboard) {
        draft.hid.openedKeyboard = null;
      }
      break;
    }
    case HID_OPEN_KEYBOARD: {
      const keyboard: IKeyboard = action.value.keyboard;
      draft.hid.openedKeyboard = keyboard;
      break;
    }
    case HID_UPDATE_KEYBOARD_LIST: {
      const keyboards: IKeyboard[] = action.value.keyboards;
      draft.hid.keyboards = keyboards;
      break;
    }
  }
};

const keycodesReducer = (action: Action, draft: RootState) => {
  // TODO: type-safe
  switch (action.type) {
    case KEYCODES_UPDATE_CATEGORY_INDEX: {
      draft.keycodes.categoryIndex = action.value;
      break;
    }
    case KEYCODES_UPDATE_MACRO: {
      const code = action.value.code as MacroKeycodeType;
      draft.entities.macros[code] = action.value.text;
      break;
    }
  }
};

const keycodekeyReducer = (action: Action, draft: RootState) => {
  // TODO: type-safe
  switch (action.type) {
    case KEYCODEKEY_UPDATE_SELECTED_KEY: {
      draft.keycodeKey.selectedKey = action.value;
      break;
    }
    case KEYCODEKEY_UPDATE_HOVER_KEY: {
      draft.keycodeKey.hoverKey = action.value;
      break;
    }
  }
};
export default reducers;