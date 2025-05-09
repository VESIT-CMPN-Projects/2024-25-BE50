USE [expense_tracker]
GO
/****** Object:  StoredProcedure [dbo].[add_user_income]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[add_user_income]
    @user_id INT,
    @amount INT,
    @income_type INT
AS
BEGIN
    INSERT INTO user_income (user_id, AMOUNT, INCOME_TYPE, income_date)
    VALUES (@user_id, @amount, @income_type, GETDATE());
END;
GO
