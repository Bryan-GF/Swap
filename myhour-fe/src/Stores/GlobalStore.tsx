import {observable, action, computed} from 'mobx';
import {createContext} from 'react';

class GlobalState {
    @observable userData = {name : "", id : ""};

    @action setUserData = (userInfo: any) => {
        this.userData =  {name: userInfo.name, id: userInfo.id}
    }

    @computed get UserName() {
        return this.userData.name;
    }
}

export const GlobalStateContext = createContext(new GlobalState());