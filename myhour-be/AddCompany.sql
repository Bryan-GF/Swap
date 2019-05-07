DECLARE @responseMessage NVARCHAR(250)

EXEC dbo.uspAddCompany
          @pCompanyName='Target',
          @responseMessage=@responseMessage OUTPUT

SELECT *
FROM dbo.CompanyTable