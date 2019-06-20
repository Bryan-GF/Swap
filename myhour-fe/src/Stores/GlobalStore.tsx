import {observable, action, computed} from 'mobx';
import {createContext} from 'react';
import axios from 'axios';
import JWT from 'jsonwebtoken';

const chatterUrl = `https://us1.pusherplatform.io/services/chatkit/v4/${process.env.REACT_APP_INSTANCE_ID}`;

class GlobalState {
    @observable userData = {UserID: "" , email : "",  Firstname: "", Lastname: "", Position: "", branchID: "", CompanyID: "", roles: ""};

    @observable loginStatus = false;

    @observable branchData = [];

    @observable currShifts = [];

    @observable userRequests = [];

    @observable BranchList = [];

    @observable BranchManagers = {};

    @observable incorrectPassword = false;
    
    @observable todaysShifts = [];

    @observable todaysRequests = [];

    //Chat Observables

    @observable messages = [];

    @observable currChatter = null;

    @observable currRoom = null;

    ///////////////////////////////////////////////////////

    @observable currEmployee = {UserID: '', email: '', Name: '', Position: ''};

    // GENERAL FUNCTIONS

    @action createChatter = (name, email) => {
        let token = JWT.sign({
            instance: process.env.REACT_APP_INSTANCE_ID,
            iss: "api_keys/" + process.env.REACT_APP_KEY_ID,
            sub: name,
            su: true,
          }, process.env.REACT_APP_SECRET,{ expiresIn: 60 * 60 });
        console.log(token);
        let config = {
            headers: {'Authorization': "Bearer " + token} 
        };
        
        return axios
        .post(chatterUrl + '/users', {name: name, id: email}, config)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    // Takes in companyInfo object as a parameter. Attempts to make api call using companyInfo as body. On success returns response data. On fail return null.
    @action addCompany = (companyInfo) => {
        return axios
        .post('https://swapapi.azurewebsites.net/api/AddCompany', companyInfo)
        .then(res => {
            return res.data;
        }).catch(err => {
            return null;
        })
    }

    // Takes in user passwordInfo object as parameter. Attempts to make an api call using passwordInfo and userData email in body object. On success sets incorrectPassword to false and returns false.
    // On fail return false. (False is just to let loading function know the call is done).
    @action attemptReset = async(passwordInfo) => {
        return await axios
        .put('https://swapapi.azurewebsites.net/api/ResetPassword', {...passwordInfo, email: this.userData.email})
        .then(res => {
            this.incorrectPassword = false;
            return false;  
        }).catch(err => {
            if(err.response.status === 406) {
                this.incorrectPassword = true;
            }
            return false;
        })
    }

    // Takes in loginInfo object as parameter. Attempts to make api call using loginInfo in body object. On success return true. On fail return false.
    @action attemptLogin = async(loginInfo) => {
        return await axios
        .post('https://swapapi.azurewebsites.net/api/Authenticate', loginInfo)
        .then(res => {
            localStorage.setItem('Token', res.data.Token);
            this.userData = res.data;
            this.loginStatus = true;
            this.incorrectPassword = false;
            return true;        
        }).catch(err => {
            console.log(err)
            if(err.response.status === 406) {
                this.incorrectPassword = true;
            }
            return false;
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // OWNER FUNCTIONS

    // Takes in managerInfo object as parameter. Attempts to make api call using managerInfo as body along with companyID. On success add branch manager to branch in BranchManagers array.
    // On fail return null.
    @action addManager = async(managerInfo) => {
        return await axios
        .post('https://swapapi.azurewebsites.net/api/AddManager', {...managerInfo, CompanyID: this.userData.CompanyID})
        .then(res => {
            if(res.data) {
                this.BranchManagers[managerInfo.branchID] = [...this.BranchManagers[managerInfo.branchID], {email: managerInfo.email, UserID: res.data, Firstname: managerInfo.Firstname, Lastname: managerInfo.Lastname}];
                return res.data;
            }
                 
        }).catch(err => {
            console.log(err);
            return null;
        })
    }

    // Takes in branchName string as a parameter. Attempts to make api call using branchname and companyID in body object. On success adds value to BranchList array.
    @action addBranch = async(branchName) => {
        return await axios
        .post('https://swapapi.azurewebsites.net/api/AddBranch', {Name: branchName, CompanyID: this.userData.CompanyID})
        .then(res => {
            this.BranchList = [...this.BranchList, {Name: branchName, branchID: res.data}]; 
        }).catch(err => {
            console.log(err);
        })
    }

    // Takes branchID string as a parameter. Attempts to make api call using branchID in body object. On success filter branch out of BranchList array.
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

    // Attempts to make api call using companyID in body object. On Success set BranchList to response data.
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

    // Attempts to make an api call using companyID in body object. On Scccess set Branchmanagers to response data.
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

    // Takes in UserID string and branchID string as parameters. Attempts to make and api call using UserID in body object. On success fiter remove branchManager at branchID in BranchManagers array.
    @action deleteManager = async(UserID, branchID) => {
        return await axios
        .post('https://swapapi.azurewebsites.net/api/DeleteManager', {UserID: UserID})
        .then(res => {
            this.BranchManagers[branchID] = this.BranchManagers[branchID].filter(manager => manager.UserID != UserID);
        }).catch(err => {
            console.log(err);
        })
        
    }
    


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // MANAGER FUNCTIONS

    // Takes in employee ID as a parameter. Attempts to make an api call using employee ID in the body object. On success return true. On fail return false.
    @action deleteUser = (ID) => {
        return axios
        .post('https://swapapi.azurewebsites.net/api/DeleteUser', {UserID: ID})
        .then(res => {
            
            return true;
        }).catch(err => {
            return false;
        })
    }

    // Takes in employee data object. Attempts to make api call using employee data object, branchID, and companyID in body object. On success return response data. On fail return null.
    @action addEmployee = async(employee) => {
        return await axios
        .post('https://swapapi.azurewebsites.net/api/AddUser', {...employee, "branchID": this.userData.branchID, "CompanyID": this.userData.CompanyID})
        .then(res => {
            return res.data;
        }).catch(err => {
            return null;
        })
    }

    // Takes in employee ID string. Attempts to make api call using employee ID in body object. On success set currEmployee (current employee) to response data.
    @action getEmployee = async(ID) => {
        return await axios
        .post('https://swapapi.azurewebsites.net/api/GetUser', {"UserID": ID})
        .then(res => {
            this.currEmployee = {...res.data, Name: res.data.Firstname + ' ' + res.data.Lastname};
        }).catch(err => {
            console.log(err);
        })
    }

    // Attempts to make an api call using branchID in body object. On success set branchData to response data (All employees).
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

    // Takes in employee ID string, shift date string, shift start time string, and end time string as parameters. Attempts to make api call using all parameters in body object.
    // On success return response data. On fail return null.
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

    // Takes in ShiftID string, shiftDate string, shift start time string, shift end time string, and database version string as parameters.. Attempts to make an api call using all parameters in body object.
    // On success return true. On fail return false.
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

    // Takes in ShiftID string as parameter. Attempts to make an api call using ShiftID in body object. On success return true. On fail return false.
    @action deleteShift = (ShiftID) => {
        return axios
        .post('https://swapapi.azurewebsites.net/api/DeleteShift', {"ShiftID": ShiftID})
        .then(res => {
            return true;
        }).catch(err => {
            return false;
        })
    }

     ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // EMPLOYEE FUNCTIONS

    // Takes in UserID string and ShiftID string as parameters. Attempts to make an api call using all parameters in body object. On success return true. On fail return false.
    @action deleteRequest = async(UserID, ShiftID) => {  
        return await axios
        .post('https://swapapi.azurewebsites.net/api/DeleteRequest', {UserID: UserID, ShiftID: ShiftID})
        .then(res => {
            return true;
        }).catch(err => {
            return false;
        })
    }

    // Takes in the ID of the person who posted the request as DelUserID string, ShiftID string, and database Version string as parameters. Attempts to make an api call using all
    // parameters and userData UserID in body object. On success filter request out of todaysRequests array and return true. On fail return false.
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

    // Attempts to make an api call to get number of request per day of the week. On success returns data. (BUGGED FORGOT TO ADD BRANCH ID TO ONLY GET REQUESTS FOR THEIR BRANCH).
    @action getRequestCounts = () => {
        return axios
        .get('https://swapapi.azurewebsites.net/api/GetRequestCounts')
        .then(res => {
            return res.data; 
        }).catch(err => {
            console.log(err);
        })
    }

    // Attempts to make an api call to get all the requests from an employee. On success sets userRequests to response data.
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

    // Takes in RequestData object as parameter. Attempts to make an api call to add a request using RequestData and user data ID in body object. On success return true. On fail return false.
    @action addRequest = (RequestData) => {
        return axios
        .post('https://swapapi.azurewebsites.net/api/AddRequest', {UserID: this.userData.UserID, ShiftID: RequestData.ShiftID, Comment: RequestData.Comment, Urgent: RequestData.Urgent, Version: RequestData.Version})
        .then(res => {
            return true;
        }).catch(err => {
            return false;
        })
    }

    // Takes in date as parameter. Attempts to make an api call to get all requests for the day using date in body object. On success sets todaysRequest to response data. On fail return null.
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

    // Takes in date as parameter. Attempts to make an api call to get all requests for the day using date in body object. On success set todaysShift to response data and return response data.
    // On fail return null.
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

    // Takes in employee ID string as parameter. Attempts to make an api call to get an employees shifts using employee ID in body object. On success set currShifts to res.data.
    // On fail set currShifts to an empty array.
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

    /////////////////////////////////////
    //STATE VARIABLE UPDATING FUNCTIONS//
    /////////////////////////////////////
    @action setLoginStatus = (status: boolean) => {
        this.loginStatus = status;
    }

    @action setUserData = (userInfo: any) => {
        this.userData = userInfo;
    }

    @action setTodaysRequests = (data) => {
        this.todaysRequests = data;
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

    @action setMessages = (data:Array<Object>) => {
        this.messages = data;
    }

    @action setCurrChatter = (data:Array<Object>) => {
        this.currChatter = data;
    }

    @action setCurrRoom = (data:string) => {
        this.currRoom = data;
    }

    @computed get UserName() {
        return this.userData.Firstname;
    }
}

export const GlobalStateContext = createContext(new GlobalState());