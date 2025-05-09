USE [expense_tracker]
GO
/****** Object:  StoredProcedure [dbo].[view_user_income_sum_current_month]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[view_user_income_sum_current_month]
    @user_id INT
AS
BEGIN
    SELECT SUM(ui.AMOUNT) AS total_income
    FROM user_income ui
    WHERE ui.user_id = @user_id
      AND YEAR(ui.income_date) = YEAR(GETDATE())
      AND MONTH(ui.income_date) = MONTH(GETDATE());
END;
GO
