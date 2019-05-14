import {observable, action, computed} from 'mobx';
import {createContext} from 'react';


class GlobalState {
    @observable userData = {employeeID : "",  Firstname: "", Lastname: "", Position: ""};

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
        this.userData =  {employeeID: userInfo.employeeID, Firstname: userInfo.Firstname, Lastname: userInfo.Lastname, Position: userInfo.Position}
    }

    @computed get UserName() {
        return this.userData.Firstname;
    }
}

export const GlobalStateContext = createContext(new GlobalState());