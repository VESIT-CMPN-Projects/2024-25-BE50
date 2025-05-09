USE [expense_tracker]
GO
/****** Object:  StoredProcedure [dbo].[sp_fetch_expenses_month_wise]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[sp_fetch_expenses_month_wise]
@user_id INT
AS
BEGIN
    -- Fetch the total expense for the current month
    SELECT 
        SUM(e.expense_amount) AS total_expense
    FROM dbo.expense e
    WHERE e.user_id = @user_id 
      AND e.active_yn = 1
      AND YEAR(e.expense_date) = YEAR(GETDATE())
      AND MONTH(e.expense_date) = MONTH(GETDATE());
END
GO
