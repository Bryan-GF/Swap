Select * FROM Shifts
Select * FROM Requests

SELECT S.ShiftID
FROM Shifts S
LEFT JOIN Requests R ON R.ShiftID = S.ShiftID
WHERE R.ShiftID IS NULL
