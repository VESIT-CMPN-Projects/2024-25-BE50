USE [expense_tracker]
GO
/****** Object:  StoredProcedure [dbo].[sp_fetch_income]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_fetch_income] 
AS
BEGIN
	SELECT income_type_id , income_type_name

	FROM 
	income_type
END
GO
