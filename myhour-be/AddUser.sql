DECLARE @responseMessage NVARCHAR(250)

EXEC dbo.uspAddUser
          @pEmployeeID = '18NKJ2',
          @pPassword = N'zoomingintheforeign',
          @pFirstName = 'Admin',
          @pLastName = 'Login',
		  @pPosition = 'Cashier',
		  @pBranchID = 1,
          @responseMessage=@responseMessage OUTPUT

SELECT *
FROM dbo.Users