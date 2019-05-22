Select * FROM Shifts
Select * FROM Users
Select * FROM Requests
SELECT S.shiftDate, COUNT(*) AS NumRequests
FROM Shifts S
JOIN Requests R ON R.ShiftID = S.ShiftID
GROUP BY S.shiftDate

