import * as types from "../constants/action-types";

export const openLeftDrawer = () => ({ type: types.OPEN_LEFT_DRAWER });
export const closeLeftDrawer = () => ({ type: types.CLOSE_LEFT_DRAWER });

export const openBottomDrawer = () => ({ type: types.OPEN_BOTTOM_DRAWER });
export const closeBottomDrawer = () => ({ type: types.CLOSE_BOTTOM_DRAWER });
