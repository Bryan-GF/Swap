DECLARE @responseMessage NVARCHAR(250)

EXEC dbo.uspAddShift
        @pDate = '05-07-2019',
		@pStart = '13:00',
		@pEnd = '17:00',
		@pUserID = 1,
        @responseMessage=@responseMessage OUTPUT

SELECT *
FROM dbo.Shifts