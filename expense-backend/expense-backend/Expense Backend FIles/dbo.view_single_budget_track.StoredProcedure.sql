USE [expense_tracker]
GO
/****** Object:  StoredProcedure [dbo].[view_single_budget_track]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE	[dbo].[view_single_budget_track]
@budget_id INT
AS
BEGIN
		
		select updated_amount , updated_date from  BUDGET_TRACKING 
		where budget_id=@budget_id

END
GO
