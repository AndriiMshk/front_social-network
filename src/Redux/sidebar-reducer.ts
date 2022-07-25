const initialState = {
  friends: [
    {
      id: 1,
      name: 'Mercedes',
      ava: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/800px-Mercedes-Logo.svg.png',
    },
    {
      id: 2,
      name: 'Volvo',
      ava: 'https://upload.wikimedia.org/wikipedia/ru/thumb/7/74/Volvo_Logo.svg/1200px-Volvo_Logo.svg.png',
    },
    {
      id: 3,
      name: 'Lancia',
      ava: 'https://upload.wikimedia.org/wikipedia/ru/thumb/b/ba/Lancia_Logo.svg/1200px-Lancia_Logo.svg.png',
    },
  ],
};

export const sidebarReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => { //any template!
  return state;
};

type initialStateType = {
  friends: {
    id: number
    name: string
    ava: string
  }[]
}

type ActionType = any