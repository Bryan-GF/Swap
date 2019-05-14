DECLARE	@responseMessage nvarchar(250)

--Correct login and password
EXEC	dbo.uspLogin
		@pEmployeeID = '18NKJ2E',
		@pPassword = N'zoomingintheforeign',
		@responseMessage = @responseMessage OUTPUT

SELECT	@responseMessage as N'@responseMessage'

--Incorrect login
EXEC	dbo.uspLogin
		@pEmployeeID = '18NKJ2Z',
		@pPassword = N'zoomingintheforeign',
		@responseMessage = @responseMessage OUTPUT

SELECT	@responseMessage as N'@responseMessage'

--Incorrect password
EXEC	dbo.uspLogin
		@pEmployeeID = '18NKJ2E',
		@pPassword = N'zoomingintheforeigne',
		@responseMessage = @responseMessage OUTPUT

SELECT	@responseMessage as N'@responseMessage'