import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserState } from 'types/data';
import { getRandomInt } from 'utils';

const initialState: UserState[] = [];

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    populate: (state, action: PayloadAction<UserState[]>) => {
      let newest = action.payload.map((user: UserState) => ({
        ...user,
        rating: 0,
      }));
      return [...newest];
    },
    declinegeneral: (state, action: PayloadAction<number>) => {
      let id = action.payload;

      return state.map((user: any) => {
        if (user.id === id) {
          return { ...user, rating: user.rating - 1 };
        }
        return user;
      });
    },
    increasegeneral: (state, action: PayloadAction<number>) => {
      let id = action.payload;

      return state.map((user: any) => {
        if (user.id === id) {
          return { ...user, rating: user.rating + 1 };
        }
        return user;
      });
    },
    declinebonus: (state, action: PayloadAction<number>) => {
      let id = action.payload;

      return state.map((user: any) => {
        if (user.id === id && user.rating > 0) {
          return { ...user, rating: user.rating - 1 };
        }
        return user;
      });
    },
    increasebonus: (state, action: PayloadAction<number>) => {
      let id = action.payload;

      return state.map((user: any) => {
        if (user.id === id && user.rating < 5) {
          return { ...user, rating: user.rating + 1 };
        }
        return user;
      });
    },
    declineban: (state, action: PayloadAction<number>) => {
      let id = action.payload;

      return state.map((user: any) => {
        if (user.id === id && user.rating > -5) {
          return { ...user, rating: user.rating - 1 };
        }
        return user;
      });
    },
    increaseban: (state, action: PayloadAction<number>) => {
      let id = action.payload;

      return state.map((user: any) => {
        if (user.id === id && user.rating < 0) {
          return { ...user, rating: user.rating + 1 };
        }
        return user;
      });
    },
    resetuser: (state, action: PayloadAction<number>) => {
      return state.map((user: any) => {
        if (user.rating === 5 || user.rating === -5) {
          return { ...user, rating: 0 };
        }
        return user;
      });
    },
    loadmore: (state, action: PayloadAction<UserState[]>) => {
      let newest = action.payload.map((user: UserState, i: any) => {
        if (i === 5) {
          return {
            ...user,
            rating: getRandomInt(),
          };
        } else if (i === 6) {
          return {
            ...user,
            rating: getRandomInt(),
          };
        } else {
          return {
            ...user,
            rating: 0,
          };
        }
      });

      return [...newest];
    },
  },
});

export const {
  increasegeneral,
  declinegeneral,
  increasebonus,
  declinebonus,
  populate,
  declineban,
  increaseban,
  resetuser,
  loadmore,
} = userSlice.actions;

export default userSlice.reducer;
