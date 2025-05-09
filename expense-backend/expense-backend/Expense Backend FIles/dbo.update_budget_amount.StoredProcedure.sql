USE [expense_tracker]
GO
/****** Object:  StoredProcedure [dbo].[update_budget_amount]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[update_budget_amount]
    @amount INT,
    @slug NVARCHAR(MAX)
AS
BEGIN
    -- Update budget target_achieved column
    UPDATE budget 
    SET target_achieved = target_achieved + @amount 
    WHERE slug = @slug;

    -- Declare variables to store budget_id and user_id
    DECLARE @budget_id INT, @user_id INT;

    -- Retrieve budget_id and user_id
    SELECT @budget_id = budget_id, @user_id = user_id 
    FROM budget 
    WHERE slug = @slug;

    -- Insert into BUDGET_TRACKING table
    INSERT INTO BUDGET_TRACKING (budget_id, user_id, updated_date, updated_amount) 
    VALUES (@budget_id, @user_id, GETDATE(), @amount);
END
GO
