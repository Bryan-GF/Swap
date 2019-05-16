import {observable, action, computed} from 'mobx';
import {createContext} from 'react';
import axios from 'axios';


class GlobalState {
    @observable userData = {employeeID : "",  Firstname: "", Lastname: "", Position: "", branchID: ""};

    @observable loginStatus = false;

    @observable branchData = [];

    @action deleteUser = (ID) => {
        return axios
        .post('https://swapapi.azurewebsites.net/api/DeleteUser', {employeeID: ID, branchID: this.userData.branchID})
        .then(res => {
            console.log(res); 
        }).catch(err => {
            console.log(err)
        })
    }

    @action addEmployee = async(employee) => {
        return await axios
        .post('https://swapapi.azurewebsites.net/api/AddUser', {...employee, "branchID": this.userData.branchID})
        .then(res => {
            console.log(res); 
        }).catch(err => {
            console.log(err)
        })
    }

    @action getBranchData = async() => {
        return await axios
        .post('https://swapapi.azurewebsites.net/api/GetBranchEmployees', {"branchID": this.userData.branchID})
        .then(res => {
            console.log(res.data);
            this.branchData = res.data;       
        }).catch(err => {
            console.log(err)
        })
    }

    //LOGIN ACTIONS
    @action attemptLogin = () => {
        console.log('attempted')
    }

    @action setLoginStatus = (status: boolean) => {
        this.loginStatus = status;
    }
    ///////////////

    @action setUserData = (userInfo: any) => {
        this.userData =  {employeeID: userInfo.employeeID, Firstname: userInfo.Firstname, Lastname: userInfo.Lastname, Position: userInfo.Position, branchID: userInfo.branchID}
    }

    @computed get UserName() {
        return this.userData.Firstname;
    }
}

export const GlobalStateContext = createContext(new GlobalState());