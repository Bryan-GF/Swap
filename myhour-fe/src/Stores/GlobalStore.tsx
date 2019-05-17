import {observable, action, computed} from 'mobx';
import {createContext} from 'react';
import axios from 'axios';


class GlobalState {
    @observable userData = {employeeID : "",  Firstname: "", Lastname: "", Position: "", branchID: ""};

    @observable loginStatus = false;

    @observable targetEmployee = {employeeID: '', Name: '', Position: '', branchID: '', UserID: ''};

    @observable branchData = [];

    @action deleteUser = () => {
        return axios
        .post('https://swapapi.azurewebsites.net/api/DeleteUser', {UserID: this.targetEmployee.UserID})
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

    @action addShift = async(shiftDate, startTime, endTime) => {
        shiftDate = shiftDate.slice(0, 10);
        startTime =startTime.slice(11, 19);
        endTime = endTime.slice(11, 19);
        return await axios
        .post('https://swapapi.azurewebsites.net/api/AddShift', {"UserID": this.targetEmployee.UserID, "shiftDate": shiftDate, "startTime": startTime, "endTime": endTime})
        .then(res => {
            console.log(res.data);     
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
        this.userData = userInfo;
    }

    @action setTargetEmployee = (employeeInfo) => {
        this.targetEmployee = employeeInfo;
    }

    @computed get UserName() {
        return this.userData.Firstname;
    }
}

export const GlobalStateContext = createContext(new GlobalState());