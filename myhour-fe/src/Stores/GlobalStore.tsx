import {observable, action, computed} from 'mobx';
import {createContext} from 'react';

class GlobalState {
    @observable userData = {name : "", id : ""};

    @observable loginStatus = false;


    //LOGIN ACTIONS
    @action attemptLogin = () => {
        console.log('attempted')
    }

    @action setLoginStatus = (status: boolean) => {
        this.loginStatus = status;
    }
    ///////////////
    
    @action setUserData = (userInfo: any) => {
        this.userData =  {name: userInfo.name, id: userInfo.id}
    }

    @computed get UserName() {
        return this.userData.name;
    }
}

export const GlobalStateContext = createContext(new GlobalState());