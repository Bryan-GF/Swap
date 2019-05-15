SELECT employeeID, Firstname, Lastname, Position, PasswordHash FROM Users U 
                        JOIN BranchTable B on B.branchID = U.branchID 
                        JOIN CompanyTable C on C.companyID = B.companyID 
                        WHERE employeeID = '101PEL' AND C.companyName = 'Target'