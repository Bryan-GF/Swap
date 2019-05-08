
DECLARE @responseMessage NVARCHAR(250)

EXEC dbo.uspAddUser
          @pEmployeeID = '18NKJ2E',
          @pPassword = N'zoomingintheforeign',
          @pFirstName = 'AdminTest',
          @pLastName = 'Login',
		  @pPosition = 'Cashier',
		  @pBranchID = 1,
          @responseMessage=@responseMessage OUTPUT

SELECT *
FROM dbo.Users
