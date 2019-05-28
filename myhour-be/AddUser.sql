
SELECT * FROM REQUESTS;
SELECT * FROM SHIFTS;
SELECT * FROM USERS;
Select * FROM BranchTable;
Select * From CompanyTable

INSERT INTO Users (email, Firstname, Lastname, Position, branchID, PasswordHash, Role, CompanyID) 
                        OUTPUT INSERTED.UserID 
                        VALUES ('briangfelix@gmail.com', 'Boomin', 'Zoomin', 'Manager', 4, 'zooming', 'Manager', 50);

