import { createContext } from './createContext';

// const themesSupported = ['dark-theme', "light-theme"];
const initialState = {
  currentTheme: 'dark-theme',
};

const actionNames = {
  updateTheme: 'updateTheme',
};

const reducer = (state, action) => {
    if(action.type === actionNames.updateTheme) {
        return {...state, currentTheme: action.payload}
    } else {
        return {...state};
    }
}

const updateTheme = (dispatch) => (themeColor) => dispatch({ type: actionNames.updateTheme, payload: themeColor });

export const { Context, Provider } = createContext(reducer, { updateTheme }, initialState);

export function withTheme (Component) {
    return function contextComponent(props) {
        return (
          <Context.Consumer>
            {(context) => <Component {...props} themeContext={context} />}
          </Context.Consumer>
        );
    }
}
