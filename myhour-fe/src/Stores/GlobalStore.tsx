import {observable, action, computed} from 'mobx';
import {createContext} from 'react';
import axios from 'axios';

class GlobalState {
    @observable userData = {UserID: "" , email : "",  Firstname: "", Lastname: "", Position: "", branchID: "", CompanyID: "", roles: ""};

    @observable loginStatus = false;

    @observable branchData = [];

    @observable currShifts = [];

    @observable userRequests = [];

    //IMPORTANT FOR REQUESTS
    
    @observable todaysShifts = [];

    @observable todaysRequests = [];

    @observable currEmployee = {UserID: '', email: '', Name: '', Position: ''};

    @action deleteRequest = async(UserID, ShiftID) => {  
        return await axios
        .post('https://swapapi.azurewebsites.net/api/DeleteRequest', {UserID: UserID, ShiftID: ShiftID})
        .then(res => {
            return true;
        }).catch(err => {
            return false;
        })
    }

    @action acceptRequest = (DelUserID, ShiftID) => {
        return axios
        .post('https://swapapi.azurewebsites.net/api/AcceptRequest', {AddUserID: this.userData.UserID, DelUserID: DelUserID, ShiftID: ShiftID})
        .then(res => {
            console.log(res); 
        }).catch(err => {
            console.log(err);
        })
    }

    @action getRequestCounts = () => {
        return axios
        .get('https://swapapi.azurewebsites.net/api/GetRequestCounts')
        .then(res => {
            return res.data; 
        }).catch(err => {
            console.log(err);
        })
    }

    @action getUserRequests = async() => {
        return await axios
        .post('https://swapapi.azurewebsites.net/api/GetUserRequests', {UserID: this.userData.UserID})
        .then(res => {
            if(res.data != null) {
               this.userRequests =res.data;
            }
        }).catch(err => {
            console.log(err);
        })   
    }

    @action addRequest = (RequestData) => {
        return axios
        .post('https://swapapi.azurewebsites.net/api/AddRequest', {UserID: this.userData.UserID, ShiftID: RequestData.ShiftID, Comment: RequestData.Comment, Urgent: RequestData.Urgent})
        .then(res => {
            return true;
        }).catch(err => {
            return false;
        })
    }

    @action getRequestsByDay = async(date) => {
        return await axios
        .post('https://swapapi.azurewebsites.net/api/GetRequestsByDay', {"shiftDate": date})
        .then(res => {
            if(res.data != null) {
                this.todaysRequests = res.data;  
                console.log(this.todaysRequests);
                return ({ShiftID: res.data[0].ShiftID});
            } else {
                this.todaysRequests = [];
                return null;
            }
        }).catch(err => {
            return null;
        })
    }

    @action deleteUser = (ID) => {
        return axios
        .post('https://swapapi.azurewebsites.net/api/DeleteUser', {UserID: ID})
        .then(res => {
            return true;
        }).catch(err => {
            return false;
        })
    }

    @action addEmployee = async(employee) => {
        console.log(employee);
        console.log(this.userData.branchID);
        console.log(this.userData.CompanyID);
        return await axios
        .post('https://swapapi.azurewebsites.net/api/AddUser', {...employee, "branchID": this.userData.branchID, "CompanyID": this.userData.CompanyID})
        .then(res => {
            return res.data;
        }).catch(err => {
            return null;
        })
    }

    @action getEmployee = async(ID) => {
        return await axios
        .post('https://swapapi.azurewebsites.net/api/GetUser', {"UserID": ID})
        .then(res => {
            this.currEmployee = {...res.data, Name: res.data.Firstname + ' ' + res.data.Lastname};
        }).catch(err => {
            console.log(err);
        })
    }

    @action getBranchData = async() => {
        console.log(this.userData.branchID);
        return await axios
        .post('https://swapapi.azurewebsites.net/api/GetBranchEmployees', {"branchID": this.userData.branchID})
        .then(res => {
            console.log(res.data);
            this.branchData = res.data;       
        }).catch(err => {
            console.log(err);
        })
    }

    @action addShift = async(ID, shiftDate, startTime, endTime) => {
        shiftDate = shiftDate.slice(0, 10);
        startTime =startTime.slice(11, 19);
        endTime = endTime.slice(11, 19);
        return await axios
        .post('https://swapapi.azurewebsites.net/api/AddShift', {"UserID": ID, "shiftDate": shiftDate, "startTime": startTime, "endTime": endTime})
        .then(res => {
            return res.data;   
        }).catch(err => {
            return null;
        })
    }

    @action editShift = async(ShiftID, shiftDate, startTime, endTime) => {
        shiftDate = shiftDate.slice(0, 10);
        startTime =startTime.slice(11, 19);
        endTime = endTime.slice(11, 19);
        console.log(ShiftID)
        console.log(shiftDate)
        console.log(startTime)
        console.log(endTime)
        return await axios
        .put('https://swapapi.azurewebsites.net/api/EditShift', {"ShiftID": ShiftID, "shiftDate": shiftDate, "startTime": startTime, "endTime": endTime})
        .then(res => {
            console.log(res.data);     
        }).catch(err => {
            console.log(err);
        })
    }

    @action deleteShift = (ShiftID) => {
        return axios
        .post('https://swapapi.azurewebsites.net/api/DeleteShift', {"ShiftID": ShiftID})
        .then(res => {
            return true;
        }).catch(err => {
            return false;
        })
    }

    @action getShifts = (ID) => {
        return axios
        .post('https://swapapi.azurewebsites.net/api/GetEmployeeShifts', {"UserID": ID})
        .then(res => {
            console.log("RESSSSSSSSSSSSSSSSSSSSSSS",res);
            if (res.data != null) {
                this.currShifts = res.data;
            }      
        }).catch(err => {
            this.currShifts = [];
        })
    }

    @action getShiftsByDay = async(date) => {
        return await axios
        .post('https://swapapi.azurewebsites.net/api/GetShiftsByDay', {"UserID": this.userData.UserID, "Date": date})
        .then(res => {
            if(res.data != null) {
                this.todaysShifts = res.data;
                return ({startTime: res.data[0].startTime, endTime: res.data[0].endTime});
            } else {
                this.todaysShifts = [];
                return null;
            }
        }).catch(err => {
            console.log(err);
            return null;
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

    @action setTodaysRequests = (data) => {
        this.todaysRequests = data;
        console.log(this.todaysRequests);
    }

    @action setTodaysShifts = (data) => {
        this.todaysShifts = data;
    }

    @action setCurrShifts = (data) => {
        this.currShifts = data;
    }
    
    @action setBranchData = (data) => {
        this.branchData = data;
    }

    @computed get UserName() {
        return this.userData.Firstname;
    }
}

export const GlobalStateContext = createContext(new GlobalState());