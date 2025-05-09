USE [expense_tracker]
GO
/****** Object:  StoredProcedure [dbo].[view_user_income]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
  CREATE   PROCEDURE [dbo].[view_user_income]
    @user_id INT
AS
BEGIN
    SELECT ui.user_income_id, ui.user_id, ui.AMOUNT, ui.INCOME_TYPE, it.INCOME_TYPE_NAME
    FROM user_income ui
    INNER JOIN INCOME_TYPE it ON ui.INCOME_TYPE = it.INCOME_TYPE_ID
    WHERE ui.user_id = @user_id;
END;
GO
