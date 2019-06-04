import {observable, action, computed} from 'mobx';
import {createContext} from 'react';
import axios from 'axios';
import { userInfo } from 'os';

class GlobalState {
    @observable userData = {UserID: "" , email : "",  Firstname: "", Lastname: "", Position: "", branchID: "", CompanyID: "", roles: ""};

    @observable loginStatus = false;

    @observable branchData = [];

    @observable currShifts = [];

    @observable userRequests = [];

    @observable BranchList = [];

    @observable BranchManagers = {};

    @observable incorrectPassword = false;

    //IMPORTANT FOR REQUESTS
    
    @observable todaysShifts = [];

    @observable todaysRequests = [];

    @observable currEmployee = {UserID: '', email: '', Name: '', Position: ''};

    @action addCompany = (companyInfo) => {
        return axios
        .post('https://swapapi.azurewebsites.net/api/AddCompany', companyInfo)
        .then(res => {
            return res.data;
        }).catch(err => {
            return null;
        })
    }

    @action deleteRequest = async(UserID, ShiftID) => {  
        return await axios
        .post('https://swapapi.azurewebsites.net/api/DeleteRequest', {UserID: UserID, ShiftID: ShiftID})
        .then(res => {
            return true;
        }).catch(err => {
            return false;
        })
    }

    @action acceptRequest = (DelUserID, ShiftID, Version) => {
        return axios
        .post('https://swapapi.azurewebsites.net/api/AcceptRequest', {AddUserID: this.userData.UserID, DelUserID: DelUserID, ShiftID: ShiftID, Version: Version})
        .then(res => {
            this.todaysRequests = this.todaysRequests.filter(request => request.ShiftID != ShiftID);
            return true;
        }).catch(err => {
            return false;
        })
    }

    @action attemptReset = async(passwordInfo) => {
        return await axios
        .put('https://swapapi.azurewebsites.net/api/ResetPassword', {...passwordInfo, UserID: this.userData.UserID})
        .then(res => {
            this.incorrectPassword = false;
            return true;  
        }).catch(err => {
            if(err.response.status === 406) {
                this.incorrectPassword = true;
            }
            return true;
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
        .post('https://swapapi.azurewebsites.net/api/AddRequest', {UserID: this.userData.UserID, ShiftID: RequestData.ShiftID, Comment: RequestData.Comment, Urgent: RequestData.Urgent, Version: RequestData.Version})
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
            } else {
                this.todaysRequests = [];
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

    @action addManager = async(managerInfo) => {
        return await axios
        .post('https://swapapi.azurewebsites.net/api/AddManager', {...managerInfo, CompanyID: this.userData.CompanyID})
        .then(res => {
            if(res.data) {
                this.BranchManagers[managerInfo.branchID] = [...this.BranchManagers[managerInfo.branchID], {email: managerInfo.email, UserID: managerInfo.UserID, Firstname: managerInfo.Firstname, Lastname: managerInfo.Lastname}];
                return res.data;
            }
                 
        }).catch(err => {
            console.log(err);
            return null;
        })
    }

    @action getBranchData = async() => {
        return await axios
        .post('https://swapapi.azurewebsites.net/api/GetBranchEmployees', {"branchID": this.userData.branchID})
        .then(res => {
            if(res.data) {
                this.branchData = res.data;  
            }
                 
        }).catch(err => {
            console.log(err);
        })
    }

    @action getAllBranches = async() => {
        return await axios
        .post('https://swapapi.azurewebsites.net/api/GetAllBranches', {CompanyID: this.userData.CompanyID})
        .then(res => {
            if(res.data) {
                this.BranchList = res.data;
            }        
        }).catch(err => {
            console.log(err);
        })
    }

    @action getManagers = async() => {
        return await axios
        .post('https://swapapi.azurewebsites.net/api/GetManagers', {CompanyID: this.userData.CompanyID})
        .then(res => {
            if(res.data) {
                this.BranchManagers = res.data;
            }         
        }).catch(err => {
            console.log(err);
        })
    }

    @action deleteManager = async(UserID, branchID) => {

        return await axios
        .post('https://swapapi.azurewebsites.net/api/DeleteManager', {UserID: UserID})
        .then(res => {
            this.BranchManagers[branchID] = this.BranchManagers[branchID].filter(manager => manager.UserID != UserID);
        }).catch(err => {
            console.log(err);
        })
        
    }

    @action addBranch = async(branchName) => {
        return await axios
        .post('https://swapapi.azurewebsites.net/api/AddBranch', {Name: branchName, CompanyID: this.userData.CompanyID})
        .then(res => {
            this.BranchList = [...this.BranchList, {Name: branchName, branchID: res.data}]; 
        }).catch(err => {
            console.log(err);
        })
    }

    @action deleteBranch = async(branchID) => {
        return await axios
        .post('https://swapapi.azurewebsites.net/api/DeleteBranch', {branchID: branchID})
        .then(res => {
            this.BranchList = this.BranchList.filter((branch) =>
            branch.branchID != branchID); 
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

    @action editShift = async(ShiftID, shiftDate, startTime, endTime, Version) => {
        shiftDate = shiftDate.slice(0, 10);
        startTime =startTime.slice(11, 19);
        endTime = endTime.slice(11, 19);
        return await axios
        .put('https://swapapi.azurewebsites.net/api/EditShift', {"ShiftID": ShiftID, "shiftDate": shiftDate, "startTime": startTime, "endTime": endTime, Version: Version})
        .then(res => {
            return true;  
        }).catch(err => {
            return false;
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
            
            if (res.data != null) {
                
                this.currShifts = res.data;
            } else {
                this.currShifts = [];
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
                return ({startTime: res.data[0].startTime, endTime: res.data[0].endTime, ShiftID: res.data[0].ShiftID, Version: res.data[0].Version});
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