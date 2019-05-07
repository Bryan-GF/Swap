DECLARE @responseMessage NVARCHAR(250)

EXEC dbo.uspAddBranch
          @pCompanyID=1,
          @responseMessage=@responseMessage OUTPUT

SELECT *
FROM dbo.BranchTable