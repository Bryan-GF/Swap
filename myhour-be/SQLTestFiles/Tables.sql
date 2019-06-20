USE [Swap-DB];    
GO    
CREATE TABLE CompanyTable(
companyID smallint IDENTITY(1,1) NOT NULL PRIMARY KEY,
companyName varchar(255) NOT NULL
);
CREATE TABLE BranchTable(
branchID int IDENTITY(1,1) NOT NULL PRIMARY KEY,
companyID smallint NOT NULL FOREIGN KEY REFERENCES CompanyTable(companyID)
);
CREATE TABLE Users (
UserID int IDENTITY(1,1) NOT NULL PRIMARY KEY,
employeeID varchar(255) NOT NULL,
PasswordHash varbinary(64) NOT NULL,
Firstname varchar(255) NOT NULL,
Lastname varchar(255) NOT NULL,
Position varchar(255) NOT NULL,
branchID int NOT NULL FOREIGN KEY REFERENCES BranchTable(branchID)     
    ON DELETE CASCADE    
    ON UPDATE CASCADE 	  
);
CREATE TABLE Shifts (
ShiftID int IDENTITY(1,1) NOT NULL PRIMARY KEY,
shiftDate date NOT NULL,
startTime time NOT NULL,
endTime time NOT NULL,
UserID int NOT NULL FOREIGN KEY REFERENCES Users(UserID),
);
GO

GO  
ALTER PROCEDURE dbo.uspAddUser
    @pEmployeeID varchar(255), 
    @pPassword NVARCHAR(50), 
    @pFirstName varchar(255),
    @pLastName varchar(255),
	@pPosition varchar(255),
	@pBranchID int,
    @responseMessage NVARCHAR(250) OUTPUT
AS
BEGIN
    SET NOCOUNT ON

	DECLARE @salt UNIQUEIDENTIFIER=NEWID()

    BEGIN TRY

        INSERT INTO dbo.Users(employeeID, PasswordHash, Salt, Firstname, Lastname, Position, branchID)
        VALUES(@pEmployeeID, HASHBYTES('SHA2_512',  @pPassword+CAST(@salt AS NVARCHAR(36))), @salt, @pFirstName, @pLastName, @pPosition, @pBranchID)

        SET @responseMessage='Success'

    END TRY
    BEGIN CATCH
        SET @responseMessage=ERROR_MESSAGE() 
    END CATCH

END

GO
ALTER PROCEDURE dbo.uspLogin
    @pEmployeeID varchar(255),
    @pPassword NVARCHAR(50),
    @responseMessage NVARCHAR(250)='' OUTPUT
AS
BEGIN

    SET NOCOUNT ON

    DECLARE @userID INT

    IF EXISTS (SELECT TOP 1 UserID FROM dbo.Users WHERE employeeID=@pEmployeeID)
    BEGIN
        SET @userID=(SELECT UserID FROM dbo.Users WHERE employeeID=@pEmployeeID AND PasswordHash=HASHBYTES('SHA2_512', @pPassword+CAST(Salt AS NVARCHAR(36))))

       IF(@userID IS NULL)
		   BEGIN
			   SET @responseMessage='Incorrect password'

			END
       ELSE 
		BEGIN
           SET @responseMessage='User successfully logged in'
		END
    END
    ELSE
       SET @responseMessage='Invalid login'

END

GO
CREATE PROCEDURE dbo.uspAddBranch
    @pCompanyID smallint,
	@responseMessage NVARCHAR(250) OUTPUT
AS
BEGIN
    SET NOCOUNT ON

    BEGIN TRY

        INSERT INTO dbo.BranchTable(companyID)
        VALUES(@pCompanyID)

        SET @responseMessage='Success'

    END TRY
    BEGIN CATCH
        SET @responseMessage=ERROR_MESSAGE() 
    END CATCH

END

GO
CREATE PROCEDURE dbo.uspAddCompany
    @pCompanyName varchar(255),
	@responseMessage NVARCHAR(250) OUTPUT
AS
BEGIN
    SET NOCOUNT ON

    BEGIN TRY

        INSERT INTO dbo.CompanyTable(companyName)
        VALUES(@pCompanyName)

        SET @responseMessage='Success'

    END TRY
    BEGIN CATCH
        SET @responseMessage=ERROR_MESSAGE() 
    END CATCH

END

GO
CREATE PROCEDURE dbo.uspAddShift
    @pDate date,
	@pStart time,
	@pEnd time,
	@pUserID int,
	@responseMessage NVARCHAR(250) OUTPUT
AS
BEGIN
    SET NOCOUNT ON

    BEGIN TRY

        INSERT INTO dbo.Shifts(shiftDate, startTime, endTime, UserID)
        VALUES(@pDate, @pStart, @pEnd, @pUserID)

        SET @responseMessage='Success'

    END TRY
    BEGIN CATCH
        SET @responseMessage=ERROR_MESSAGE() 
    END CATCH

END

GO

ALTER TABLE Users ALTER COLUMN PasswordHash varchar(255) NOT NULL;

CREATE TABLE Requests (
	UserID int NOT NULL FOREIGN KEY REFERENCES Users(UserID),
	ShiftID int NOT NULL FOREIGN KEY REFERENCES Shifts(ShiftID),
	Comment varchar(255) NOT NULL,
);
GO
ALTER TABLE Requests ADD Urgent BIT default 'FALSE';

GO
ALTER TABLE Users ADD Role varchar(255) NOT NULL
GO
ALTER TABLE Users ADD CompanyID smallint NOT NULL FOREIGN KEY REFERENCES CompanyTable(CompanyID)
GO 
GO
ALTER TABLE Users ADD CONSTRAINT (email);
Go
ALTER TABLE CompanyTable ADD Contact_Number varchar(255)

GO
ALTER TABLE BranchTable ADD Name varchar(255)

ALTER TABLE Users ALTER COLUMN branchID int NULL

ALTER TABLE Users ALTER COLUMN branchID int default null

GO
alter table Shifts
drop constraint FK__Shifts__UserID__32AB8735;

ALTER TABLE Shifts
  ADD CONSTRAINT UserID
  FOREIGN KEY (UserID)
  REFERENCES Users(UserID) 
  ON DELETE CASCADE;

GO
alter table Requests
drop constraint FK__Requests__ShiftI__1209AD79;

ALTER TABLE Requests
  ADD CONSTRAINT ShiftID
  FOREIGN KEY (ShiftID)
  REFERENCES Shifts(ShiftID) 
  ON DELETE CASCADE;

GO
ALTER TABLE Shifts ADD Version rowversion NOT NULL;





