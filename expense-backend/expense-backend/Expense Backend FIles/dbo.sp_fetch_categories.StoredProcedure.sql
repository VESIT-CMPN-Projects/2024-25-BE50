USE [expense_tracker]
GO
/****** Object:  StoredProcedure [dbo].[sp_fetch_categories]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_fetch_categories] 
AS
BEGIN
	SELECT category_id , category_name

	FROM 
	category
END
GO
